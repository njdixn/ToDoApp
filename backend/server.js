import express from 'express'
import cors from 'cors'
import jwt from 'jsonwebtoken'

const app = express()
const PORT = 3000
const SECRET_KEY = 'your-secret-key-change-this'

// Middleware
app.use(cors())
app.use(express.json())

// In-memory storage (resets when server restarts)
let users = []
let todos = []
let nextTodoId = 1

// Helper function to find user
function findUser(username) {
  return users.find(u => u.username === username)
}

// Helper function to verify token
function verifyToken(token) {
  try {
    return jwt.verify(token, SECRET_KEY)
  } catch (error) {
    return null
  }
}

// Middleware to check authentication
function authenticate(req, res, next) {
  const authHeader = req.headers.authorization
  if (!authHeader) {
    return res.status(401).json({ error: 'Missing authorization header' })
  }

  const token = authHeader.replace('Bearer ', '')
  const decoded = verifyToken(token)

  if (!decoded) {
    return res.status(401).json({ error: 'Invalid token' })
  }

  req.user = decoded
  next()
}

// ===== AUTH ROUTES =====

// Register
app.post('/register', (req, res) => {
  const { username, password } = req.body

  // Validation
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password required' })
  }

  // Check if user exists
  if (findUser(username)) {
    return res.status(400).json({ error: 'Username already exists' })
  }

  // Create user
  const user = { username, password }
  users.push(user)

  // Create token
  const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '24h' })

  res.json({ token, username })
})

// Login
app.post('/login', (req, res) => {
  const { username, password } = req.body

  // Validation
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password required' })
  }

  // Find user
  const user = findUser(username)
  if (!user || user.password !== password) {
    return res.status(401).json({ error: 'Invalid credentials' })
  }

  // Create token
  const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '24h' })

  res.json({ token, username })
})

// Logout (optional - just for completeness)
app.post('/logout', authenticate, (req, res) => {
  res.json({ message: 'Logged out' })
})

// ===== TODO ROUTES =====

// Get all todos for current user
app.get('/todos', authenticate, (req, res) => {
  const userTodos = todos.filter(t => t.username === req.user.username)
  res.json(userTodos)
})

// Create todo
app.post('/todos', authenticate, (req, res) => {
  const { title, description } = req.body

  if (!title) {
    return res.status(400).json({ error: 'Title required' })
  }

  const todo = {
    id: nextTodoId++,
    username: req.user.username,
    title,
    description: description || '',
    completed: false,
    createdAt: new Date()
  }

  todos.push(todo)
  res.json(todo)
})

// Update todo
app.put('/todos/:id', authenticate, (req, res) => {
  const { id } = req.params
  const { title, description, completed } = req.body

  const todo = todos.find(t => t.id === parseInt(id))

  if (!todo) {
    return res.status(404).json({ error: 'Todo not found' })
  }

  if (todo.username !== req.user.username) {
    return res.status(403).json({ error: 'Not authorized' })
  }

  if (title !== undefined) todo.title = title
  if (description !== undefined) todo.description = description
  if (completed !== undefined) todo.completed = completed

  res.json(todo)
})

// Delete todo
app.delete('/todos/:id', authenticate, (req, res) => {
  const { id } = req.params

  const index = todos.findIndex(t => t.id === parseInt(id))

  if (index === -1) {
    return res.status(404).json({ error: 'Todo not found' })
  }

  const todo = todos[index]

  if (todo.username !== req.user.username) {
    return res.status(403).json({ error: 'Not authorized' })
  }

  todos.splice(index, 1)
  res.json({ message: 'Todo deleted' })
})

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
  console.log('Test users can be created via /register endpoint')
})

import React, { useState, useEffect } from 'react'
import AddTodoForm from '../components/AddTodoForm'
import TodoList from '../components/TodoList'
import EditModal from '../components/EditModal'

const API_URL = 'http://localhost:3000'

function TodoPage({ user, onLogout }) {
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingTodo, setEditingTodo] = useState(null)

  useEffect(() => {
    loadTodos()
  }, [])

  const loadTodos = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${API_URL}/todos`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${user.token}` }
      })

      if (response.ok) {
        const data = await response.json()
        setTodos(data)
      }
    } catch (error) {
      console.error('Error loading todos:', error)
    }
    setLoading(false)
  }

  const addTodo = async (title, description) => {
    try {
      const response = await fetch(`${API_URL}/todos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({ title, description })
      })

      if (response.ok) {
        loadTodos()
        return { success: true }
      }
    } catch (error) {
      console.error('Error adding todo:', error)
    }
    return { success: false }
  }

  const deleteTodo = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return

    try {
      const response = await fetch(`${API_URL}/todos/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${user.token}` }
      })

      if (response.ok) {
        loadTodos()
      }
    } catch (error) {
      console.error('Error deleting todo:', error)
    }
  }

  const toggleTodo = async (todo) => {
    try {
      const response = await fetch(`${API_URL}/todos/${todo.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({ ...todo, completed: !todo.completed })
      })

      if (response.ok) {
        loadTodos()
      }
    } catch (error) {
      console.error('Error toggling todo:', error)
    }
  }

  const updateTodo = async (updatedTodo) => {
    try {
      const response = await fetch(`${API_URL}/todos/${updatedTodo.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify(updatedTodo)
      })

      if (response.ok) {
        setEditingTodo(null)
        loadTodos()
      }
    } catch (error) {
      console.error('Error updating todo:', error)
    }
  }

  return (
    <div className="container">
      <header>
        <h1>My Todo List</h1>
        <div className="user-info">
          <span id="display-username">{user.username}</span>
          <button className="logout-button" onClick={onLogout}>
            Logout
          </button>
        </div>
      </header>

      <section className="add-todo-form">
        <AddTodoForm onAdd={addTodo} />
      </section>

      {loading ? (
        <div className="loading">Loading todos...</div>
      ) : todos.length === 0 ? (
        <div className="empty-message">No todos yet. Create one!</div>
      ) : (
        <TodoList
          todos={todos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onEdit={setEditingTodo}
        />
      )}

      {editingTodo && (
        <EditModal
          todo={editingTodo}
          onClose={() => setEditingTodo(null)}
          onSave={updateTodo}
        />
      )}
    </div>
  )
}

export default TodoPage
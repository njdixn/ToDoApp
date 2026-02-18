// Import necessary modules and components
import React, { useState, useEffect } from 'react'
// Import the AddTodoForm, TodoList, and EditModal components for managing tasks
import AddTodoForm from '../components/AddTodoForm'
import TodoList from '../components/TodoList'
import EditModal from '../components/EditModal'

// Define the base URL for the API endpoints
const API_URL = 'http://localhost:3000'

// Main TodoPage component that displays the user's tasks and allows them to manage their todo list
function TodoPage({ user, onLogout }) {
  // State variables to manage the list of todos, loading state, and the currently editing todo
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingTodo, setEditingTodo] = useState(null)

  // Load the user's todos when the component mounts
  useEffect(() => {
    // Load the user's todos from the API when the component mounts
    loadTodos()
  // The empty dependency array ensures this effect runs only once when the component mounts
  }, [])

  // Function to load the user's todos from the API
  const loadTodos = async () => {
    // Set loading state to true while fetching todos
    setLoading(true)
    // Send a GET request to the /todos endpoint of the API to retrieve the user's todos
    try {
      const response = await fetch(`${API_URL}/todos`, {
        // Use GET method to retrieve todos
        method: 'GET',
        // Include the user's authentication token in the Authorization header
        headers: { 'Authorization': `Bearer ${user.token}` }
      })

      // If the response is successful, parse the JSON data and update the todos state with the retrieved todos
      if (response.ok) {
        // Parse the JSON response from the API and update the todos state with the retrieved todos
        const data = await response.json()
        // Update the todos state with the retrieved todos from the API
        setTodos(data)
      }

    // Handle network errors or other unexpected issues during the fetch process
    } catch (error) {
      // Log any errors that occur during the fetch process to the console for debugging purposes
      console.error('Error loading todos:', error)
    }
    // Set loading state back to false after the fetch attempt is complete, regardless of success or failure
    setLoading(false)
  }

  // Function to add a new todo by sending a POST request to the API
  const addTodo = async (title, description) => {
    // Send a POST request to the /todos endpoint of the API to create a new todo with the provided title and description
    try {
      const response = await fetch(`${API_URL}/todos`, {
        // Use POST method to create a new todo
        method: 'POST',
        // Set the Content-Type header
        headers: {
          // Set the Content-Type header to indicate that the request body contains JSON data and include the user's authentication token in the Authorization header to authenticate the request
          'Content-Type': 'application/json',
          // Include the user's authentication token in the Authorization header to authenticate the request
          'Authorization': `Bearer ${user.token}`
        },
        // Send the title and description as a JSON string in the request body to create a new todo with the provided title and description
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

  // Function to delete a todo by sending a DELETE request to the API
  const deleteTodo = async (id) => {
    // Confirm with the user before deleting the todo to prevent accidental deletions --with a browser confirmation pop up
    if (!window.confirm('Are you sure you want to delete this task?')) return

    // Send a DELETE request to the /todos/:id endpoint of the API to delete the specified todo by its ID
    try {
      const response = await fetch(`${API_URL}/todos/${id}`, {
        // Use DELETE method to delete the specified todo
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

  // Function to toggle the completion status of a todo by sending a PUT request to the API
  const toggleTodo = async (todo) => {
    // Send a PUT request to the /todos/:id endpoint of the API to update the specified todo's completion status by its ID
    try {
      const response = await fetch(`${API_URL}/todos/${todo.id}`, {
        // Use PUT method to update the specified todo's completion status
        method: 'PUT',
        // Set the Content-Type header to indicate that the request body contains JSON data and include the user's authentication token in the Authorization header to authenticate the request
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

  // Function to update a todo by sending a PUT request to the API with the updated todo data
  const updateTodo = async (updatedTodo) => {
    // Send a PUT request to the /todos/:id endpoint of the API to update the specified todo with the provided updated todo data
    try {
      const response = await fetch(`${API_URL}/todos/${updatedTodo.id}`, {
        // Use PUT method to update the specified todo with the provided updated todo data
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

  // Function to handle user login by sending a POST request to the API with the provided username and password
  return (
    // Render the main container for the TodoPage, including the header with the user's username and logout button, the form to add new todos, and the list of existing todos. 
    <div className="container">
      <header>
        <h1>My Todo List</h1>
        <div className="user-info">
          {/* // Display the logged-in user's username and provide a logout button to allow the user to log out of the application */}
          <span id="display-username">{user.username}</span>
          <button className="logout-button" onClick={onLogout}>
            Logout
          </button>
        </div>
      </header>

      {/* Render the AddTodoForm component and pass the addTodo function as a prop to allow the user to add new todos to their list */}
      <section className="add-todo-form">
        <AddTodoForm onAdd={addTodo} />
      </section>

      {/* Render a loading message if todos are still loading, an empty message if there are no todos, or the list of todos otherwise */}
      {loading ? (
        <div className="loading">Loading todos...</div>
      // If the todos are still loading, display a loading message to inform the user that the todos are being fetched from the API
      ) : todos.length === 0 ? (
        <div className="empty-message">No todos yet. Create one!</div>
      ) : (
        // If there are no todos, display a message encouraging the user to create their first todo. Otherwise, render the TodoList component and pass the list of todos and the functions to toggle, delete, and edit todos as props to allow the user to manage their todo list effectively
        <TodoList
          todos={todos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onEdit={setEditingTodo}
        />
      )}

      {/* If a todo is currently being edited, render the EditModal component and pass the editing todo, a function to close the modal, and a function to save the updated todo as props to allow the user to edit their existing todos in a modal dialog */}
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

// Export the TodoPage component for use in other parts of the application
export default TodoPage
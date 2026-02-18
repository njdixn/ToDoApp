import React, { useState, useEffect } from 'react'
import LoginPage from './pages/LoginPage'
import TodoPage from './pages/TodoPage'
import './App.css'

const API_URL = 'http://localhost:3000'

// Main App component that manages user authentication and routing between Login and Todo pages
function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)

  // Check if user is already logged in on component mount
  const login = async (username, password) => {
    setLoading(true)
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      })

      if (response.ok) {
        const data = await response.json()
        setUser({ username, token: data.token })
        return { success: true }
      } else {
        return { success: false, error: 'Invalid username or password' }
      }
    } catch (error) {
      return { success: false, error: 'Network error' }
    } finally {
      setLoading(false)
    }
  }
  // Handle user registration
  const register = async (username, password) => {
    // Set loading state to true while registration is in progress
    setLoading(true)
    // Attempt to register the user with the provided username and password
    try {
      // Send a POST request to the /register endpoint of the API
      const response = await fetch(`${API_URL}/register`, {
        //  Use POST method for registration
        method: 'POST',
        // Set the Content-Type header to indicate JSON payload
        headers: { 'Content-Type': 'application/json' },
        // Send the username and password as a JSON string in the request body
        body: JSON.stringify({ username, password })
      })

      // Registration successful, log the user in
      if (response.ok) {
        // Automatically log in the user after successful registration
        const data = await response.json()
        // Set user state with the new user's information and token
        setUser({ username, token: data.token })
        // Return success response to the registration form
        return { success: true }

        // Registration failed, return error message
      } else {
        const error = await response.json()
        return { success: false, error: error.error || 'Registration failed' }
      }
    } catch (error) {
      return { success: false, error: 'Network error' }
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
  }

  if (!user) {
    return <LoginPage onLogin={login} onRegister={register} isLoading={loading} />
  }

  return <TodoPage user={user} onLogout={logout} />
}

export default App
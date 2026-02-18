// Import necessary modules and components
import React, { useState, useEffect } from 'react'
// Import the LoginPage and TodoPage components for user authentication and task management
import LoginPage from './pages/LoginPage'
import TodoPage from './pages/TodoPage'
// Import the CSS file for styling
import './App.css'

// Define the base URL for the API endpoints 
// --Is this always the same for all react websites? 
// --Is it this for when it is in full production?
// --Why cant we learn what things are actually going to look like in the real world? 
const API_URL = 'http://localhost:3000'

// Main App component that manages user authentication and routing between Login and Todo pages
function App() {
  // State variables to manage user authentication and loading state
  // State variable to store the currently logged-in user's information
  const [user, setUser] = useState(null)
  // State variable to indicate if a login or registration request is in progress
  const [loading, setLoading] = useState(false)

  // Check if user is already logged in on component mount
  const login = async (username, password) => {
    // Set loading state to true while login is in progress
    setLoading(true)
    // Attempt to log in the user with the provided username and password
    try {
      // Send a POST request to the /login endpoint of the API
      const response = await fetch(`${API_URL}/login`, {
        // Use POST method for login
        method: 'POST',
        // Set the Content-Type header to indicate JSON payload
        headers: { 'Content-Type': 'application/json' },
        // Send the username and password as a JSON string in the request body
        body: JSON.stringify({ username, password })
      })

      // Login successful, set user state with the logged-in user's information
      if (response.ok) {
        // Automatically log in the user after successful login
        const data = await response.json()
        // Set user state with the logged-in user's information and token
        setUser({ username, token: data.token })
        // Return success response to the login form
        return { success: true }
      // Login failed, return error message
      } else {
        // Extract error message from the response and return it to the login form
        return { success: false, error: 'Invalid username or password' }
      }

    // Handle network errors or other unexpected issues during the login process
    } catch (error) {
      // Return a generic network error message to the login form if an exception occurs
      return { success: false, error: 'Network error' }
    // Set loading state back to false after login attempt is complete, regardless of success or failure
    } finally {
      // Set loading state back to false after login attempt is complete, regardless of success or failure
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
        // Extract error message from the response and return it to the registration form
        const error = await response.json()
        // Return error response to the registration form
        return { success: false, error: error.error || 'Registration failed' }
      }
    
    // Handle network errors or other unexpected issues during the registration process
    } catch (error) {
      // Return a generic network error message to the registration form if an exception occurs
      return { success: false, error: 'Network error' }
      // Set loading state back to false after registration attempt is complete, regardless of success or failure
    } finally {
      // Set loading state back to false after registration attempt is complete, regardless of success or failure
      setLoading(false)
    }
  }

  // Handle user logout by clearing the user state
  const logout = () => {
    // Clear the user state to log out the user
    setUser(null)
  }

  // If no user is logged in, render the LoginPage component and pass the login and register functions as props
  if (!user) {
    // Render the LoginPage component, passing the login and register functions as props, along with the loading state
    return <LoginPage onLogin={login} onRegister={register} isLoading={loading} />
  }

  // If a user is logged in, render the TodoPage component and pass the user and logout function as props
  return <TodoPage user={user} onLogout={logout} />
}

// Export the App component for use in other parts of the application
export default App
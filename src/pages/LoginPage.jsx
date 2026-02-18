import React, { useState } from 'react'

// Main LoginPage component that provides a user interface for logging in and registering new users, allowing users to switch between the login and registration forms, and displaying any error messages that occur during the login or registration process
function LoginPage({ onLogin, onRegister, isLoading }) {
  const [tab, setTab] = useState('login')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  // Function to handle login form submission by calling the onLogin function with the entered username and password, and displaying any error messages that occur during the login process
  const handleLogin = async (e) => {
    // Prevent the default form submission behavior to allow for custom handling of the login process
    e.preventDefault()
    // Clear any previous error messages
    setError('')
    // Call the onLogin function with the entered username and password, and wait for the result to determine if the login was successful
    const result = await onLogin(username, password)
    // If the login was not successful, display the error message
    if (!result.success) {
      // Display the error message
      setError(result.error)
    // If the login was successful, clear the username and password fields to allow for a new login if needed
    } else {
      // Clear the username and password fields to allow for a new login if needed
      setUsername('')
      // Clear the password field to allow for a new login if needed
      setPassword('')
    }
  }

  // Function to handle registration form submission by calling the onRegister function with the entered username and password, and displaying any error messages that occur during the registration process
  const handleRegister = async (e) => {
    e.preventDefault()
    setError('')
    // Call the onRegister function with the entered username and password, and wait for the result to determine if the registration was successful
    const result = await onRegister(username, password)
    if (!result.success) {
      setError(result.error)
    } else {
      setUsername('')
      setPassword('')
    }
  }

  // Render the login and registration forms, allowing the user to switch between them using tabs, and displaying any error messages that occur during the login or registration process. The forms are disabled while the login or registration process is in progress to prevent multiple submissions, and the button text changes to indicate that the process is in progress
  return (
    <div className="container">
      <div className="auth-container">
        {/* // Render tabs for switching between the login and registration forms, with the active tab highlighted and error messages cleared when switching tabs */}
        <div className="tabs">
          {/* Render a button for the login tab, which is highlighted when the login tab is active and clears any error messages when clicked to allow the user to switch to the login form */}
          <button
            className={`${tab === 'login' ? 'active' : ''}`}
            // Clear any error messages when the login tab is clicked to provide a clean slate for the user when they switch back to the login form
            onClick={() => {
              // Set the active tab to 'login' and clear any error messages when the login tab is clicked to allow the user to switch to the login form
              setTab('login')
              // Clear any error messages when switching to the login tab to provide a clean slate for the user when they switch back to the login form
              setError('')
            }}
          >
            Login
          </button>

          {/* Render a button for the registration tab, which is highlighted when the registration tab is active and clears any error messages when clicked */}
          <button
            className={`${tab === 'register' ? 'active' : ''}`}
            onClick={() => {
              // Set the active tab to 'register' and clear any error messages when the registration tab is clicked
              setTab('register')
              setError('')
            }}
          >
            Register
          </button>
        </div>

        {/* Display any error messages that occur during the login or registration process to inform the user of any issues that need to be addressed */}
        {error && <p className="error-message">{error}</p>}

        {/* Render the login form if the login tab is active, or the registration form if the registration tab is active. The forms are disabled while the login or registration process is in progress to prevent multiple submissions, and the button text changes to indicate that the process is in progress */}
        {tab === 'login' ? (
          <form onSubmit={handleLogin}>
            <h2>Login</h2>
            <input
              type="text"
              id="login-username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={isLoading}
            />

            {/* Render an input field for the password of the user, which is required and disabled while the login process is in progress to prevent multiple submissions */}
            <input
              type="password"
              id="login-password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />

            {/* Render a submit button for the login form, which is disabled while the login process is in progress to prevent multiple submissions, and changes its text to indicate that the login process is in progress */}
            <button type="submit" disabled={isLoading}>
              {/* Render a submit button for the login form */}
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        ) : (

          // Render the registration form if the registration tab is active, which includes input fields for the username and password of the new user, and a submit button. The form is disabled while the registration process is in progress to prevent multiple submissions, and the button text changes to indicate that the registration process is in progress
          <form onSubmit={handleRegister}>
            <h2>Register</h2>
            <input
              type="text"
              id="reg-username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={isLoading}
            />

            {/* Render an input field for the password of the new user, which is required and disabled while the registration process is in progress to prevent multiple submissions */}
            <input
              type="password"
              id="reg-password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />

            {/* Render a submit button for the registration form, which is disabled while the registration process is in progress to prevent multiple submissions, and changes its text to indicate that the registration process is in progress */}
            <button type="submit" disabled={isLoading}>
              {isLoading ? 'Registering...' : 'Register'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

// Export the LoginPage component for use in other parts of the application
export default LoginPage
import React, { useState } from 'react'

function LoginPage({ onLogin, onRegister, isLoading }) {
  const [tab, setTab] = useState('login')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    const result = await onLogin(username, password)
    if (!result.success) {
      setError(result.error)
    } else {
      setUsername('')
      setPassword('')
    }
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    setError('')
    const result = await onRegister(username, password)
    if (!result.success) {
      setError(result.error)
    } else {
      setUsername('')
      setPassword('')
    }
  }

  return (
    <div className="container">
      <div className="auth-container">
        <div className="tabs">
          <button
            className={`${tab === 'login' ? 'active' : ''}`}
            onClick={() => {
              setTab('login')
              setError('')
            }}
          >
            Login
          </button>
          <button
            className={`${tab === 'register' ? 'active' : ''}`}
            onClick={() => {
              setTab('register')
              setError('')
            }}
          >
            Register
          </button>
        </div>

        {error && <p className="error-message">{error}</p>}

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
            <input
              type="password"
              id="login-password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />
            <button type="submit" disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        ) : (
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
            <input
              type="password"
              id="reg-password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />
            <button type="submit" disabled={isLoading}>
              {isLoading ? 'Registering...' : 'Register'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

export default LoginPage
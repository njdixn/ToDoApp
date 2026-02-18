// Import necessary modules and components
import React from 'react'
// Import the ReactDOM library to render the React application into the DOM
import ReactDOM from 'react-dom/client'
// Import the main application component
import App from './App.jsx'

// Render the main App component into the root div in index.html
ReactDOM.createRoot(document.getElementById('root')).render(
  // Use React.StrictMode to help identify potential problems in the app
  <React.StrictMode>
    {/* Render the App component, which is the main component of the application */}
    <App />
  </React.StrictMode>,
)
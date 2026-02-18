import React, { useState } from 'react'

// Component to display a form for adding a new todo, including input fields for the title and description of the todo and a submit button. The component receives an onAdd function as a prop, which is called with the title and description when the form is submitted to allow the user to add a new todo to their list
function AddTodoForm({ onAdd }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)

  // Function to handle form submission by calling the onAdd function with the title and description of the new todo, and resetting the form fields if the addition is successful
  const handleSubmit = async (e) => {
    // Prevent the default form submission behavior
    e.preventDefault()

    // Set the loading state to true to indicate that the addition process is in progress
    setLoading(true)
    // Call the onAdd function with the title and description of the new todo, and wait for the result to determine if the addition was successful
    const result = await onAdd(title, description)
    // Set the loading state back to false to indicate that the addition process is complete
    setLoading(false)

    // If the addition was successful, reset the form fields to allow the user to add another todo
    if (result.success) {
      // Reset the form fields to allow the user to add another todo
      setTitle('')
      // Reset the description field to an empty string to clear the form after a successful addition
      setDescription('')
    }
  }

  // Render a form for adding a new todo, including input fields for the title and description of the todo and a submit button. The form is disabled while the addition process is in progress to prevent multiple submissions, and the button text changes to indicate that the addition is in progress
  return (
    <form onSubmit={handleSubmit} id="todo-form">
      {/* Render an input field for the title of the new todo, which is required and disabled while the addition process is in progress to prevent multiple submissions */}
      <input
        type="text"
        id="todo-title"
        placeholder="What needs to be done?"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        disabled={loading}
        required
      />
      {/* Render an input field for the description of the new todo, which is optional and disabled while the addition process is in progress to prevent multiple submissions */}
      <input
        type="text"
        id="todo-desc"
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        disabled={loading}
      />

      {/* Render a submit button for the form, which is disabled while the addition process is in progress to prevent multiple submissions, and changes its text to indicate that the addition is in progress */}
      <button type="submit" disabled={loading}>
        {loading ? 'Adding...' : 'Add Task'}
      </button>
    </form>
  )
}

// Export the AddTodoForm component for use in other parts of the application
export default AddTodoForm
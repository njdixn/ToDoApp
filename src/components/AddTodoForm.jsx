import React, { useState } from 'react'

function AddTodoForm({ onAdd }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    setLoading(true)
    const result = await onAdd(title, description)
    setLoading(false)

    if (result.success) {
      setTitle('')
      setDescription('')
    }
  }

  return (
    <form onSubmit={handleSubmit} id="todo-form">
      <input
        type="text"
        id="todo-title"
        placeholder="What needs to be done?"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        disabled={loading}
        required
      />
      <input
        type="text"
        id="todo-desc"
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        disabled={loading}
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Adding...' : 'Add Task'}
      </button>
    </form>
  )
}

export default AddTodoForm
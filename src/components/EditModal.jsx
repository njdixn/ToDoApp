import React, { useState, useEffect, useRef } from 'react'

function EditModal({ todo, onClose, onSave }) {
  const [title, setTitle] = useState(todo.title)
  const [description, setDescription] = useState(todo.description || '')
  const [completed, setCompleted] = useState(todo.completed)
  const [loading, setLoading] = useState(false)
  const dialogRef = useRef(null)

  useEffect(() => {
    if (dialogRef.current) {
      dialogRef.current.showModal()
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    await onSave({
      ...todo,
      title,
      description,
      completed
    })
    setLoading(false)
  }

  return (
    <dialog ref={dialogRef} id="edit-modal">
      <form onSubmit={handleSubmit} id="edit-form">
        <h3>Edit Task</h3>

        <input type="hidden" id="edit-id" value={todo.id} />

        <label>
          Title:
          <input
            type="text"
            id="edit-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={loading}
            required
          />
        </label>

        <label>
          Description:
          <input
            type="text"
            id="edit-desc"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={loading}
          />
        </label>

        <label className="checkbox-label">
          Completed:
          <input
            type="checkbox"
            id="edit-completed"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
            disabled={loading}
          />
        </label>

        <div className="modal-buttons">
          <button type="button" id="cancel-edit" onClick={onClose} disabled={loading}>
            Cancel
          </button>
          <button type="submit" id="save-edit" disabled={loading}>
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </dialog>
  )
}

export default EditModal
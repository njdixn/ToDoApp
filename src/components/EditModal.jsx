import React, { useState, useEffect, useRef } from 'react'

// Component for editing an existing todo, which displays a modal dialog with a form for updating the title, description, and completion status of the todo. The form is pre-filled with the current values of the todo and allows the user to make changes and save them by calling the onSave function passed as a prop. The modal can be closed without saving changes by calling the onClose function passed as a prop
function EditModal({ todo, onClose, onSave }) {
  const [title, setTitle] = useState(todo.title)
  const [description, setDescription] = useState(todo.description || '')
  const [completed, setCompleted] = useState(todo.completed)
  const [loading, setLoading] = useState(false)
  const dialogRef = useRef(null)

  // Use the useEffect hook to show the modal dialog when the component mounts by calling the showModal method on the dialog element referenced by dialogRef
  useEffect(() => {
    // Check if the dialogRef is attached to a dialog element, and if so, call the showModal method to display the modal dialog when the component mounts
    if (dialogRef.current) {
      // Show the modal dialog when the component mounts by calling the showModal method on the dialog element referenced by dialogRef
      dialogRef.current.showModal()
    }
  }, [])

  // Function to handle form submission by calling the onSave function with the updated todo information, and setting the loading state to indicate that the save process is in progress
  const handleSubmit = async (e) => {
    // Prevent the default form submission behavior to allow for custom handling of the save process
    e.preventDefault()
    // Set the loading state to true to indicate that the save process is in progress
    setLoading(true)
    // Call the onSave function with the updated todo information, including the title, description, and completion status, and wait for the result to determine if the save was successful
    await onSave({
      ...todo,
      title,
      description,
      completed
    })
    // Set the loading state back to false to indicate that the save process is complete
    setLoading(false)
  }

  // Render a dialog element for the edit modal, which contains a form for editing the title, description, and completion status of the todo.
  return (
    <dialog ref={dialogRef} id="edit-modal">
      {/* Render a form for editing the todo, including input fields for the title and description, a checkbox for the completion status, and buttons to cancel or save changes. The form is disabled while the save process is in progress to prevent multiple submissions, and the save button text changes to indicate that the save is in progress */}
      <form onSubmit={handleSubmit} id="edit-form">
        <h3>Edit Task</h3>

        {/* Render a hidden input field to store the id of the todo being edited, which can be used for reference when saving changes to the todo */}
        <input type="hidden" id="edit-id" value={todo.id} />

        {/* Render an input field for the title of the todo, which is required and disabled while the save process is in progress to prevent multiple submissions. The input field is pre-filled with the current title of the todo to allow the user to make changes easily */}
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

        {/* Render an input field for the description of the todo, which is optional and disabled while the save process is in progress to prevent multiple submissions. The input field is pre-filled with the current description of the todo (or an empty string if there is no description) to allow the user to make changes easily */}
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

        {/* Render a checkbox for the completion status of the todo, which is checked if the todo is completed and disabled while the save process is in progress to prevent multiple submissions. The checkbox is pre-filled with the current completion status of the todo to allow the user to make changes easily */}
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


        {/* Render buttons to cancel or save changes, which are disabled while the save process is in progress to prevent multiple submissions. The cancel button calls the onClose function to close the modal without saving changes, and the save button submits the form to save changes to the todo, with the button text changing to indicate that the save process is in progress */}
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

// Export the EditModal component for use in other parts of the application
export default EditModal
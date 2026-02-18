import React from 'react'

// Component to display an individual todo item, including a checkbox to toggle completion, the title and description of the todo, and buttons to edit or delete the todo. The component receives the todo object and the functions to toggle, delete, and edit todos as props to allow the user to manage their todo list effectively
function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  return (
    // Render a list item for the todo, applying a 'completed' class if the todo is marked as completed. The list item includes a checkbox to toggle completion, the title and description of the todo, and buttons to edit or delete the todo
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      {/* // Render a checkbox that is checked if the todo is completed, and call the onToggle function with the todo object when the checkbox is changed to allow the user to toggle the completion status of the todo */}
      <input
        type="checkbox"
        className="todo-checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo)}
      />

      {/* Render the title and description of the todo, applying a 'completed' class to the title if the todo is marked as completed to visually indicate that the task is done */}
      <div className="todo-content">
        {/* Render the title of the todo in a heading, applying a 'completed' class if the todo is marked as completed to visually indicate that the task is done */}
        <h3>{todo.title}</h3>
        {/* If the todo has a description, render it in a paragraph below the title to provide additional details about the task */}
        {todo.description && <p>{todo.description}</p>}
      </div>

      {/* Render buttons to edit or delete the todo, calling the onEdit function with the todo object when the edit button is clicked to allow the user to edit the todo in a modal dialog, and calling the onDelete function with the todo's id when the delete button is clicked to allow the user to remove the todo from their list */}
      <div className="actions">
        <button className="btn-edit" onClick={() => onEdit(todo)}>
          Edit
        </button>
        <button className="btn-delete" onClick={() => onDelete(todo.id)}>
          Delete
        </button>
      </div>
    </li>
  )
}

// Export the TodoItem component for use in other parts of the application
export default TodoItem
import React from 'react'

function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        className="todo-checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo)}
      />
      <div className="todo-content">
        <h3>{todo.title}</h3>
        {todo.description && <p>{todo.description}</p>}
      </div>
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

export default TodoItem
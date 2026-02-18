import React from 'react'
import TodoItem from './TodoItem'

// Component to display the list of todos, rendering a TodoItem for each todo in the list and passing the necessary functions to toggle, delete, and edit todos as props to allow the user to manage their todo list effectively
function TodoList({ todos, onToggle, onDelete, onEdit }) {
  return (
    // Render an unordered list of todos, mapping over the todos array and rendering a TodoItem component for each todo. The TodoItem component receives the individual todo object and the functions to toggle, delete, and edit todos as props to allow the user to manage their todo list effectively
    <ul className="todo-list">
      {/* Render an unordered list of todos, mapping over the todos array and rendering a TodoItem component for each todo. The TodoItem component receives the individual todo object and the functions to toggle, delete, and edit todos as props to allow the user to manage their todo list effectively */}
      {todos.map((todo) => (
        // Render a TodoItem component for each todo in the list, passing the individual todo object and the functions to toggle, delete, and edit todos as props to allow the user to manage their todo list effectively
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  )
}

// Export the TodoList component for use in other parts of the application
export default TodoList
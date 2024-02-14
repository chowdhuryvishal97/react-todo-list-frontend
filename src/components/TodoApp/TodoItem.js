// TodoItem.js
import React, { useState } from 'react';

function TodoItem({ todo, toggleTodo, deleteTodo, startEditTodo, updateTodo }) {
    const [updatedTodo, setUpdatedTodo] = useState(todo.task);

    const handleUpdateInputChange = (event) => {
        setUpdatedTodo(event.target.value);
    };

    const handleUpdateClick = () => {
        updateTodo(todo.id, updatedTodo);
        // Reset the updatedTodo state after updating
        setUpdatedTodo('');
    };

    return (
        <li onClick={() => toggleTodo(todo.id)} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
            {todo.task}{' '}
            <button onClick={(e) => { e.stopPropagation(); startEditTodo(todo.id); }}>Edit</button>
            <button onClick={(e) => { e.stopPropagation(); deleteTodo(todo.id); }}>Delete</button>
            <input type="text" value={updatedTodo} onChange={handleUpdateInputChange} />
            <button onClick={handleUpdateClick}>Update</button>
        </li>
    );
}

export default TodoItem;

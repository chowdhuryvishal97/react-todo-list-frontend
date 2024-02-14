import React from 'react';

function TodoItem({ todo, toggleTodo, startEditTodo, deleteTodo }) {
    return (
        <li onClick={() => toggleTodo(todo.id)} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
            {todo.task}
            <button onClick={(e) => { e.stopPropagation(); startEditTodo(todo.id); }}>Edit</button>
            <button onClick={(e) => { e.stopPropagation(); deleteTodo(todo.id); }}>Delete</button>
        </li>
    );
}

export default TodoItem;

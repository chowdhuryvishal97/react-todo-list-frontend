import React from 'react';

function TodoItem({ todo, toggleTodo, startEditTodo, deleteTodo }) {
    return (
        <li className={`todo-item ${todo.completed ? 'completed' : ''}`} onClick={() => toggleTodo(todo.id)}>
            <span className="todo-text">{todo.task}</span>
            <div className="action-buttons">
                <button className="edit-btn" onClick={(e) => { e.stopPropagation(); startEditTodo(todo.id); }}>Edit</button>
                <button onClick={(e) => { e.stopPropagation(); deleteTodo(todo.id); }}>Delete</button>
            </div>
        </li>
    );
}

export default TodoItem;

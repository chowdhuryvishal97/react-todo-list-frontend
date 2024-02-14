// TodoForm.js
import React, { useState } from 'react';

function TodoForm({ addTodo }) {
    const [newTodo, setNewTodo] = useState('');

    const handleInputChange = (event) => {
        setNewTodo(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!newTodo.trim()) return;
        addTodo(newTodo);
        setNewTodo('');
    };

    return (
        <div>
            <input type="text" value={newTodo} onChange={handleInputChange} />
            <button onClick={handleSubmit}>Add Todo</button>
        </div>
    );
}

export default TodoForm;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TodoApp() {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');
    const [updatedTodo, setUpdatedTodo] = useState('');
    const [editTodoId, setEditTodoId] = useState(null); // State variable to store the ID of the todo item being edited

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/todos/');
            setTodos(response.data);
        } catch (error) {
            console.error('Error fetching todos:', error);
        }
    };

    const handleInputChange = (event) => {
        setNewTodo(event.target.value);
    };

    const addTodo = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/todos/', {
                task: newTodo,
                completed: false,
            });
            console.log(response.data);
            setTodos([...todos, response.data]);
            setNewTodo('');
        } catch (error) {
            console.error('Error adding todo:', error);
        }
    };

    const toggleTodo = async (id) => {
        const updatedTodos = todos.map((todo) => {
            if (todo.id === id) {
                todo.completed = !todo.completed;
            }
            return todo;
        });
        setTodos(updatedTodos);

        try {
            await axios.put(`http://localhost:8080/api/todos/${id}`, updatedTodos.find((todo) => todo.id === id));
        } catch (error) {
            console.error('Error updating todo:', error);
        }
    };

    const deleteTodo = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/todos/${id}`);
            setTodos(todos.filter((todo) => todo.id !== id));
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    };

    const handleUpdateInputChange = (event) => {
        setUpdatedTodo(event.target.value);
    };

    const updateTodo = async (id, updatedTask) => {
        try {
            await axios.put(`http://localhost:8080/api/todos/${id}`, {
                task: updatedTask,
                completed: false, // You may adjust this based on your application logic
            });

            const updatedTodos = todos.map(todo => {
                if (todo.id === id) {
                    return {
                        ...todo,
                        task: updatedTask
                    };
                }
                return todo;
            });

            setTodos(updatedTodos);
            setUpdatedTodo('');
            setEditTodoId(null); // Reset the editTodoId state after updating
        } catch (error) {
            console.error('Error updating todo:', error);
        }
    };

    const startEditTodo = (id) => {
        setEditTodoId(id); // Set the ID of the todo item being edited
        const todoToEdit = todos.find(todo => todo.id === id);
        setUpdatedTodo(todoToEdit.task); // Set the updatedTodo state to the current task content
    };

    return (
        <div>
            <h1>Todo List</h1>
            <div>
                <input type="text" value={newTodo} onChange={handleInputChange} />
                <button onClick={addTodo}>Add Todo</button>
            </div>
            <h1>Update Todo</h1>
            <div>
                <input type="text" placeholder="Enter updated todo" value={updatedTodo} onChange={handleUpdateInputChange} />
                {/* Conditionally render the button based on whether there's an editTodoId */}
                {editTodoId !== null ? (
                    <button onClick={() => updateTodo(editTodoId, updatedTodo)}>Update Todo</button>
                ) : null}
            </div>

            <ul>
                {todos.map((todo) => (
                    <li key={todo.id} onClick={() => toggleTodo(todo.id)} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                        {todo.task}{' '}
                        {/* Pass the todo id to startEditTodo when clicking on the todo item */}
                        <button onClick={(e) => { e.stopPropagation(); startEditTodo(todo.id); }}>Edit</button>
                        <button onClick={(e) => { e.stopPropagation(); deleteTodo(todo.id); }}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TodoApp;

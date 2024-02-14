import React, { useState, useEffect } from 'react';
import TodoItem from './TodoItem';
import todoService from '../../services/todoService';

function TodoApp() {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');
    const [updatedTodo, setUpdatedTodo] = useState('');
    const [editTodoId, setEditTodoId] = useState(null);

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        try {
            const todosData = await todoService.getAllTodos();
            setTodos(todosData);
        } catch (error) {
            console.error('Error fetching todos:', error);
        }
    };

    const handleInputChange = (event) => {
        setNewTodo(event.target.value);
    };

    const addTodo = async () => {
        try {
            const newTodoData = await todoService.addTodo({
                task: newTodo,
                completed: false,
            });
            setTodos([...todos, newTodoData]);
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
            await todoService.updateTodo(id, updatedTodos.find((todo) => todo.id === id));
        } catch (error) {
            console.error('Error updating todo:', error);
        }
    };

    const deleteTodo = async (id) => {
        try {
            await todoService.deleteTodo(id);
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
            await todoService.updateTodo(id, {
                task: updatedTask,
                completed: false,
            });

            const updatedTodos = todos.map(todo => {
                if (todo.id === id) {
                    return { ...todo, task: updatedTask };
                }
                return todo;
            });

            setTodos(updatedTodos);
            setUpdatedTodo('');
            setEditTodoId(null);
        } catch (error) {
            console.error('Error updating todo:', error);
        }
    };

    const startEditTodo = (id) => {
        setEditTodoId(id);
        const todoToEdit = todos.find(todo => todo.id === id);
        setUpdatedTodo(todoToEdit.task);
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
                {editTodoId !== null && (
                    <button onClick={() => updateTodo(editTodoId, updatedTodo)}>Update Todo</button>
                )}
            </div>

            <ul>
                {todos.map((todo) => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        toggleTodo={toggleTodo}
                        startEditTodo={startEditTodo}
                        deleteTodo={deleteTodo}
                    />
                ))}
            </ul>
        </div>
    );
}

export default TodoApp;

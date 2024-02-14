import axios from 'axios';

const API_URL = 'http://localhost:8080/api/todos/';

const getAllTodos = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

const addTodo = async (todoData) => {
    const response = await axios.post(API_URL, todoData);
    return response.data;
};

const updateTodo = async (id, todoData) => {
    await axios.put(`${API_URL}${id}`, todoData);
};

const deleteTodo = async (id) => {
    await axios.delete(`${API_URL}${id}`);
};

const todoService = {
    getAllTodos,
    addTodo,
    updateTodo,
    deleteTodo
};

export default todoService;

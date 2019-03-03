import uuidv4 from "uuid/v4";

let todos = [];

const loadTodos = () => {
    const todoStorage = localStorage.getItem("todos");
    try {
        todos = todoStorage ? JSON.parse(todoStorage) : [];
    } catch (e) {
        todos = [];
    }
};

const saveTodos = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
};

const getTodos = () => todos;

const createTodo = (todoText) => {
    if (todoText.length > 0) {
        const newTask = {
            id: uuidv4(),
            task: todoText,
            status: false
        };
        todos.push(newTask);
        saveTodos(todos);
    }
};

const removeTodo = (todoId) => {
    const todoIndex = todos.findIndex((todo) => todo.id === todoId);
    if (todoIndex > -1) {
        todos.splice(todoIndex, 1);
        saveTodos(todos);
    }
}

const toggleTodo = (todoId) => {
    const todoItem = todos.find((todo) => todo.id === todoId);
    if (todoItem) {
        todoItem.status = !todoItem.status;
        saveTodos(todos);
    }
};

loadTodos();
export {loadTodos, getTodos, createTodo, removeTodo, toggleTodo};
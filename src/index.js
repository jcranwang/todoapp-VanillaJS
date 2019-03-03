import { setFilters } from "./filters";
import { createTodo, loadTodos } from "./todos";
import { renderTodos } from "./views";

renderTodos();

const todoField = document.querySelector("#new-todo");
todoField.addEventListener("input", (e) => {
    setFilters({
        searchTask: e.target.value
    });
    renderTodos();
});

const hideCheckbox = document.querySelector("#hide-completed");
hideCheckbox.addEventListener("change", (e) => {
    setFilters({
        hideCompleted: e.target.checked
    });
    renderTodos();
});

const todoForm = document.querySelector("#add-todo");
todoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    createTodo(e.target.newTodo.value.trim());
    renderTodos();
    e.target.newTodo.value = "";
});

window.addEventListener("storage", (e) => {
    if (e.key === "todos") {
        loadTodos();
        renderTodos();
    }
});



import { getTodos, toggleTodo, removeTodo } from "./todos";
import { getFilters } from "./filters";

const renderTodos = () => {
    const todos = getTodos();
    const todoFilter = getFilters();
    const filterTodos = todos.filter((todo) => {
        const textFilter = todo.task.toLowerCase().includes(todoFilter.searchTask.toLowerCase());
        const hideFilter = !todoFilter.hideCompleted || !todo.status;
        return textFilter && hideFilter;
    });

    const remainTodo = filterTodos.filter((todo) => !todo.status);
    const todoSection = document.querySelector("#todo-sec");
    todoSection.innerHTML = "";
    if (filterTodos.length > 0) {
        todoSection.appendChild(generateSummaryDOM(remainTodo));
        filterTodos.forEach((item) => {
            todoSection.appendChild(generateTodoDOM(item));
        });
    } else {
        const emptyMsg = document.createElement("p");
        emptyMsg.textContent = "No to-dos to show";
        emptyMsg.classList.add("empty-message");
        todoSection.appendChild(emptyMsg);
    }
};


const generateTodoDOM = (item) => {
    const newTodoDiv = document.createElement("label");
    const containerDiv = document.createElement("div");
    const todoCheckbox = document.createElement("input");
    const newP = document.createElement("span");
    const removeBtn = document.createElement("button");

    // Checkbox
    todoCheckbox.setAttribute("type", "checkbox");
    todoCheckbox.checked = item.status;
    todoCheckbox.classList.add("checkbox");
    todoCheckbox.addEventListener("change", () => {
        toggleTodo(item.id);
        renderTodos();
    });
    containerDiv.appendChild(todoCheckbox);

    // Todo text
    newP.textContent = item.task;
    containerDiv.appendChild(newP);

    // Render container
    newTodoDiv.classList.add("list-item");
    containerDiv.classList.add("list-item__container");
    newTodoDiv.appendChild(containerDiv);

    // Remove Button
    removeBtn.textContent = "remove";
    removeBtn.classList.add("button", "button--text");
    removeBtn.addEventListener("click", () => {
        removeTodo(item.id);
        renderTodos();
    });
    newTodoDiv.appendChild(removeBtn);
    return newTodoDiv;
};

const generateSummaryDOM = (remainTodo) => {
    const todoSummary = document.createElement("h2");
    const pluralLetter = remainTodo.length === 1 ? "" : "s";
    todoSummary.textContent = `You have ${remainTodo.length} item${pluralLetter} to do.`
    todoSummary.classList.add("list-title");
    return todoSummary;
}

export { renderTodos };
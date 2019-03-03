const todoFilter = {
    searchTask: "",
    hideCompleted: false
};

const getFilters = () => todoFilter;

const setFilters = (updates) => {
    if (typeof updates.searchTask === "string") {
        todoFilter.searchTask = updates.searchTask;
    }
    if (typeof updates.hideCompleted === "boolean") {
        todoFilter.hideCompleted = updates.hideCompleted;
    }
};

export {getFilters, setFilters};
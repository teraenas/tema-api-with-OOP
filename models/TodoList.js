class TodoList {
  async get() {
    try {
      const response = await fetch(API_URL);
      const todoList = await response.json();
      todoList.forEach(todo => {
        this[`todo${todo._id}`] = new Todo(
          todo._id,
          todo.todo,
          todo.isCompleted
        );
      });
    } catch (error) {
      console.warn(`Error(${error.name}): ${error.message}`);
    }
  }
}

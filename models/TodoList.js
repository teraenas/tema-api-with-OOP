class TodoList {
  async getAllRemoteTodos() {
    try {
      const response = await fetch(API_URL);
      const todoList = await response.json();
      todoList.forEach(todo => {
        this[`todo-${todo._id}`] = new Todo(
          `todo-${todo._id}`,
          todo.todo,
          todo.isCompleted
        );
      });
    } catch (error) {
      console.warn(`Error(${error.name}): ${error.message}`);
    }
  }

  async addRemoteTodo(content) {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          todo: content.trim() || 'Nothing to do. Did we miss something?',
          isCompleted: false,
        }),
      });
      const todo = await response.json();
      this[`todo-${todo._id}`] = new Todo(
        `todo-${todo._id}`,
        todo.todo,
        todo.isCompleted
      );
      return this[`todo-${todo._id}`];
    } catch (error) {
      console.warn(`Error(${error.name}): ${error.message}`);
    }
  }

  async deleteRemoteTodo(id) {
    try {
      const response = await fetch(`${API_URL}${id.split('-')[1]}`, {
        method: 'DELETE',
      });
      const todo = await response.json();
      delete this[`todo-${todo._id}`];
    } catch (error) {
      console.warn(`Error(${error.name}): ${error.message}`);
    }
  }
}

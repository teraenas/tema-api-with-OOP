class TodoListDisplay {
  constructor() {
    this.populate();
  }
  async populate() {
    const todos = new TodoList();
    await todos.get();
    this.todos = todos;
    Object.values(this.todos).forEach(todo => {
      const todoElement = new TodoElement(
        todo.id,
        todo.content,
        todo.isCompleted
      );
      todoListContainer.appendChild(todoElement.todo);
    });
  }
}

class LocalTodoList {
  constructor() {
    this.todoList = new TodoList();
    this.todoElementList = {};
    this.init();
  }

  async init() {
    while (todoListContainer.hasChildNodes()) {
      todoListContainer.removeChild(todoListContainer.lastChild);
    }
    await this.todoList.getAllRemoteTodos();
    Object.keys(this.todoList).forEach(todo => {
      const todoElement = new TodoElement(this.todoList[todo]);
      this.todoElementList[todoElement.id] = todoElement;
    });

    Object.values(this.todoElementList).forEach(todo =>
      this.initListeners(todo)
    );
  }

  async addTodo(content) {
    const newTodo = await this.todoList.addRemoteTodo(content);
    const newTodoElement = new TodoElement(newTodo);
    this.todoElementList[newTodoElement.id] = newTodoElement;
    this.initListeners(newTodoElement);
    addTodoInput.value = '';
    addTodoButton.setAttribute('disabled', '');
  }

  async deleteTodo(id) {
    await this.todoList.deleteRemoteTodo(id);
    todoListContainer.removeChild(this.todoElementList[id].todo);
    delete this.todoElementList[id];
    console.log(this.todoElementList);
    console.log(this.todoList);
  }

  initListeners(todo) {
    todo.deleteButton.addEventListener('click', () => {
      this.deleteTodo(todo.id);
    });
  }
}

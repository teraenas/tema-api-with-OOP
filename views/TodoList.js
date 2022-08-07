class LocalTodoList {
  #checkNoTodos() {
    const hasPlaceholder = todoListContainer.querySelector(
      '.no-todos-placeholder'
    );
    if (hasPlaceholder) todoListContainer.removeChild(hasPlaceholder);
    if (Object.keys(this.todoList).length === 0) {
      const placeholder = document.createElement('div');
      placeholder.classList.add('no-todos-placeholder');
      const placeholderText = document.createElement('h3');
      placeholderText.innerText = 'There is nothing left to do.';

      placeholder.appendChild(placeholderText);
      todoListContainer.appendChild(placeholder);
    }
  }

  constructor() {
    this.todoList = new TodoList();
    this.todoElementList = {};
    this.init();
  }

  async init() {
    while (todoListContainer.hasChildNodes()) {
      todoListContainer.removeChild(todoListContainer.lastChild);
    }

    todoListContainer.appendChild(loadingIndicator());
    await this.todoList.getAllRemoteTodos();
    todoListContainer.removeChild(todoListContainer.lastChild);

    Object.keys(this.todoList).forEach(todo => {
      const todoElement = new TodoElement(this.todoList[todo]);
      this.todoElementList[todoElement.localTodo.id] = todoElement;
      this.initListeners(todoElement);
    });

    this.#checkNoTodos();
    updateGeneralProgress();
  }

  async addTodo(content) {
    todoListContainer.appendChild(loadingIndicator());
    const newTodo = await this.todoList.addRemoteTodo(content);
    todoListContainer.removeChild(todoListContainer.lastChild);

    const newTodoElement = new TodoElement(newTodo);
    this.todoElementList[newTodoElement.localTodo.id] = newTodoElement;
    this.initListeners(newTodoElement);
    addTodoInput.value = '';
    addTodoButton.setAttribute('disabled', '');

    this.#checkNoTodos();
    updateGeneralProgress();
  }

  async deleteTodo(id) {
    this.todoElementList[id].todo.appendChild(loadingIndicator());
    await this.todoList.deleteRemoteTodo(id);

    todoListContainer.removeChild(this.todoElementList[id].todo);
    delete this.todoElementList[id];

    this.#checkNoTodos();
    updateGeneralProgress();
  }

  initListeners(todo) {
    todo.deleteButton.addEventListener('click', () => {
      this.deleteTodo(todo.localTodo.id);
    });
  }
}

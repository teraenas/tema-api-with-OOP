class TodoElement {
  #createNewElement({
    type = '',
    id = '',
    cls = '',
    attr = null,
    children = null,
  }) {
    const element = document.createElement(type);
    if (id) element.setAttribute('id', id);
    if (cls) element.className = cls;
    if (attr) {
      attr.forEach(attribute => {
        element.setAttribute(attribute.name, attribute.value);
      });
    }
    if (children) {
      children.forEach(child => {
        if (typeof child === 'string') {
          const textNode = document.createTextNode(child);
          element.append(textNode);
        } else {
          element.appendChild(child);
        }
      });
    }
    return element;
  }

  constructor(todo) {
    this.localTodo = todo;

    this.todoText = this.#createNewElement({
      type: 'div',
      cls: 'todo-text',
      children: [this.localTodo.content],
    });

    this.cancelEditButton = this.#createNewElement({
      type: 'button',
      cls: 'hybrid sm themed inverted',
      children: ['CANCEL'],
    });

    this.saveEditButton = this.#createNewElement({
      type: 'button',
      cls: 'hybrid sm themed inverted',
      attr: [{ name: 'disabled', value: '' }],
      children: ['SAVE'],
    });

    this.editControls = this.#createNewElement({
      type: 'div',
      cls: 'todo-edit-controls',
      children: [this.cancelEditButton, this.saveEditButton],
    });

    this.todoContent = this.#createNewElement({
      type: 'div',
      cls: 'todo-content',
      children: [this.todoText, this.editControls],
    });

    this.completeIcon = this.#createNewElement({
      type: 'i',
      cls: 'fa-solid fa-check',
    });

    this.completeStatus = this.#createNewElement({
      type: 'span',
      cls: 'complete-status',
      children: [this.localTodo.isCompleted ? 'Completed' : 'Complete'],
    });

    this.markCompleteButton = this.#createNewElement({
      type: 'button',
      cls: 'hybrid sm themed inverted',
      attr: [
        ...(this.localTodo.isCompleted
          ? [{ name: 'disabled', value: '' }]
          : []),
        { name: 'role', value: 'complete-button' },
      ],
      children: [this.completeIcon, this.completeStatus],
    });

    this.editIcon = this.#createNewElement({
      type: 'i',
      cls: 'fa-solid fa-pen',
    });

    this.editButton = this.#createNewElement({
      type: 'button',
      cls: 'pictogram sm dark',
      attr: [
        ...(this.localTodo.isCompleted
          ? [{ name: 'disabled', value: '' }]
          : []),
        { name: 'role', value: 'edit-button' },
      ],
      children: [this.editIcon],
    });

    this.deleteIcon = this.#createNewElement({
      type: 'i',
      cls: 'fa-solid fa-trash-can',
    });

    this.deleteButton = this.#createNewElement({
      type: 'button',
      cls: 'pictogram sm dark',
      attr: [{ name: 'role', value: 'delete-button' }],
      children: [this.deleteIcon],
    });

    this.todoControls = this.#createNewElement({
      type: 'div',
      cls: 'todo-controls',
      children: [this.markCompleteButton, this.editButton, this.deleteButton],
    });

    this.todo = this.#createNewElement({
      type: 'div',
      id: this.id,
      cls: 'todo',
      attr: [
        {
          name: 'status',
          value: this.localTodo.isCompleted ? 'complete' : 'incomplete',
        },
      ],
      children: [this.todoContent, this.todoControls],
    });

    this.editButton.addEventListener('click', () =>
      this.toggleEditTodo(this.editButton)
    );

    this.cancelEditButton.addEventListener('click', () =>
      this.toggleEditTodo(this.cancelEditButton)
    );

    this.saveEditButton.addEventListener('click', () => {
      this.confirmEditTodo();
    });

    this.todoText.addEventListener('input', () => this.validateEditInput());

    this.markCompleteButton.addEventListener('click', () =>
      this.markComplete()
    );

    todoListContainer.appendChild(this.todo);
  }

  async markComplete() {
    this.todo.appendChild(loadingIndicator());
    await this.localTodo.markComplete();
    this.todo.removeChild(this.todo.lastChild);

    this.todo.setAttribute('status', 'complete');
    this.markCompleteButton.setAttribute('disabled', '');
    this.completeStatus.innerHTML = 'Completed';
    this.editButton.setAttribute('disabled', '');
    if (this.todoContent.hasAttribute('editing')) {
      this.closeEditTodo();
    }
    updateGeneralProgress();
  }

  toggleEditTodo(target) {
    if (target === this.cancelEditButton) {
      this.closeEditTodo();
    } else {
      this.todoContent.setAttribute('editing', '');
      this.todoText.setAttribute('contenteditable', '');
      this.todoText.focus();
    }
  }

  closeEditTodo() {
    this.todoContent.removeAttribute('editing');
    this.todoText.removeAttribute('contenteditable');
    this.saveEditButton.setAttribute('disabled', '');
    this.todoText.innerText = this.localTodo.content;
  }

  async confirmEditTodo() {
    this.todo.appendChild(loadingIndicator());
    await this.localTodo.edit(this.todoText.innerText.trim());
    this.todo.removeChild(this.todo.lastChild);

    this.closeEditTodo();
  }

  validateEditInput() {
    const pattern = new RegExp(`^\\s*${this.localTodo.content}\\s*$`);
    if (!this.todoText.innerText.match(pattern)) {
      this.saveEditButton.removeAttribute('disabled');
    } else {
      this.saveEditButton.setAttribute('disabled', '');
    }
  }
}

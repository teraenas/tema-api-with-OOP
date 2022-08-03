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
  constructor(id, content, isCompleted) {
    this.id = id;
    this.content = content;
    this.isCompleted = isCompleted;

    this.todoText = this.#createNewElement({
      type: 'div',
      cls: 'todo-text',
      children: [this.content],
    });

    this.todoContent = this.#createNewElement({
      type: 'div',
      cls: 'todo-content',
      children: [this.todoText],
    });

    this.completeIcon = this.#createNewElement({
      type: 'i',
      cls: 'fa-solid fa-check',
    });

    this.completeStatus = this.#createNewElement({
      type: 'span',
      cls: 'complete-status',
      children: [this.isCompleted ? 'Completed' : 'Complete'],
    });

    this.markCompleteButton = this.#createNewElement({
      type: 'button',
      cls: 'hybrid sm themed inverted',
      attr: [
        ...(this.isCompleted ? [{ name: 'disabled', value: '' }] : []),
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
        ...(this.isCompleted ? [{ name: 'disabled', value: '' }] : []),
        { name: 'role', value: 'edit-button' },
      ],
      children: [this.editIcon],
    });

    //   this.editButton.addEventListener('click', handleEditTodo);

    //   this.markCompleteButton.addEventListener('click', () => {
    //     markComplete(id);
    //   });

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

    //   this.deleteButton.addEventListener('click', () => {
    //     deleteTodo(id);
    //   });

    this.todoControls = this.#createNewElement({
      type: 'div',
      cls: 'todo-controls',
      children: [this.markCompleteButton, this.editButton, this.deleteButton],
    });

    this.todo = this.#createNewElement({
      type: 'div',
      id: `todo${this.id}`,
      cls: 'todo',
      attr: [
        { name: 'status', value: this.isCompleted ? 'complete' : 'incomplete' },
      ],
      children: [this.todoContent, this.todoControls],
    });
  }
}

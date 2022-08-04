class Todo {
  constructor(id, content, isCompleted) {
    this.id = id;
    this.content = content;
    this.isCompleted = isCompleted;
  }

  async get() {
    try {
      const response = await fetch(`${API_URL}${this.id.split('-')[1]}`);
      const todo = await response.json();
      return todo;
    } catch (error) {
      console.warn(`Error(${error.name}): ${error.message}`);
    }
  }

  async markComplete() {
    try {
      const response = await fetch(`${API_URL}${this.id.split('-')[1]}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          isCompleted: true,
        }),
      });
      const todo = await response.json();
      this.isCompleted = todo.isCompleted;
      return this;
    } catch (error) {
      console.warn(`Error(${error.name}): ${error.message}`);
    }
  }

  async edit() {
    try {
      const response = await fetch(`${API_URL}${this.id.split('-')[1]}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          todo: this.content,
        }),
      });
      const todo = await response.json();
      return todo;
    } catch (error) {
      console.warn(`Error(${error.name}): ${error.message}`);
    }
  }
}

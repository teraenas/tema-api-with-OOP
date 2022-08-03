class Todo {
  constructor(id, content, isCompleted) {
    this.id = id;
    this.content = content;
    this.isCompleted = isCompleted;
  }

  async get() {
    try {
      const response = await fetch(`${API_URL}${this.id}`);
      const todo = await response.json();
      return todo;
    } catch (error) {
      console.warn(`Error(${error.name}): ${error.message}`);
    }
  }

  async add() {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          todo: this.content.trim() || 'Nothing to do. Did we miss something?',
          isCompleted: this.isCompleted,
        }),
      });
      const todo = await response.json();
      return todo;
    } catch (error) {
      console.warn(`Error(${error.name}): ${error.message}`);
    }
  }

  async markComplete() {
    try {
      const response = await fetch(`${API_URL}${this.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          isCompleted: this.isCompleted,
        }),
      });
      const todo = await response.json();
      return todo;
    } catch (error) {
      console.warn(`Error(${error.name}): ${error.message}`);
    }
  }

  async edit() {
    try {
      const response = await fetch(`${API_URL}${this.id}`, {
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

  async delete() {
    try {
      const response = await fetch(`${API_URL}${this.id}`, {
        method: 'DELETE',
      });
      const todo = await response.json();
      return todo;
    } catch (error) {
      console.warn(`Error(${error.name}): ${error.message}`);
    }
  }
}

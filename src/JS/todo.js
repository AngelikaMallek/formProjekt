export class ValidationError extends Error {
  constructor(errors) {
    super('Validation error');
    this.errors = errors;
  }
}

export class Todo {
  constructor(topic, description = '') {
    this.id = Date.now();
    this.topic = topic;
    this.description = description;
    this.status = 'todo';
    this.createdAt = new Date();

    this.validate();
  }

  toggleStatus() {
    this.status = this.status === 'todo' ? 'done' : 'todo';
  }

  validate() {
    const errors = {};

    if (!this.topic || !this.topic.trim()) {
      errors.topic = 'Topic is required';
    }

    if (this.topic && this.topic.length > 50) {
      errors.topic = 'Description must be max 50 characters';
    }

    if (this.description.length > 200) {
      errors.description = 'Description must be max 200 characters';
    }

    if (Object.keys(errors).length > 0) {
      throw new ValidationError(errors);
    }
  }
}
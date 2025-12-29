class ValidationError extends Error {
  constructor(errors) {
    super('Validation error');
    this.errors = errors;
  }
}

class Todo {
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

const todos = [];

const form = document.querySelector('#taskForm');
const taskList = document.querySelector('#taskList');
const dialog = document.querySelector('#task-dialog');
const dialogContent = document.querySelector('#dialog__content');
const dialogCloseButton = document.querySelector('#dialog__button');



dialogCloseButton.addEventListener('click', () => {
  dialog.close();
});

const buildDialogContent = (todo) => {
  return `
    <p><strong>Topic:</strong> ${todo.topic}</p>
    <p><strong>Description:</strong> ${todo.description || '-'}</p>
    <p><strong>Status:</strong> ${todo.status}</p>
    <p><strong>Created at:</strong> ${todo.createdAt.toLocaleString()}</p>
  `;
};

const clearErrors = () => {
  document.querySelectorAll('.errors').forEach(e => e.textContent = '');
};

const showErrors = (errors) => {
  for (const field in errors) {
    const box = document.querySelector(`.errors[data-input="${field}"]`);
    if (box) {
      box.textContent = errors[field];
    }
  }
};

const sortTodosByDate = () => {
  todos.sort((a, b) => a.createdAt - b.createdAt);
};

const render = () => {
  taskList.innerHTML = '';

  todos.forEach(todo => {
    const li = document.createElement('li');
    li.classList.add('list__item');

    li.innerHTML = `
      <strong>${todo.topic}</strong><br>
      Date: ${todo.createdAt.toLocaleString()}<br>
      Status: ${todo.status}<br>

      <button class="task__details">Show Details</button>
      <button class="task__toggle">Change status</button>
      <button class="task__delete">Delete</button>
    `;

    li.querySelector('.task__toggle').addEventListener('click', () => {
      todo.toggleStatus();
      render();
    });

    li.querySelector('.task__delete').addEventListener('click', () => {
      const index = todos.findIndex(t => t.id === todo.id);
      todos.splice(index, 1);
      render();
    });

    li.querySelector('.task__details').addEventListener('click', () => {
      dialogContent.innerHTML = buildDialogContent(todo);
      dialog.showModal();
    });

    taskList.appendChild(li);
  });
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  clearErrors();

  const data = new FormData(form);

  try {
    const todo = new Todo(
      data.get('topic'),
      data.get('description')
    );

    todos.push(todo);
    sortTodosByDate();
    render();
    form.reset();

  } catch (error) {
    if (error instanceof ValidationError) {
      showErrors(error.errors);
    } else {
      console.error(error);
    }
  }
});

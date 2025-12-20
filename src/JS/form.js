const form = document.querySelector('#taskForm');
const taskList = document.querySelector('#taskList');

const showAlert = (msg) => alert(msg);
const showConfirm = (msg) => confirm(msg);
const showPrompt = (msg) => prompt(msg);

const showError = (name, message) => {
  const box = document.querySelector(`.errors[data-input="${name}"]`);
  box.textContent = message;
};

const clearErrors = () => {
  document.querySelectorAll('.errors').forEach(e => e.textContent = '');
};

const validators = {
  topic: (value) => {
    if (!value.trim()) return 'Topic is required';
    return null;
  },

  description: (value) => {
    if (value.trim().length < 5) {
      return 'Description must be at least 5 characters';
    }
    return null;
  },

  date: (value) => {
    const today = new Date().toISOString().split('T')[0];
    if (!value) return 'Completion date is required';
    if (value < today) return 'Date cannot be in the past';
    return null;
  },

  priority: (value) => {
    if (!value) return 'Please select a priority';
    return null;
  },

  status: (value) => {
    if (!value) return 'Please select a status';
    return null;
  },

  assignedTo: (value) => {
    if (!value.trim()) return 'Please enter the person responsible';
    return null;
  },

  repeat: (value) => {
    if (!value) return 'Please select a repeat';
    return null;
  }
};

const validateForm = (formData) => {
  let isValid = true;

  for (const field in validators) {
    const value = formData.get(field) || '';
    const error = validators[field](value);

    if (error) {
      showError(field, error);
      isValid = false;
    }
  }

  return isValid;
};

const buildConfirmMessage = (task) => {
  return `
Czy na pewno chcesz dodać to zadanie?

Topic: ${task.topic}
Description: ${task.description}
Date: ${task.date}
Priority: ${task.priority}
Status: ${task.status}
Assigned to: ${task.assignedTo}
Repeat: ${task.repeat}
${task.tag ? `Tag: ${task.tag}` : ''}
`;
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  clearErrors();

  const data = new FormData(form);

  if (!validateForm(data)) return;

  const tag = showPrompt('Add a tag for this task (optional):');

  const task = {
    topic: data.get('topic'),
    description: data.get('description'),
    date: data.get('date'),
    priority: data.get('priority'),
    status: data.get('status'),
    assignedTo: data.get('assignedTo'),
    repeat: data.get('repeat'),
    tag: tag
  };

  const confirmMessage = buildConfirmMessage(task);

  if (!showConfirm(confirmMessage)) return;

  addTaskToList(task);
  showAlert('Task added successfully');
  form.reset();
});

const addTaskToList = (task) => {
  const li = document.createElement('li');
  li.classList.add('list__item');

  li.innerHTML = `
    <strong>Topic:</strong> ${task.topic}
    <strong>Description:</strong> ${task.description}
    <strong>Date:</strong> ${task.date}
    <strong>Priority:</strong> ${task.priority}
    <strong>Status:</strong> ${task.status}
    <strong>Assigned to:</strong> ${task.assignedTo}
    <strong>Repeat:</strong> ${task.repeat}
    ${task.tag ? `<strong>Tag:</strong> ${task.tag}<br>` : '<br>'}
    <button class="task__delete">Usuń</button>
  `;

  const deleteButton = li.querySelector('.task__delete');

  deleteButton.addEventListener('click', () => {
    if (confirm('Czy na pewno chcesz usunąć to zadanie?')) {
      li.remove();
    }
  });

  taskList.appendChild(li);
};

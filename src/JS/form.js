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

form.addEventListener('submit', (e) => {
  e.preventDefault();
  clearErrors();

  const data = new FormData(form);
  let valid = true;

  if (!data.get('topic') || !data.get('topic').trim()) {
    showError('topic', 'Topic is required');
    valid = false;
  }

  if (!data.get('description') || data.get('description').trim().length < 5) {
    showError('description', 'Description must be at least 5 characters');
    valid = false;
  }

  if (!data.get('date') || data.get('date') < new Date().toISOString().split('T')[0]) {
    showError('date', 'Completion date is required and cannot be in the past');
    valid = false;
  }

  if (!data.get('priority')) {
    showError('priority', 'Please select a priority');
    valid = false;
  }

  if (!data.get('status')) {
    showError('status', 'Please select a status');
    valid = false;
  }

  if (!data.get('assignedTo') || !data.get('assignedTo').trim()) {
    showError('assignedTo', 'Please enter the person responsible');
    valid = false;
  }

  if (!data.get('repeat')) {
    showError('repeat', 'Please select a repeat');
    valid = false;
  }

  if (!valid) return;

  if (!showConfirm('Are you sure you want to add this task?')) return;

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

  addTaskToList(task);

  showAlert('Task added successfully');

  form.reset();

});

const addTaskToList = (task) => {
  const li = document.createElement('li');
  li.classList.add('list__item');

  li.innerHTML = `
    <strong>Topic:</strong> ${task.topic}
    <strong>Description:</strong>  ${task.description}
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




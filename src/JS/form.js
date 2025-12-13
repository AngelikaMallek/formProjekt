const form = document.querySelector('#taskForm');

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

  alert('Task added successfully!');
  form.reset();
});

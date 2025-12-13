const form = document.querySelector('#contactForm');

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

  if (!data.get('name').trim()) {
    showError('name', 'Name is required');
    valid = false;
  }

  if (!data.get('email').trim()) {
    showError('email', 'Email is required');
    valid = false;
  }

  if (!data.get('age').trim()) {
    showError('age', 'Age is required');
    valid = false;
  }

  if (!/^[0-9]{3}-[0-9]{3}-[0-9]{3}$/.test(data.get('phone'))) {
    showError('phone', 'Phone must be xxx-xxx-xxx');
    valid = false;
  }

  if (data.get('message').trim().length < 10) {
    showError('message', 'Message must have at least 10 characters');
    valid = false;
  }

  if (!valid) return;

  alert('Form sent successfully!');
  form.reset();
});

export const clearErrorsIn = (container) => {
  container.querySelectorAll('.errors').forEach(e => e.textContent = '');
};

export const showErrorsIn = (errors, container) => {
  for (const field in errors) {
    const box = container.querySelector(`.errors[data-input="${field}"]`);
    if (box) {
      box.textContent = errors[field];
    }
  }
};
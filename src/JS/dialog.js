export const buildDialogContent = (todo) => {
  return `
    <p><strong>Id:</strong> ${todo.id}</p>
    <p><strong>Topic:</strong> ${todo.topic}</p>
    <p><strong>Description:</strong> ${todo.description || '-'}</p>
    <p><strong>Status:</strong> ${todo.status}</p>
    <p><strong>Created at:</strong> ${todo.createdAt.toLocaleString()}</p>
  `;
};

export const buildEditForm = (todo) => {
  return `
    <form id="editForm">
      <input type="text" name="topic" class="form__field" value="${todo.topic}">
      <div class="errors" data-input="topic"></div>
      <input type="text" name="description" class="form__field" value="${todo.description}">
      <div class="errors" data-input="description"></div>
      <button type="submit" class="formEdit__button">Send</button>
    </form>
  `;
};
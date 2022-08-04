const todoList = new LocalTodoList();

const toggleAddTodoDialog = function (e) {
  if (e.target === addTodoDialogCancel) {
    addTodoInput.value = '';
    addTodoButton.setAttribute('disabled', '');
    addTodoDialog.classList.add('hidden');
  } else {
    addTodoDialog.classList.remove('hidden');
  }
};

addTodoDialogToggle.addEventListener('click', toggleAddTodoDialog);
addTodoDialogCancel.addEventListener('click', toggleAddTodoDialog);

addTodoInput.addEventListener('input', e => {
  if (e.target.value === '') {
    addTodoButton.setAttribute('disabled', '');
  } else {
    addTodoButton.removeAttribute('disabled');
  }
});

addTodoButton.addEventListener('click', () => {
  todoList.addTodo(addTodoInput.value);
});

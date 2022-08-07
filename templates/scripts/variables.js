const API_URL = 'https://whatistheretodo.herokuapp.com/todos/';

const todoListContainer = document.querySelector('#app-container__todo-list');

const addTodoDialog = document.querySelector('#app-container__add-todo-dialog');
const addTodoInput = document.querySelector('#add-todo-dialog__input');
const addTodoDialogToggle = document.querySelector('#add-todo-dialog__toggle');
const addTodoDialogCancel = document.querySelector('#add-todo-dialog__cancel');
const addTodoButton = document.querySelector('#add-todo-button');

const generalProgressIndicator = document
  .querySelector('#general-progress__indicator')
  .querySelector('.progress-indicator');
const generalProgressValue = document.querySelector('#general-progress__value');

const todoList = new LocalTodoList();

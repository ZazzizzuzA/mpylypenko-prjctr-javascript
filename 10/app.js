"use strict";

/**
 * 1. Додавати задачі
 * 2. Видаляти окремі задачі
 * 3. Видаляти всі задачі
 * 4. Фільтрувати задачі
 * 5. Зберігати в локалСторедж
 * 
 */

const form = document.querySelector('.create-task-form');
const taskInput = document.querySelector('.task-input');
const filterInput = document.querySelector('.filter-input');
const clearTasksButton = document.querySelector('.clear-tasks');
const taskList = document.querySelector('.collection');

form.addEventListener('submit', addTask);
taskList.addEventListener('click', removeOrEditTask);
clearTasksButton.addEventListener('click', removeAllTasks);
filterInput.addEventListener('input', filterTasks)

function addTask(event) {
  event.preventDefault();

  const value = event.target.task.value;

  if (value.trim() === '') {
    return;
  }

  if (typeof value === 'string' && value.length > 50) {
    event.target.task.value = '';
    alert('Занадто довга назва. Оптимізуйте її.');
    return;
  }

  if (taskList.children.length > 15) {
    alert('Ваш список повний. Починайте виконувати задачі. Ви зможете!');
    return;
  }

  const li = document.createElement('li');
  const buttonDelete = document.createElement('button');
  const buttonEdit = document.createElement('i');
  buttonEdit.classList.add("fa");
  buttonEdit.classList.add("fa-pencil");
  li.innerHTML = value;
  buttonDelete.innerHTML = 'X';
  buttonDelete.classList.add('delete-btn');
  li.setAttribute('task-index', taskList.children.length);
  li.append(buttonEdit);
  li.append(buttonDelete);
  li.style.opacity = '0';
  li.style.height = '0px';
  taskList.append(li);
  setTimeout(() => {
    li.style.opacity = '1';
    li.style.height = '18px';
  }, 100)
  storeTaskInLocalStorage(value);
  clearInput(taskInput);
}

function storeTaskInLocalStorage(taskValue) {
  let tasks = [];

  if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.push(taskValue);

  localStorage.setItem('tasks', JSON.stringify(tasks))
}

function renderTasks() {
  taskList.innerHTML = '';
  let tasks = localStorage.getItem('tasks');

  if (tasks && tasks.length) {
    JSON.parse(tasks).forEach((el, i) => {
      const li = document.createElement('li');
      const buttonDelete = document.createElement('button');
      const buttonEdit = document.createElement('i');
      buttonEdit.classList.add("fa");
      buttonEdit.classList.add("fa-pencil");
      buttonDelete.innerHTML = 'X';
      buttonDelete.classList.add('delete-btn');
      li.setAttribute('task-index', i);
      li.innerHTML = el;
      li.append(buttonEdit);
      li.append(buttonDelete);
      li.style.opacity = '0';
      li.style.height = '0px';
      taskList.append(li);
      setTimeout(() => {
        li.style.opacity = '1';
        li.style.height = '18px';
      }, 100);
    });
  }
  filterInput.value = '';
}

function removeOrEditTask(event) {
  let target = event.target;
  removeTask(target);
  editTask(target);
}

function removeTask(target) {
  if (target.classList.contains('delete-btn')) {
    const taskIndex = +target.parentElement.getAttribute('task-index');
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    // const taskValue = event.target.previousSibling.textContent;
    // const filteredTasks = tasks.filter(task => {
    //   return task !== taskValue;
    // });
    tasks.splice(taskIndex, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
  }
}

function removeAllTasks() {
  localStorage.removeItem('tasks');
  Array.from(taskList.children).forEach(hideAndRemoveElements);
  function hideAndRemoveElements(el) {
    console.log(el)
    el.style.opacity = '0';
    el.style.height = '0px';
    el.addEventListener('transitionend', () => {
      el.remove();
    });
  }
  // renderTasks();
}

function clearInput(input) {
  input.value = '';
}

function filterTasks(event) {
  const inputValue = new RegExp(event.target.value, 'i');
  const liCollection = taskList.querySelectorAll('li');

  liCollection.forEach(li => {
    const liValue = li.firstChild.textContent;

    if (inputValue.test(liValue)) {
      li.style.display = 'block';
    } else {
      li.style.display = 'none';
    }
  })
}

function editTask(target) {
  if (target.nodeName === 'I' && target.classList.contains('fa')) {
    const indexTask = target.parentElement.getAttribute('task-index');
    const oldValue = target.parentElement.firstChild.textContent;
    let newValue = prompt('Можете переписати свою задачу', oldValue);
    const allTasks = JSON.parse(localStorage.getItem('tasks'));
    allTasks.splice(indexTask, 1, newValue);
    localStorage.setItem('tasks', JSON.stringify(allTasks));
    renderTasks();
  }
}

renderTasks();
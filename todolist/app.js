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
taskList.addEventListener('click', removeTask);
clearTasksButton.addEventListener('click', removeAllTasks);
filterInput.addEventListener('input', filterTasks)

function addTask(event) {
  event.preventDefault();

  const value = event.target.task.value;

  if (value.trim() === '') {
    return;
  }

  const li = document.createElement('li');
  const button = document.createElement('button');
  li.innerHTML = value;
  button.innerHTML = 'X';
  button.classList.add('delete-btn');

  li.append(button);
  taskList.append(li);
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
    JSON.parse(tasks).forEach(el => {
      const li = document.createElement('li');
      const button = document.createElement('button');
      button.innerHTML = 'X';
      button.classList.add('delete-btn');
      li.innerHTML = el;
      li.append(button);
      taskList.append(li);
    });
  }
}

function removeTask(event) {
  if (event.target.classList.contains('delete-btn')) {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    const taskValue = event.target.previousSibling.textContent;
    const filteredTasks = tasks.filter(task => {
      return task !== taskValue;
    });
    localStorage.setItem('tasks', JSON.stringify(filteredTasks));
    renderTasks();
  }
}

function removeAllTasks() {
  localStorage.removeItem('tasks');
  renderTasks();
}

function clearInput(input) {
  input.value = '';
}

function filterTasks(event) {
  const inputValue = event.target.value;
  const liCollection = taskList.querySelectorAll('li');

  liCollection.forEach(li => {
    const liValue = li.firstChild.textContent;

    if (liValue.includes(inputValue)) {
      li.style.display = 'block';
    } else {
      li.style.display = 'none';
    }
  })
  
}

renderTasks();
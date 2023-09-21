const taskMenuForm = document.querySelector('#form');

const taskInput = document.querySelector('#inputTask');

const taskList = document.querySelector('.list-of-tasks');

const emptyList = document.querySelector('#emptyList');

let tasks = [];

if (localStorage.getItem('tasks')) {
   tasks = JSON.parse(localStorage.getItem('tasks'));
   tasks.forEach(function (task) {
      renderTask(task);
   });
}

addEmptyListHtml();

taskMenuForm.addEventListener('submit', addTask);
taskList.addEventListener('click', deleteTask);
taskList.addEventListener('click', doneTask);

function addTask(event) {
   event.preventDefault();

   const taskText = taskInput.value;

   const newTask = {
      id: Date.now(),
      text: taskText,
      done: false,
   };

   tasks.push(newTask);
   saveData();

   if (taskText === '') return;
   renderTask(newTask);

   taskInput.value = '';
   taskInput.focus();
   addEmptyListHtml();
}

function deleteTask(event) {
   if (event.target.dataset.action !== 'delete') return;

   const parentNode = event.target.closest('li');

   const id = Number(parentNode.id);

   const index = tasks.findIndex((task) => task.id === id);

   tasks.splice(index, 1);

   parentNode.remove();
   addEmptyListHtml();
   saveData();
}

function doneTask(event) {
   if (event.target.dataset.action !== 'done') return;

   const parentNode = event.target.closest('li');

   const id = Number(parentNode.id);

   const task = tasks.find((task) => task.id === id);
   task.done = !task.done;
   saveData();
   const taskTitle = parentNode.querySelector('#taskListId');

   taskTitle.classList.toggle('task-title-done');
   addEmptyListHtml();
}

function addEmptyListHtml() {
   if (tasks.length === 0) {
      const emptyListHtml = `<li id="emptyList">Список дел пуст</li>`;

      taskList.insertAdjacentHTML('afterbegin', emptyListHtml);
   }
   if (tasks.length > 0) {
      const emptyListElement = document.querySelector('#emptyList');
      emptyListElement ? emptyListElement.remove() : null;
   }
}

function saveData() {
   localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTask(task) {
   const cssClass = task.done ? 'task-title task-title-done' : 'task-title';
   const taskHTML = `
    <li id="${task.id}">
	<span class = "${cssClass}"  id="taskListId">${task.text}</span>
	<button data-action = 'done' class = "btn-action" ><img id = 'imageId_list' src="#" alt="Выполнено" /></button
	><button  data-action = 'delete' class = "btn-action"><img id = 'imageId_list'src="#" alt="Удалить" /></button>
  </li>`;

   taskList.insertAdjacentHTML('beforeend', taskHTML);
}

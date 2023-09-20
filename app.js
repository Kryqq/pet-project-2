const taskMenuForm = document.querySelector('#form');

const taskInput = document.querySelector('#inputTask');

const taskList = document.querySelector('.list-of-tasks');

const emptyList = document.querySelector('#emptyList');

taskMenuForm.addEventListener('submit', addTask);
taskList.addEventListener('click', deleteTask);
taskList.addEventListener('click', doneTask);

function addTask(event) {
   event.preventDefault();

   const taskText = taskInput.value;

   const taskHTML = `
  <li id="taskList">
   <span id="taskListId">${taskText}</span>
   <button data-action = 'done' class = "btn-action" ><img id = 'imageId_list' src="#" alt="Выполнено" /></button
   ><button  data-action = 'delete' class = "btn-action"><img id = 'imageId_list'src="#" alt="Удалить" /></button>
</li>`;

   taskList.insertAdjacentHTML('beforeend', taskHTML);

   taskInput.value = '';
   taskInput.focus();

   if (taskList.children.length > 1) {
      emptyList.classList.add('none');
   }
}

function deleteTask(event) {
   if (event.target.dataset.action === 'delete') {
      const parentNode = event.target.closest('li');
      parentNode.remove();
   }
   if (taskList.children.length === 1) {
      emptyList.classList.remove('none');
   }
}

function doneTask(event) {
   if (event.target.dataset.action === 'done') {
      const parentNode = event.target.closest('li');
      const taskTitle = parentNode.querySelector('#taskListId');
      taskTitle.classList.toggle('task-title-done');
      console.log(taskTitle);
   }
}

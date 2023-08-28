'use strict';

const input = document.getElementById('input');
const addBtn = document.getElementById('add');
const lottie = document.getElementById('lottie');
const pendingNo = document.getElementById('pending-tasks');
const clearBtn = document.getElementById('clear');
const todoList = document.getElementById('todo-list');
const form = document.getElementById('form');
const saveBtn = document.getElementById('saveBtn');
const closeBtn = document.getElementById('closeBtn');
const overlay = document.getElementById('overlay');
const model = document.getElementById('model');
const closeModel = document.getElementById('closeModel');
const editedText = document.getElementById('editedText');

let Tasks = [];
let remainingTaskCount = 0;

// this will check checkbox is checked or not
function checkTask(id) {
  const task = Tasks.find(t => t.id === id);
  task.isCompleted = !task.isCompleted;
  if (task.isCompleted) remainingTaskCount--;
  else remainingTaskCount++;
  pendingNo.textContent = remainingTaskCount;

  Tasks = Tasks.map(t => {
    if (t.id === id) {
      return task;
    } else {
      return t;
    }
  });
}

//this will take i/p

const addTodo = newTask => {
  remainingTaskCount++;
  pendingNo.textContent = remainingTaskCount;
  const div = document.createElement('div');
  div.className = 'border-b border-slate-600 w-full flex justify-between mb-4';
  div.id = newTask.id;
  todoList.appendChild(div);

  const data = document.createElement('div');
  data.className = 'flex';
  div.appendChild(data);

  const checkBox = document.createElement('input');
  checkBox.className = 'mr-4';
  checkBox.type = 'checkbox';
  checkBox.addEventListener('change', () => {
    const taskText = document.getElementById(newTask.id).querySelector('span');
    if (checkBox.checked) {
      checkTask(newTask.id);
      taskText.className = 'line-through';
      return;
    }
    taskText.classList.remove('line-through');
  });
  data.appendChild(checkBox);

  const inputSpan = document.createElement('span');
  inputSpan.textContent = input.value;
  data.appendChild(inputSpan);

  const editDetails = document.createElement('div');
  editDetails.className = 'flex';
  div.appendChild(editDetails);

  const editImg = document.createElement('img');
  editImg.className = 'w-5 mr-3 cursor-pointer';
  editDetails.appendChild(editImg);
  editImg.src = 'edit-regular.svg';

  const trashImg = document.createElement('img');
  trashImg.className = 'w-4 cursor-pointer';
  editDetails.appendChild(trashImg);
  trashImg.src = 'trash-solid.svg';

  //   //this will work edit task funcition

  editImg.addEventListener('click', () => {
    overlay.style.display = 'flex';
    const index = Tasks.find(t => t.id === newTask.id);
    editedText.value = index.input;
  });

  //this will work  save btn in pop-up

  saveBtn.addEventListener('click', () => {
    const index = Tasks.find(t => t.id === newTask.id);
    index.input = editedText.value;
    inputSpan.textContent = editedText.value;
    overlay.style.display = 'none';
  });

  //this will work to close the pop-up

  closeBtn.addEventListener('click', () => {
    overlay.style.display = 'none';
  });

  // this will work delete the task
  trashImg.addEventListener('click', () => {
    const index = Tasks.find(t => t.id === newTask.id);
    if (Tasks.length === 0) {
      lottie.style.display = 'block';
    } else {
      Tasks.splice(index, 1);
      div.remove();
      remainingTaskCount--;
      pendingNo.textContent = remainingTaskCount;
    }
  });
};

// this will add the task
const onSubmit = () => {
  const trim = input.value.trim();

  if (trim !== '') {
    const newTask = {
      id: crypto.randomUUID(),
      input: trim,
      isCompleted: false,
    };
    Tasks.push(newTask);
    addTodo(newTask);
    input.value = '';
  } else {
    let message = 'Enter the input';
    alert(message);
  }

  if (Tasks.length != 0) {
    lottie.style.display = 'none';
  }
  // remainTask();
};

addBtn.addEventListener('click', e => {
  e.preventDefault();
  onSubmit();
});
// it will also enter in the input when u click the enter key
form.onSubmit = e => {
  e.preventDefault();
  onSubmit();
};

//this btn will clear all the task

clearBtn.addEventListener('click', () => {
  Tasks.splice(0);
  console.log(Tasks);
  todoList.replaceChildren();
  remainingTaskCount = 0;
  pendingNo.textContent = remainingTaskCount;
  // remainTask();

  if (Tasks.length == 0) {
    lottie.style.display = 'block';
  }
});

// delete btn

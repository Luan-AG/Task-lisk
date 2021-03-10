const form = document.querySelector('form');
const inputTask = document.querySelector('.input-task');
const ul = document.querySelector('.myTasks');
const clearTasks = document.querySelector('.btn-clearall');
const inputFilter = document.querySelector('.input-filter');

document.addEventListener('DOMContentLoaded', getTaskLS);
form.addEventListener('submit', addTask);
ul.addEventListener('click', removeTask);
ul.addEventListener('click', check);
clearTasks.addEventListener('click', clearAll);
inputFilter.addEventListener('keyup', filter);




function addTask(e) {
    if (inputTask.value === '') {
        alert('Add a task!');
    } else {
        const inputText = document.createTextNode(inputTask.value);
        const li = document.createElement('li');
        li.className = 'task-item';
        li.innerHTML = '<a href="#" class="del-container"><img class="bin" src="images/bin.svg" alt="bin"></a><a href="#" class="check-container"><img class="check" src="images/check.svg" alt="check"></a>'; 
        li.appendChild(inputText);
        ul.appendChild(li);
        storeTaskLS(inputTask.value);
        inputTask.value = '';
    }
    e.preventDefault();
}

function removeTask(e) {
    if(e.target.parentElement.classList.contains("del-container")) {
        e.target.parentElement.parentElement.remove();
        clearTaskLS(e.target.parentElement.parentElement);
    } 
}

function clearAll() {
    if(confirm ('Are you sure?')) {
        while(ul.firstChild) {
            ul.removeChild(ul.firstChild);
            clearAllLS();
        }    
    }
}

function filter(e) {
    const valueLower = e.target.value.toLowerCase();
    const lis = document.querySelectorAll('.task-item');
    lis.forEach(function(li){
        const task = li.textContent;
        if(task.toLowerCase().indexOf(valueLower) != -1) {
            li.style.display = 'block';
        } else {
            li.style.display = 'none';
        }
    })
}

function check(e) {
    console.log(e.target.parentElement.classList.contains("check-container"));
    if(e.target.parentElement.classList.contains("check-container")) {
        const li = e.target.parentElement.parentElement;
        if(li.style.textDecoration != 'line-through'){
            li.style.color = 'rgba(0, 0, 0, 0.5)';
            li.style.textDecoration = 'line-through';
            li.style.border = '2px solid green';
            li.querySelector('.check').src = 'images/undo-solid.svg';
        } else {
            li.style.color = 'black';
            li.style.textDecoration = '';
            li.style.border = '1px solid #979595';
            li.querySelector('.check').src = 'images/check.svg';
        }
    } 
}

function storeTaskLS(par) {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [] ;
    }   else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(par);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTaskLS(par){
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [] ;
    }   else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(item){
        const inputText = document.createTextNode(item);
        const li = document.createElement('li');
        li.className = 'task-item';
        li.innerHTML = '<a href="#" class="del-container"><img class="bin" src="images/bin.svg" alt="bin"></a><a href="#" class="check-container"><img class="check" src="images/check.svg" alt="check"></a>'; 
        li.appendChild(inputText);
        ul.appendChild(li);
    })
}

function clearTaskLS(par){
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [] ;
    }   else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index){
        if(par.textContent === task){
          tasks.splice(index, 1);
        }
      });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function clearAllLS(){
    localStorage.clear();
}

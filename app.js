// DOM Elements
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

// Load tasks from local storage
document.addEventListener('DOMContentLoaded', loadTasks);

// Add new task
addTaskBtn.addEventListener('click', () => {
    const taskTitle = taskInput.value.trim();
    if (taskTitle === '') return alert('Please enter a task.');

    const task = { title: taskTitle, completed: false };
    addTask(task);
    saveTaskToLocalStorage(task);
    taskInput.value = '';
});

// Add task to the DOM
function addTask(task) {
    const taskItem = document.createElement('li');
    taskItem.className = `list-group-item d-flex align-items-center ${task.completed ? 'completed' : ''}`;
    taskItem.innerHTML = `
        <span class="task-title">${task.title}</span>
        <div>
            <button class="btn btn-sm mark-complete-btn me-2">✔</button>
            <button class="btn btn-sm edit-btn me-2">✏️</button>
            <button class="btn btn-sm delete-btn">🗑️</button>
        </div>
    `;
    taskList.appendChild(taskItem);

    // Add event listeners
    taskItem.querySelector('.mark-complete-btn').addEventListener('click', () => toggleComplete(taskItem, task));
    taskItem.querySelector('.edit-btn').addEventListener('click', () => editTask(taskItem, task));
    taskItem.querySelector('.delete-btn').addEventListener('click', () => deleteTask(taskItem, task));
}

// Toggle task completion
function toggleComplete(taskItem, task) {
    task.completed = !task.completed;
    taskItem.classList.toggle('completed');
    updateLocalStorage();
}

// Edit task
function editTask(taskItem, task) {
    const newTitle = prompt('Edit Task:', task.title);
    if (newTitle !== null && newTitle.trim() !== '') {
        task.title = newTitle.trim();
        taskItem.querySelector('.task-title').textContent = newTitle;
        updateLocalStorage();
    }
}

// Delete task
function deleteTask(taskItem, task) {
    taskItem.remove();
    removeTaskFromLocalStorage(task);
}

// Load tasks from local storage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(addTask);
}

// Save a new task to local storage
function saveTaskToLocalStorage(task) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Update tasks in local storage
function updateLocalStorage() {
    const tasks = Array.from(taskList.children).map(taskItem => ({
        title: taskItem.querySelector('.task-title').textContent,
        completed: taskItem.classList.contains('completed'),
    }));
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove a task from local storage
function removeTaskFromLocalStorage(task) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(t => t.title !== task.title);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

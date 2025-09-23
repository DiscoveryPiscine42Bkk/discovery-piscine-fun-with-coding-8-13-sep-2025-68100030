// Load the tasks from the cookie if available
window.onload = function() {
  loadTasks();
};

// Function to add a new task
document.getElementById("newTaskButton").addEventListener("click", function() {
  const task = prompt("Enter a new task:");

  if (task && task.trim() !== "") {
    addTask(task.trim());
  }
});

// Function to add a task to the list
function addTask(task) {
  // Create a new task item element
  const taskItem = document.createElement("div");
  taskItem.classList.add("task-item");

  // Add the task text to the div
  taskItem.innerHTML = `${task} <button onclick="removeTask(this)">Remove</button>`;

  // Add the task item to the list
  document.getElementById("ft_list").prepend(taskItem);

  // Save the task to the cookie
  saveTasks();
}

// Function to remove a task from the list
function removeTask(button) {
  const taskItem = button.parentElement;
  taskItem.remove();

  // Save the updated task list
  saveTasks();
}

// Function to save tasks to a cookie
function saveTasks() {
  const tasks = [];
  const taskItems = document.querySelectorAll(".task-item");

  taskItems.forEach(item => {
    tasks.push(item.firstChild.textContent.trim());
  });

  // Save tasks as a cookie
  document.cookie = "tasks=" + JSON.stringify(tasks) + "; path=/; max-age=3600";
}

// Function to load tasks from a cookie
function loadTasks() {
  const cookie = document.cookie.split("; ").find(row => row.startsWith("tasks="));
  if (cookie) {
    const tasks = JSON.parse(cookie.split("=")[1]);

    tasks.forEach(task => {
      addTask(task);
    });
  }
}

const API_URL = "https://jsonplaceholder.typicode.com/todos";
const tasksList = document.getElementById("tasks");
const errorMessage = document.getElementById("error");

window.onload = function() {
  fetch(API_URL)
    .then(response => response.json())
    .then(todos => {
      todos.forEach(todo => {
        const task = document.createElement("li");
        task.innerHTML = todo.title;
        task.setAttribute("id", todo.id);
        task.innerHTML += "  <button onclick='removeTask(" + todo.id + ")'>Radera</button>";
        tasksList.appendChild(task);
      });
    });
};

function addTask() {
  event.preventDefault();
  const taskInput = document.getElementById("task");
  const task = taskInput.value.trim();
  if (!task) {
    errorMessage.innerHTML = "Ange en giltig uppgift.";
    errorMessage.style.display = "block";
    return;
  }
  errorMessage.style.display = "none";

  const data = { title: task, completed: false };
  fetch(API_URL, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(response => response.json())
    .then(todo => {
      const newTask = document.createElement("li");
      newTask.innerHTML = todo.title;
      newTask.setAttribute("id", todo.id);
      newTask.innerHTML += "  <button onclick='removeTask(" + todo.id + ")'>Radera</button>";
      tasksList.appendChild(newTask);
      taskInput.value = "";
    });
}

function removeTask(id) {
  const task = document.getElementById(id);
  task.remove();

  fetch(API_URL + "/" + id, {
    method: "DELETE"
  });
}

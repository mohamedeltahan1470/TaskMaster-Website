document.getElementById("add-task-button").addEventListener("click", () => {
  const taskInput = document.getElementById("task-input");
  const taskText = taskInput.value.trim();
  if (taskText) {
    addTask(taskText);
    taskInput.value = "";
    showAlert("Task added successfully!", "success");
    saveTasks();
  } else {
    showAlert("Task cannot be empty.", "error");
  }
});

document.getElementById("task-input").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const taskText = e.target.value.trim();
    if (taskText) {
      addTask(taskText);
      e.target.value = "";
      showAlert("Task added successfully!", "success");
      saveTasks();
    } else {
      showAlert("Task cannot be empty.", "error");
    }
  }
});

function addTask(taskText) {
  const taskList = document.getElementById("task-list");
  const taskItem = document.createElement("li");

  const taskTextSpan = document.createElement("span");
  taskTextSpan.textContent = taskText;

  const buttonContainer = document.createElement("div");
  buttonContainer.className = "button-container";

  const completeButton = document.createElement("button");
  completeButton.textContent = "Complete";
  completeButton.className = "complete";
  completeButton.addEventListener("click", () => {
    taskTextSpan.classList.toggle("completed");
    showAlert("Task marked as completed!", "success");
    saveTasks();
  });

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.className = "delete";
  deleteButton.addEventListener("click", () => {
    taskItem.remove();
    showAlert("Task deleted successfully!", "success");
    saveTasks();
  });

  buttonContainer.appendChild(completeButton);
  buttonContainer.appendChild(deleteButton);

  taskItem.appendChild(taskTextSpan);
  taskItem.appendChild(buttonContainer);
  taskList.appendChild(taskItem);
}

function showAlert(message, type) {
  const alertBox = document.createElement("div");
  alertBox.className = `alert ${type}`;
  alertBox.textContent = message;
  document.body.appendChild(alertBox);
  setTimeout(() => alertBox.remove(), 3000);
}

function saveTasks() {
  const tasks = Array.from(document.getElementById("task-list").children).map(
    (task) => {
      return {
        text: task.querySelector("span").textContent,
        completed: task.querySelector("span").classList.contains("completed"),
      };
    }
  );
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => {
    addTask(task.text);
    if (task.completed) {
      const lastTask = document.getElementById("task-list").lastChild;
      lastTask.querySelector("span").classList.add("completed");
    }
  });
}

loadTasks();

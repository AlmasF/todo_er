import { List } from "./List.js";
import { setupTimeOfToday } from "./setupTimeOfToday.js";

const form = document.getElementById("add_task_form");
const input = document.getElementById("add_task_text_field");
const taskRows = document.querySelectorAll(".task_element");
const todoList = new List("tasks_list");

function beginProgram() {
  todoList.syncLocalStorageToList();
  todoList.synchronizeListToContainer();
  setupTimeOfToday();
  setupAddTaskEvent();
  setupDeleteTaskEvents();
}

function setupAddTaskEvent() {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    todoList.addTask(data.task_text);
    todoList.synchronizeListToContainer();
    todoList.synchronizeListToLocalStorage();
    input.value = "";
  });
}

function setupDeleteTaskEvents() {
  const taskRows = document.querySelectorAll(".task_element");
  taskRows.forEach((e) => {
    const span = e.querySelector("span.delete");
    const taskId = e.getAttribute("id")?.substring(5);

    span.addEventListener("click", () => {
      todoList.deleteTaskById(taskId);
      todoList.synchronizeListToLocalStorage();
      todoList.synchronizeListToContainer();
      setupDeleteTaskEvents();
    });
  });
}

beginProgram();

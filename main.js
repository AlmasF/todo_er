import { List } from "./List.js";
import { setupTimeOfToday } from "./setupTimeOfToday.js";

const form = document.getElementById("add_task_form");
const input = document.getElementById("add_task_text_field");
const taskRows = document.querySelectorAll(".task_element");
const container = document.getElementById("tasks_list");
const todoList = new List("tasks_list");
const themeToggle = document.getElementById("theme-toggle");

function beginProgram() {
  todoList.syncLocalStorageToList();
  todoList.synchronizeListToContainer();
  setupTimeOfToday();
  setupAddTaskEvent();
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

container.addEventListener("click", (event) => {
  if (
    event.target.classList.contains("input_class") ||
    event.target.classList.contains("label_class") ||
    event.target.classList.contains("span_class")
  ) {
    const underscoreIndex = event.target.getAttribute("id")?.indexOf("_");
    const taskId = event.target
      .getAttribute("id")
      ?.substring(underscoreIndex + 1);
    todoList.toggleTask(taskId);
    todoList.synchronizeListToLocalStorage();
    todoList.synchronizeListToContainer();
  } else if (event.target.classList.contains("delete")) {
    const taskId = event.target.getAttribute("id")?.substring(5);
    todoList.deleteTaskById(taskId);
    todoList.synchronizeListToLocalStorage();
    todoList.synchronizeListToContainer();
  }
});

themeToggle.addEventListener("click", () => {
  const html = document.getElementsByTagName("html")?.[0];

  console.log(html.getAttribute("data-theme"));
  if (html.getAttribute("data-theme") === "dark") {
    html.setAttribute("data-theme", "light");
  } else {
    html.setAttribute("data-theme", "dark");
  }
});

beginProgram();

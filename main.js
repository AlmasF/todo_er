import { List } from "./List.js";
import { setupTimeOfToday } from "./setupTimeOfToday.js";

const form = document.getElementById("add_task_form");
const input = document.getElementById("add_task_text_field");
const container = document.getElementById("tasks_list");
const todoList = new List("tasks_list");
const themeToggle = document.getElementById("theme-toggle");
let dragItem = null;
let dragItemId = null;
let dropItemId = null;

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

container.addEventListener("dragstart", (event) => {
  event.dataTransfer.setDragImage(new Image(), 0, 0);
  const underscoreIndex = event.target.getAttribute("id")?.indexOf("_");
  const taskId = event.target
    .getAttribute("id")
    ?.substring(underscoreIndex + 1);
  const foundItem = document.getElementById("todo_" + taskId);
  foundItem.style.position = "absolute";
  dragItem = foundItem;
  dragItemId = taskId;
});

function followCursor() {
  const { clientX, clientY } = event;

  dragItem.animate(
    {
      left: `${clientX}px`,
      top: `${clientY}px`,
    },
    { duration: 1000, fill: "forwards" },
  );
}

document.addEventListener("pointermove", followCursor);
container.addEventListener("dragover", (event) => {
  event.preventDefault();
});

container.addEventListener("dragenter", (e) => {
  e.preventDefault();
});

container.addEventListener("drop", (event) => {
  event.preventDefault();
  const underscoreIndex = event.originalTarget.getAttribute("id")?.indexOf("_");
  const taskId = event.originalTarget
    .getAttribute("id")
    ?.substring(underscoreIndex + 1);
  console.log("drop: ", taskId);
  dropItemId = taskId;

  positionDraggedItem();
});

function positionDraggedItem() {
  todoList.setTaskAftert(dragItemId, dropItemId);
  todoList.synchronizeListToContainer();
  todoList.synchronizeListToLocalStorage();
}

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

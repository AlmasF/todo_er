import { Sortable } from "@shopify/draggable";
import { HTMLContainer } from "./entities/HTMLContainer.js";
import { List } from "./entities/List.js";
import { LocalStorageInterface } from "./entities/LocalStorageInterface.js";
import { setupTimeOfToday } from "./utils/setupTimeOfToday.js";
import { startTimer } from "./utils/startTimer.js";

const listEntity = new List();
const listStorage = new LocalStorageInterface("list");
const listContainer = new HTMLContainer("LIST_CONTAINER_ID");

const addTaskForm = document.getElementById("add_task_form_id");
const themeToggle = document.getElementById("theme_toggler_id");
const inputTextField = document.getElementById("add_task_text_field_id");

listContainer.container.addEventListener("click", (event) => {
  const taskRow = event.target.closest(".CLICK_EVENT_CLASS_FOR_TASK_ELEMENT");
  const taskId = taskRow?.dataset.id;
  if (
    event.target.classList.contains("input_class") ||
    event.target.classList.contains("label_class") ||
    event.target.classList.contains("span_class")
  ) {
    listEntity.toggleTask(taskId);
    listStorage.writeToLocalStorage(listEntity.readValues());
    listContainer.drawListOfTasks(listEntity.readValues());
  } else if (event.target.classList.contains("delete")) {
    listEntity.deleteTaskById(taskId);
    listStorage.writeToLocalStorage(listEntity.readValues());
    listContainer.drawListOfTasks(listEntity.readValues());
  }
});

addTaskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(addTaskForm);
  const data = Object.fromEntries(formData.entries());

  listEntity.addTask(data.task_text, data.priority);
  listStorage.writeToLocalStorage(listEntity.readValues());
  listContainer.drawListOfTasks(listEntity.readValues());
  inputTextField.value = "";
});

themeToggle.addEventListener("click", () => {
  const html = document.getElementsByTagName("html")?.[0];

  if (html.getAttribute("data-theme") === "dark") {
    html.setAttribute("data-theme", "light");
  } else {
    html.setAttribute("data-theme", "dark");
  }
});

// Важно возвращать пустой массив иначе, потому что можно просто пропустить этот момент и все сломается
// список значений снова будет пустым
listEntity.setValues(listStorage.readFromLocalStorage() || []);
listContainer.drawListOfTasks(listEntity.readValues());
setupTimeOfToday();
startTimer();
const containers = document.querySelectorAll("#LIST_CONTAINER_ID");
const sortable = new Sortable(containers, {
  draggable: ".SHOPIFY_task_element",
  handle: ".SHOPIFY_drag_indicator",
  mirror: {
    constrainDimensions: true,
  },
});

sortable.on("sortable:stop", (event) => {
  listEntity.moveArrayItemInPlace(event?.oldIndex, event?.newIndex);
  listStorage.writeToLocalStorage(listEntity.readValues());
});

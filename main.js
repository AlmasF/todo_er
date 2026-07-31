import { addTaskToList } from "./script.js";

const form = document.getElementById("add_task_form");
const input = document.getElementById("add_task_text_field");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  addTaskToList(data.task_text);
});

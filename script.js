function setupTimeOfToday() {
  const timeTag = document.getElementsByTagName("time")?.[0];
  const now = new Date();
  const format = now.toLocaleDateString("ru-RU", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  timeTag.innerText = format;
  timeTag.dateTime = now.toISOString();
}

setupTimeOfToday();

class List {
  constructor(listId) {
    this.list = document.getElementById(listId);
  }

  addTask(text) {
    const shortId = Math.random().toString(36).substring(2, 11);
    this.list.innerHTML += `
        <label for=${shortId}>
          <input type="checkbox" id="${shortId}" />
          <span> ${text} </span>
        </label>
        `;
  }
}

const todoList = new List("tasks_list");
export function addTaskToList(text) {
  todoList.addTask(text);
}

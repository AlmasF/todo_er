export class List {
  localStorageKey = "todo_list";
  list = [];
  listContainerHTML = null;

  constructor(listContainerId) {
    this.listContainerHTML = document.getElementById(listContainerId);
  }

  synchronizeListToContainer() {
    if (this.list == null) return;

    this.listContainerHTML.innerHTML = "";

    this.list.forEach((e) => {
      this.listContainerHTML.innerHTML += `
        <div class="grid task_element" id="todo_${e.id}">
          <label for=${e.id}>
            <input type="checkbox" id="${e.id}" value="${e.done ? true : false}" />
            <span> ${e.text} </span>
          </label>
          <span class="material-symbols-outlined delete"> delete </span>
        </div>
        `;
    });
  }

  addTask(text) {
    const newTask = {
      id: Math.random().toString().slice(2, 10),
      text: text,
      done: false,
    };
    this.list.push(newTask);
  }

  deleteTaskById(id) {
    const foundIndex = this.list.findIndex((e) => e.id === id);
    this.list.splice(foundIndex, 1);
  }

  markTaskAsDone(id) {
    const foundTask = this.list.find((e) => e.id === id);
    foundTask.done = true;
  }

  markTaskAsNotDone(id) {
    const foundTask = this.list.find((e) => e.id === id);
    foundTask.done = false;
  }

  synchronizeListToLocalStorage() {
    try {
      const stringified = JSON.stringify(this.list);
      localStorage.setItem(this.localStorageKey, stringified);
    } catch (err) {
      this.list = [];
      localStorage.setItem(this.localStorageKey, "[]");
      console.error(err);
    }
  }

  syncLocalStorageToList() {
    try {
      const todoList = localStorage.getItem(this.localStorageKey);
      console.log(todoList);
      this.list = JSON.parse(todoList) || [];
    } catch (err) {
      this.list = [];
      localStorage.setItem(this.localStorageKey, "[]");
      console.error(err);
    }
  }
}

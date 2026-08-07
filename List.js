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
        <div class="task_element flex-center-between" id="todo_${e.id}" draggable="true">
          <label for=${e.id} class="label_class" id="label_${e.id}">
            <input type="checkbox" class="input_class" id="input_${e.id}" value="${e.done ? true : false}" ${e.done ? "checked" : ""} />
            <span class="span_class" id="span_${e.id}"> ${e.text} </span>
          </label>
          <span class="material-symbols-outlined delete cursor-pointer"  id="span_${e.id}" > delete </span>
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
    if (foundIndex === -1) {
      return;
    }
    this.list.splice(foundIndex, 1);
  }

  toggleTask(id) {
    const foundTask = this.list.find((e) => e.id === id);
    if (!foundTask) return;
    if (foundTask.done === true) {
      foundTask.done = false;
    } else if (foundTask.done === false) {
      foundTask.done = true;
    }
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
      this.list = JSON.parse(todoList) || [];
    } catch (err) {
      this.list = [];
      localStorage.setItem(this.localStorageKey, "[]");
      console.error(err);
    }
  }

  setTaskAftert(dragTaskId, dropTaskId) {
    const dragTask = { ...this.list.find((e) => e.id === dragTaskId) };
    const dragTaskIndex = this.list.findIndex((e) => e.id === dragTaskId);
    const dropTaskIndex = this.list.findIndex((e) => e.id === dropTaskId);

    this.list.splice(dragTaskIndex, 1);
    this.list.splice(dropTaskIndex + 1, 0, { ...dragTask });
  }
}

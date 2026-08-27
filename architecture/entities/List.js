export class List {
  #values;

  constructor() {
    this.#values = [];
  }

  /**
   * Добавление и создание новой задачи в список
   * @param {string} text Текст задачи
   * @param {'high' | 'medium' | 'low'} priority Приорите для выполнения
   */
  addTask(text, priority) {
    const lastIndex = this.#values.length;
    const newTask = {
      id: Math.random().toString().slice(2, 10),
      text: text,
      done: false,
      priority: priority,
      index: lastIndex,
    };
    this.#values.push(newTask);
  }

  deleteTaskById(id) {
    const foundIndex = this.#values.findIndex((e) => e.id === id);
    if (foundIndex === -1) {
      return;
    }
    this.#values.splice(foundIndex, 1);
  }

  toggleTask(id) {
    const foundTask = this.#values.find((e) => e.id === id);
    if (!foundTask) return;
    if (foundTask.done === true) {
      foundTask.done = false;
    } else if (foundTask.done === false) {
      foundTask.done = true;
    }
  }

  readValues() {
    return this.#values;
  }

  setValues(value) {
    this.#values = value;
  }

  moveArrayItemInPlace(oldIndex, newIndex) {
    const arr = this.#values;
    if (newIndex >= arr.length) {
      let k = newIndex - arr.length + 1;
      while (k--) {
        arr.push(undefined);
      }
    }
    arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0]);

    console.log(arr);
  }
}

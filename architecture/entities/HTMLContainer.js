export class HTMLContainer {
  /**
   * Конструктор для контейнера
   * @param {number} containerId Идентификатор контейнера для которого создается объект
   */
  constructor(containerId) {
    this.container = document.getElementById(containerId);
  }

  /**
   * Отрисовка списка
   * @param {List} list
   */
  drawListOfTasks(list) {
    this.container.innerHTML = "";

    list?.forEach((e) => {
      this.container.innerHTML += `
        <div class="task_element flex-center-between" id="todo_${e.id}">
          <label for=${e.id} class="label_class" id="label_${e.id}">
            <input type="checkbox" class="input_class" id="input_${e.id}" value="${e.done ? true : false}" ${e.done ? "checked" : ""} />
            <span class="span_class" id="span_${e.id}"> ${e.text} </span>
          </label>
          <span class="material-symbols-outlined delete cursor-pointer"  id="span_${e.id}" > delete </span>
        </div>
        `;
    });
  }
}

export class HTMLContainer {
  /**
   * Конструктор для контейнера
   * @param {number} containerId Идентификатор контейнера для которого создается объект
   */
  constructor(containerId) {
    this.container = document.getElementById(containerId);
  }

  #map = {
    high: {
      backgroundClass: "pico-background-red-500",
      label: "Срочно",
    },
    medium: {
      backgroundClass: "pico-background-yellow-500",
      label: "Несрочно",
    },
    low: {
      backgroundClass: "pico-background-green-500",
      label: "Можно отложить",
    },
  };

  /**
   * Отрисовка списка
   * @param {List} list
   */
  drawListOfTasks(list) {
    this.container.innerHTML = "";

    list?.forEach((e) => {
      // 1. Создать временный элемент, чтобы почистить XSS
      const tempDiv = document.createElement("div");
      tempDiv.innerText = e.text;
      const safeText = tempDiv.innerHTML; // Модифицирование < в &lt;, > в &gt;, и т.п.

      // 2. Безопасная инъекция HTML
      this.container.insertAdjacentHTML(
        "beforeend",
        `
          <div class="task_element flex-center-start" data-id="${e.id}">
            <label for="input_${e.id}" class="label_class">
              <input type="checkbox" class="input_class" id="input_${e.id}" value="${e.done}" ${e.done ? "checked" : ""} />
              <span class="span_class">${safeText}</span>
            </label>
            <mark class="priority_mark ${this.#map[e.priority]?.backgroundClass || ""}">${this.#map[e.priority]?.label || ""}</mark>
            <span class="material-symbols-outlined drag_indicator">drag_indicator</span>
            <span class="material-symbols-outlined delete cursor-pointer">delete</span>
          </div>
        `,
      );
    });
  }
}

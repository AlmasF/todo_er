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
          <div class="SHOPIFY_task_element CLICK_EVENT_CLASS_FOR_TASK_ELEMENT flex items-center justify-start bg-blue-300 rounded-2xl p-3 text-2xl" data-id="${e.id}">
            <label for="input_${e.id}" class="label_class">
              <input type="checkbox" class="input_class" id="input_${e.id}" value="${e.done}" ${e.done ? "checked" : ""} />
              <span class="text-black">${safeText}</span>
            </label>
            <mark class="ml-auto mr-4 ${this.#map[e.priority]?.backgroundClass || ""}">${this.#map[e.priority]?.label || ""}</mark>
            <span class="material-symbols-outlined mr-4 md:mr-8 cursor-grab text-black SHOPIFY_drag_indicator">drag_indicator</span>
            <span class="material-symbols-outlined text-black cursor-pointer">delete</span>
          </div>
        `,
      );
    });
  }
}

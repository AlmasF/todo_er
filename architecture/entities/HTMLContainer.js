import {
  TASK_ELEMENT_DELETE_CLASS,
  TASK_ELEMENT_EVENT_BIND_CLASS,
  TASK_ELEMENT_INPUT_CLASS,
  TASK_ELEMENT_LABEL_CLASS,
  TASK_ELEMENT_SHOPIFY_BIND_CLASS,
  TASK_ELEMENT_SHOPIFY_DRAG_CLASS,
  TASK_ELEMENT_SPAN_CLASS,
} from "../utils/constants";

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
      label: "Срочно",
    },
    medium: {
      label: "Несрочно",
    },
    low: {
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
          <div data-id="${e.id}" class="${TASK_ELEMENT_EVENT_BIND_CLASS} ${TASK_ELEMENT_SHOPIFY_BIND_CLASS} flex items-center justify-start bg-blue-300 rounded-2xl p-3 text-2xl">
            <label class="${TASK_ELEMENT_LABEL_CLASS} w-full cursor-pointer">
              <input class=${TASK_ELEMENT_INPUT_CLASS} type="checkbox" value="${e.done}" ${e.done ? "checked" : ""} />
              <span class="${TASK_ELEMENT_SPAN_CLASS} text-black">${safeText}</span>
            </label>
            <mark class="ml-auto mr-4">${this.#map[e.priority]?.label || ""}</mark>
            <span class="${TASK_ELEMENT_SHOPIFY_DRAG_CLASS} material-symbols-outlined mr-4 md:mr-8 cursor-grab text-black">drag_indicator</span>
            <span class="${TASK_ELEMENT_DELETE_CLASS} material-symbols-outlined text-black cursor-pointer">delete</span>
          </div>
        `,
      );
    });
  }
}

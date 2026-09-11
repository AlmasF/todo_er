import {
  TASK_ELEMENT_DELETE_CLASS,
  TASK_ELEMENT_EVENT_BIND_CLASS,
  TASK_ELEMENT_INPUT_CLASS,
  TASK_ELEMENT_LABEL_CLASS,
  TASK_ELEMENT_SHOPIFY_BIND_CLASS,
  TASK_ELEMENT_SHOPIFY_DRAG_CLASS,
  TASK_ELEMENT_SPAN_CLASS,
} from '../utils/constants';

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
      label: 'Срочно',
      bgColor: 'bg-red-400',
    },
    medium: {
      label: 'Несрочно',
      bgColor: 'bg-yellow-600',
    },
    low: {
      label: 'Можно отложить',
      bgColor: 'bg-green-400',
    },
  };

  /**
   * Отрисовка списка
   * @param {List} list
   */
  drawListOfTasks(list) {
    this.container.innerHTML = '';

    list?.forEach((e) => {
      // 1. Создать временный элемент, чтобы почистить XSS
      const tempDiv = document.createElement('div');
      tempDiv.innerText = e.text;
      const safeText = tempDiv.innerHTML; // Модифицирование < в &lt;, > в &gt;, и т.п.

      // 2. Безопасная инъекция HTML
      this.container.insertAdjacentHTML(
        'beforeend',
        `
          <div data-id="${e.id}" class="${TASK_ELEMENT_EVENT_BIND_CLASS} ${TASK_ELEMENT_SHOPIFY_BIND_CLASS} flex items-center justify-start bg-[#2d5d90] rounded-2xl py-3 px-5 text-2xl">
            <label class="${TASK_ELEMENT_LABEL_CLASS} w-full cursor-pointer flex items-center justify-start gap-4">
              <input class="${TASK_ELEMENT_INPUT_CLASS} min-w-8 min-h-8 cursor-pointer" type="checkbox" value="${e.done}" ${e.done ? 'checked' : ''} />
              <span class="${TASK_ELEMENT_SPAN_CLASS} text-white max-w-125 wrap-break-word">${safeText}</span>
            </label>
            <mark class="ml-auto mr-4 rounded-2xl p-2 ${this.#map[e.priority]?.bgColor} text-white min-w-fit">${this.#map[e.priority]?.label || ''}</mark>
            <span class="${TASK_ELEMENT_SHOPIFY_DRAG_CLASS} material-symbols-outlined mr-4 md:mr-8 cursor-grab text-white">drag_indicator</span>
            <span class="${TASK_ELEMENT_DELETE_CLASS} material-symbols-outlined text-white cursor-pointer">delete</span>
          </div>
        `
      );
    });
  }
}

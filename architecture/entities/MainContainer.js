import { isElement } from '../utils/checkIfHTMLNode';
import {
  ADD_TASK_FORM_ID,
  ADD_TASK_TEXT_FIELD_ID,
  CONFIRM_DELETE_DIALOG_CLOSE_BUTTON_ID,
  CONFIRM_DELETE_DIALOG_ID,
  CONFIRM_DELETE_DIALOG_NO_BUTTON_ID,
  CONFIRM_DELETE_DIALOG_TASK_TEXT_PARAGRAPH_ID,
  CONFIRM_DELETE_DIALOG_YES_BUTTON_ID,
  TASK_CONTAINER_ID,
} from '../utils/constants';

export class MainContainer {
  constructor() {
    this.body = document.getElementsByTagName('body')?.[0];
  }

  mountMainTag() {
    const mainTag = `
        <main class="mt-10 mx-auto max-w-4/5 md:max-w-6xl">
            <p class="cursor-pointer text-5xl">TODO-шка</p>
            <h1 class="text-3xl mt-8">
                Cегодня: <time></time>
                <br />
                На часах: <time id="clock"></time>
            </h1>

            <section class="mt-10 flex flex-col justify-between gap-3" id=${TASK_CONTAINER_ID}></section>

            <section>
                <form class="flex flex-col" id=${ADD_TASK_FORM_ID}>
                    <label class="text-2xl mt-10" for=${ADD_TASK_TEXT_FIELD_ID}>Добавить задачу на сегодня</label>
                    <textarea
                        id=${ADD_TASK_TEXT_FIELD_ID}
                        type="text"
                        name="task_text"
                        required
                        pattern=".*\\S.*"
                        title="не может быть пустым"
                        aria-label="Поле ввода для текста задачи"
                        class="border border-solid rounded-2xl text-2xl p-2 mt-2 field-sizing-content resize-none"
                        maxlength="200"
                    ></textarea>
                    <label class="text-2xl mt-6">Установите приоритет</label>
                    <select
                        name="priority"
                        aria-label="Установите приоритет для задачи"
                        required
                        class="border border-solid rounded-2xl text-2xl p-2 mt-2"
                    >
                        <option selected disabled value="">
                        Установите приоритет для задачи
                        </option>
                        <option value="high">Важно</option>
                        <option selected value="medium">Несрочно</option>
                        <option value="low">Можно отложить</option>
                    </select>
                    <button role="button" aria-label="Добавить" class="w-full rounded-2xl text-2xl p-2 border border-solid cursor-pointer mt-5 hover:bg-blue-500 hover:text-yellow-200">Добавить</button>
                </form>
            </section>

            <dialog id="${CONFIRM_DELETE_DIALOG_ID}" class="overflow-hidden w-96 h-fit rounded-3xl p-4 inset-0 m-auto backdrop:bg-black/50 backdrop:backdrop-blur-sm backdrop:m-auto">
              <div class="flex flex-col items-start justify-start w-full h-full">
                <div class="flex items-center justify-between w-full">
                  <p class="text-2xl">Подтвердите удаление</p>
                  <button id="${CONFIRM_DELETE_DIALOG_CLOSE_BUTTON_ID}" class="p-1 rounded-sm border border-gray-100 h-9 w-9 cursor-pointer bg-red-300 text-white">
                    <span class="material-symbols-outlined">close</span>
                  </button>
                </div>
                <p class="text-xl pt-2 mt-2 border-t border-black">Вы уверены, что хотите удалить задачу?</p>
                <p id="${CONFIRM_DELETE_DIALOG_TASK_TEXT_PARAGRAPH_ID}" class="wrap-break-word w-full text-wrap p-1 rounded-sm border border-black mt-4"><p/>
                <div class="flex items-center justify-center gap-2 mt-5 w-full">
                  <button id="${CONFIRM_DELETE_DIALOG_YES_BUTTON_ID}" class="w-1/2 h-10 p-1 rounded-sm border border-gray-100 cursor-pointer bg-red-400 text-white">Удалить</button>
                  <button id="${CONFIRM_DELETE_DIALOG_NO_BUTTON_ID}" class="w-1/2 h-10 p-1 rounded-sm border border-gray-100 cursor-pointer bg-blue-400 text-white">Отмена</button>
                </div>
              </div>  
            </dialog>
        </main>
        `;
    if (this.body && isElement(this.body)) {
      try {
        this.body.insertAdjacentHTML('afterbegin', mainTag);
      } catch (err) {
        console.error(err);
      }
    }
  }
}

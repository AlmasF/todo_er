import { isElement } from "../utils/checkIfHTMLNode";
import {
  ADD_TASK_FORM_ID,
  ADD_TASK_TEXT_FIELD_ID,
  TASK_CONTAINER_ID,
} from "../utils/constants";

export class MainContainer {
  constructor() {
    this.body = document.getElementsByTagName("body")?.[0];
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
                    <input
                        id=${ADD_TASK_TEXT_FIELD_ID}
                        type="text"
                        name="task_text"
                        required
                        pattern=".*\\S.*"
                        title="не может быть пустым"
                        aria-label="Поле ввода для текста задачи"
                        class="border border-solid rounded-2xl text-2xl p-2 mt-2"
                    />
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
        </main>
        `;
    if (this.body && isElement(this.body)) {
      try {
        this.body.insertAdjacentHTML("afterbegin", mainTag);
      } catch (err) {
        console.error(err);
      }
    }
  }
}

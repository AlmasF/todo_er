import { Sortable } from '@shopify/draggable';
import { HTMLContainer } from './entities/HTMLContainer.js';
import { List } from './entities/List.js';
import { LocalStorageInterface } from './entities/LocalStorageInterface.js';
import { setupTimeOfToday } from './utils/setupTimeOfToday.js';
import { startTimer } from './utils/startTimer.js';
import {
  ADD_TASK_FORM_ID,
  ADD_TASK_TEXT_FIELD_ID,
  STORAGE_LIST_KEY,
  TASK_CONTAINER_ID,
  TASK_ELEMENT_DELETE_CLASS,
  TASK_ELEMENT_EVENT_BIND_CLASS,
  TASK_ELEMENT_INPUT_CLASS,
  TASK_ELEMENT_LABEL_CLASS,
  TASK_ELEMENT_SHOPIFY_BIND_CLASS,
  TASK_ELEMENT_SHOPIFY_DRAG_CLASS,
  TASK_ELEMENT_SPAN_CLASS,
} from './utils/constants.js';
import { MainContainer } from './entities/MainContainer.js';

const listEntity = new List();
const listStorage = new LocalStorageInterface(STORAGE_LIST_KEY);
const mainContainer = new MainContainer();
mainContainer.mountMainTag();
const listContainer = new HTMLContainer(TASK_CONTAINER_ID);

const addTaskForm = document.getElementById(ADD_TASK_FORM_ID);
const inputTextField = document.getElementById(ADD_TASK_TEXT_FIELD_ID);

listContainer.container.addEventListener('click', (event) => {
  const taskRow = event.target.closest(`.${TASK_ELEMENT_EVENT_BIND_CLASS}`);
  const taskId = taskRow?.dataset.id;
  if (
    event.target.classList.contains(TASK_ELEMENT_INPUT_CLASS) ||
    event.target.classList.contains(TASK_ELEMENT_LABEL_CLASS) ||
    event.target.classList.contains(TASK_ELEMENT_SPAN_CLASS)
  ) {
    listEntity.toggleTask(taskId);
    listStorage.writeToLocalStorage(listEntity.readValues());
    listContainer.drawListOfTasks(listEntity.readValues());
  } else if (event.target.classList.contains(TASK_ELEMENT_DELETE_CLASS)) {
    listEntity.deleteTaskById(taskId);
    listStorage.writeToLocalStorage(listEntity.readValues());
    listContainer.drawListOfTasks(listEntity.readValues());
  }
});

addTaskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(addTaskForm);
  const data = Object.fromEntries(formData.entries());

  listEntity.addTask(data.task_text, data.priority);
  listStorage.writeToLocalStorage(listEntity.readValues());
  listContainer.drawListOfTasks(listEntity.readValues());
  inputTextField.value = '';
});

// Важно возвращать пустой массив иначе, потому что можно просто пропустить этот момент и все сломается
// список значений снова будет пустым
listEntity.setValues(listStorage.readFromLocalStorage() || []);
listContainer.drawListOfTasks(listEntity.readValues());
setupTimeOfToday();
startTimer();
const containers = document.querySelectorAll(`#${TASK_CONTAINER_ID}`);
const sortable = new Sortable(containers, {
  draggable: `.${TASK_ELEMENT_SHOPIFY_BIND_CLASS}`,
  handle: `.${TASK_ELEMENT_SHOPIFY_DRAG_CLASS}`,
  mirror: {
    constrainDimensions: true,
  },
});

sortable.on('sortable:stop', (event) => {
  listEntity.moveArrayItemInPlace(event?.oldIndex, event?.newIndex);
  listStorage.writeToLocalStorage(listEntity.readValues());
});

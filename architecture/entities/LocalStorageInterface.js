export class LocalStorageInterface {
  #key;

  constructor(key) {
    this.#key = key;
  }

  /**
   * Использовать в связке с try catch. Так можно очистить значение ключа, если будет неудачная попытка записи
   * @param {object} obj Объект, который нужно сохранить в локальном хранилище
   */
  writeToLocalStorage(obj) {
    const stringified = JSON.stringify(obj, this.#key);
    localStorage.setItem(this.#key, stringified);
  }

  /**
   * Использовать в связке с try catch. Так можно очистить значение ключа, если будет неудачная попытка чтения
   */
  readFromLocalStorage() {
    try {
      const value = localStorage.getItem(this.#key);
      return JSON.parse(value) || [];
    } catch {
      return null;
    }
  }
}

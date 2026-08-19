export class LocalStorageInterface {
  #key;

  constructor(key) {
    this.#key = key;
  }

  /**
   * Безопасно сохраняет объект в локальное хранилище.
   * Если память переполнена, очищает ключ.
   * @param {object|array} obj Данные для сохранения
   */
  writeToLocalStorage(obj) {
    try {
      const stringified = JSON.stringify(obj); // Исправлено: убран второй аргумент
      localStorage.setItem(this.#key, stringified);
    } catch (error) {
      console.error(
        `Ошибка записи в LocalStorage по ключу "${this.#key}":`,
        error,
      );
      // Если не удалось записать (например, превышен лимит), очищаем битые данные
      this.clear();
    }
  }

  /**
   * Безопасно читает данные из хранилища.
   * @returns {array|object} Спарсенные данные или пустой массив в случае неудачи
   */
  readFromLocalStorage() {
    try {
      const value = localStorage.getItem(this.#key);
      return value ? JSON.parse(value) : [];
    } catch (error) {
      console.error(
        `Ошибка чтения из LocalStorage по ключу "${this.#key}":`,
        error,
      );
      this.clear(); // Очищаем ключ, если там лежал невалидный JSON
      return []; // Возвращаем предсказуемый пустой массив вместо null
    }
  }

  /**
   * Очищает значение ключа в хранилище
   */
  clear() {
    localStorage.removeItem(this.#key);
  }
}

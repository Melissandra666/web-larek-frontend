// Определение алиасов для простых типов данных
type EventName = string | RegExp; // Тип для названия события, может быть строкой или регулярным выражением
type Subscriber = Function; // Тип для функции-подписчика
type EmitterEvent = {
  eventName: string, // Имя события
  data: unknown // Данные события
};

// Интерфейс для описания методов работы с событиями
export interface IEvents {
  on<T extends object>(event: EventName, callback: (data: T) => void): void; // Метод для установки обработчика
  emit<T extends object>(event: string, data?: T): void; // Метод для инициирования события
  trigger<T extends object>(event: string, context?: Partial<T>): (data: T) => void; // Метод для создания триггера события
}

/**
 * EventEmitter - классическая реализация брокера событий
 * Этот класс может быть расширен для прослушивания всех событий
 * или обработки событий по шаблону (например, используя регулярные выражения)
 */
export class EventEmitter implements IEvents {
  _events: Map<EventName, Set<Subscriber>>; // Карта для хранения событий и подписчиков

  constructor() {
    this._events = new Map<EventName, Set<Subscriber>>(); // Инициализация пустой карты событий
  }

  /**
   * Установить обработчик на событие
   * @param eventName - имя события (строка или регулярное выражение)
   * @param callback - функция-обработчик события
   */
  on<T extends object>(eventName: EventName, callback: (event: T) => void) {
    if (!this._events.has(eventName)) {
      this._events.set(eventName, new Set<Subscriber>()); // Если события нет, создаем новое множество подписчиков
    }
    this._events.get(eventName)?.add(callback); // Добавляем подписчика на событие
  }

  /**
   * Снять обработчик с события
   * @param eventName - имя события
   * @param callback - функция-обработчик, которую нужно удалить
   */
  off(eventName: EventName, callback: Subscriber) {
    if (this._events.has(eventName)) {
      this._events.get(eventName)!.delete(callback); // Удаляем подписчика из множества
      if (this._events.get(eventName)?.size === 0) {
        this._events.delete(eventName); // Удаляем событие, если больше нет подписчиков
      }
    }
  }

  /**
   * Инициировать событие с данными
   * @param eventName - имя события
   * @param data - данные, которые будут переданы подписчикам
   */
  emit<T extends object>(eventName: string, data?: T) {
    this._events.forEach((subscribers, name) => {
      // Инициируем событие, если его имя совпадает с переданным или проходит проверку регулярным выражением
      if (name instanceof RegExp && name.test(eventName) || name === eventName) {
        subscribers.forEach(callback => callback(data)); // Вызываем всех подписчиков
      }
    });
  }

  /**
   * Слушать все события
   * @param callback - функция, которая будет вызвана на любое событие
   */
  onAll(callback: (event: EmitterEvent) => void) {
    this.on("*", callback); // Устанавливаем обработчик на все события
  }

  /**
   * Сбросить все обработчики
   */
  offAll() {
    this._events = new Map<string, Set<Subscriber>>(); // Очищаем карту событий
  }

  /**
   * Создать триггер для вызова события
   * @param eventName - имя события
   * @param context - данные, которые будут добавлены к каждому вызову события
   * @returns функция, которая при вызове инициирует событие
   */
  trigger<T extends object>(eventName: string, context?: Partial<T>) {
    return (event: object = {}) => {
      this.emit(eventName, {
        ...(event || {}),
        ...(context || {})
      });
    };
  }
}

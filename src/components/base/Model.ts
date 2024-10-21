import { IEvents } from './events';

/**
 * Проверка, является ли объект экземпляром Model.
 * Используется для проверки типа объекта в рантайме.
 * 
 * @param obj - объект, который нужно проверить
 * @returns true, если объект является экземпляром Model
 */
export const isModel = (obj: unknown): obj is Model<any> => {
  return obj instanceof Model;
};

/**
 * Абстрактный класс Model, который предоставляет базовую функциональность 
 * для работы с моделями данных и обработкой событий.
 */
export abstract class Model<T> {
  /**
   * @param data - частичные данные, передаваемые в модель для инициализации
   * @param events - объект для обработки событий (на основе интерфейса IEvents)
   */
  constructor(data: Partial<T>, protected events: IEvents) {
    // Используем Object.assign для копирования переданных данных в экземпляр класса
    Object.assign(this, data);
  }

  /**
   * Метод для генерации события с переданным payload.
   * 
   * @param event - название события
   * @param payload - данные, передаваемые вместе с событием (необязательно)
   */
  emitChanges(event: string, payload?: object) {
    // Генерация события с переданными данными, либо пустым объектом, если payload не указан
    this.events.emit(event, payload ?? {});
  }
}

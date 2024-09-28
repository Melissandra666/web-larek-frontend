import { IEvents } from "./events";

// Функция для проверки, является ли объект моделью
export const isModel = (obj: unknown): obj is Model<any> => {
    return obj instanceof Model;
}

/**
 * Абстрактный класс базовой модели, используемый для отличия моделей от обычных объектов с данными.
 * Также добавляет функциональность для работы с событиями.
 */
export abstract class Model<T> {
    constructor(data: Partial<T>, protected events: IEvents) {
        // Инициализация модели, данные объекта присваиваются текущему экземпляру
        Object.assign(this, data);
    }

    /**
     * Уведомляет всех подписчиков о том, что модель изменилась, отправляя событие.
     * @param event - Название события
     * @param payload - Дополнительные данные, которые можно передать вместе с событием
     */
    emitChanges(event: string, payload?: object) {
        // Если дополнительные данные не переданы, отправляет пустой объект
        this.events.emit(event, payload ?? {});
    }

    // Здесь можно добавить другие общие методы для всех моделей
}

import { Component } from '../base/Components';  // Импорт базового класса компонента
import { ensureElement } from '../../utils/utils';  // Импорт функции для безопасного получения DOM-элементов

// Интерфейс для данных успешного завершения
interface ISuccess {
    total: number;  // Общая сумма успешного заказа
}

// Интерфейс для действий, связанных с успешным завершением
interface ISuccessActions {
    onClick: () => void;  // Метод, который будет вызываться при клике
}

// Класс Success, наследующий от компонента
export class Success extends Component<ISuccess> {
    protected _close: HTMLElement;  // Элемент кнопки закрытия
    protected _description: HTMLElement;  // Элемент для описания успешного завершения

    // Конструктор класса принимает контейнер и действия
    constructor(container: HTMLElement, actions: ISuccessActions) {
        super(container);  // Вызов конструктора родительского класса

        // Получение элементов кнопки закрытия и описания из контейнера
        this._close = ensureElement('.order-success__close', this.container);
        this._description = ensureElement('.order-success__description', this.container);

        // Если переданы действия, добавляем обработчик клика на кнопку закрытия
        if (actions?.onClick) {
            this._close.addEventListener('click', actions.onClick);
        }
    }

    // Геттер для получения текста описания
    get description(): string | null {
        return this._description.textContent;  // Возвращает текстовое содержимое элемента
    }

    // Сеттер для установки текста описания
    set description(value: string) {
        // Устанавливает текст с указанным значением, добавляя префикс
        this.setText(this._description, `Списано ${value} синапсов`);
    }
}

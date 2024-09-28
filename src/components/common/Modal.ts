import { Component } from '../base/Components';  // Импорт базового компонента
import { ensureElement } from '../../utils/utils';  // Импорт функции для безопасного получения элементов
import { IEvents } from '../base/events';  // Импорт интерфейса для событий
import { eventsSelectors } from '../../utils/constants';  // Импорт селекторов событий

// Интерфейс для данных модального окна
export interface IModalData {
    content: HTMLElement;  // Контент, который будет отображаться в модальном окне
}

// Класс Modal, наследующий от базового компонента
export class Modal extends Component<IModalData> {
    protected _closeButton: HTMLButtonElement;  // Кнопка закрытия модального окна
    protected _content: HTMLElement;  // Контейнер для содержимого модального окна

    // Конструктор принимает контейнер и события
    constructor(container: HTMLElement, protected events: IEvents) {
        super(container);  // Вызов конструктора базового класса

        // Инициализация кнопки закрытия и содержимого модального окна
        this._closeButton = ensureElement<HTMLButtonElement>('.modal__close', container);
        this._content = ensureElement<HTMLElement>('.modal__content', container);

        // Обработчик события для закрытия модального окна при клике на кнопку
        this._closeButton.addEventListener('click', this.close.bind(this));
        // Закрытие модального окна при клике вне содержимого
        this.container.addEventListener('mousedown', this.close.bind(this));
        // Предотвращение закрытия при клике на содержимое
        this._content.addEventListener('mousedown', (event) => event.stopPropagation());
    }

    // Установка содержимого модального окна
    set content(value: HTMLElement) {
        this._content.replaceChildren(value);  // Замена текущего содержимого новым
    }

    // Метод для переключения видимости модального окна
    // Параметр по умолчанию true позволяет открывать модальное окно без дополнительных аргументов
    _toggleModal(state = true) {
        this.toggleClass(this.container, 'modal_active', state);  // Включение/выключение класса активности
    }

    // Обработчик клавиши Escape для закрытия модального окна
    _handleEscape = (evt: KeyboardEvent) => {
        if (evt.key === 'Escape') {  // Если нажата клавиша Escape
            this.close();  // Закрываем модальное окно
        }
    };

    // Открытие модального окна
    open() {
        this._toggleModal();  // Включаем модальное окно
        document.addEventListener('keydown', this._handleEscape);  // Подписка на событие нажатия клавиши
        this.events.emit(eventsSelectors.modalOpen);  // Генерация события открытия
    }

    // Закрытие модального окна
    close() {
        this._toggleModal(false);  // Выключаем модальное окно
        document.removeEventListener('keydown', this._handleEscape);  // Убираем обработчик нажатия клавиши
        this.content = null!;  // Очищаем содержимое
        this.events.emit(eventsSelectors.modalClose);  // Генерация события закрытия
    }

    // Метод рендера, который отображает модальное окно и возвращает контейнер
    render(data: IModalData): HTMLElement {
        super.render(data);  // Вызов метода рендера родительского класса
        this.open();  // Открываем модальное окно после рендера
        return this.container;  // Возвращаем контейнер модального окна
    }
}

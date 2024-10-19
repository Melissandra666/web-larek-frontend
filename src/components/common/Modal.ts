import { Component } from '../base/Components'; // Импорт базового компонента
import { IEvents } from '../base/events'; // Импорт интерфейса событий
import { ensureElement } from '../../utils/utils'; // Импорт утилиты для поиска элементов в DOM

// Интерфейс данных для модального окна
interface IModalData {
	content: HTMLElement; // Контент модального окна
}

// Класс модального окна
export class Modal extends Component<IModalData> {
  protected _content: HTMLElement; // Элемент для отображения контента
	protected _closeButton: HTMLButtonElement; // Кнопка закрытия модального окна

	// Конструктор класса Modal
	constructor(container: HTMLElement, protected events: IEvents) {
		super(container); // Вызов конструктора родительского класса

		// Инициализация кнопки закрытия и контента
		this._closeButton = ensureElement<HTMLButtonElement>(
			'.modal__close', // Селектор кнопки закрытия
			container // Контейнер модального окна
		);
		this._content = ensureElement<HTMLElement>(
			'.modal__content', // Селектор для контента модального окна
			container
		);

		// Добавляем слушатели событий для закрытия окна при клике на кнопку и на контейнер
		this._closeButton.addEventListener('click', this.close.bind(this));
		this.container.addEventListener('click', this.close.bind(this));
		// Остановка всплытия события клика, чтобы контент не реагировал на клик по контейнеру
		this._content.addEventListener('click', (event) => event.stopPropagation());
	}

	// Метод для установки контента в модальное окно
	set content(value: HTMLElement) {
		this._content.replaceChildren(value); // Заменяем текущий контент на новый
	}

	// Метод открытия модального окна
	open() {
		this.container.classList.add('modal_active'); // Добавляем класс, активирующий модальное окно
		this.events.emit('modal:open'); // Генерируем событие открытия модального окна
	}

	// Метод закрытия модального окна
	close() {
		this.container.classList.remove('modal_active'); // Убираем класс, деактивирующий окно
		this.content = null; // Очищаем контент модального окна
		this.events.emit('modal:close'); // Генерируем событие закрытия модального окна
	}

	// Метод рендера модального окна с переданным контентом
	render(data: IModalData): HTMLElement {
		super.render(data); // Вызываем метод рендера родительского класса
		this.open(); // Открываем модальное окно

		return this.container; // Возвращаем контейнер модального окна
	}
}

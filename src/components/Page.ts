import { Component } from './base/Components'; // Импортируем базовый компонент
import { IEvents } from './base/events'; // Импортируем интерфейс событий
import { ensureElement } from '../utils/utils'; // Импортируем утилиту для нахождения элемента

// Интерфейс IPage описывает структуру объекта страницы
interface IPage {
	counter: number;  // Счётчик элементов (например, товаров в корзине)
	catalog: HTMLElement[];  // Каталог товаров (массив элементов HTML)
	locked: boolean;  // Статус блокировки страницы (например, при открытии модального окна)
}

// Класс Page расширяет базовый компонент и реализует интерфейс IPage
export class Page extends Component<IPage> {
	protected _counter: HTMLElement;  // Счётчик товаров
	protected _catalog: HTMLElement;  // Элемент каталога товаров
	protected _wrapper: HTMLElement;  // Основной контейнер страницы
	protected _basket: HTMLElement;  // Элемент корзины

	// Конструктор принимает контейнер и события, наследует конструктор базового компонента
	constructor(container: HTMLElement, protected events: IEvents) {
		super(container);

		// Инициализация основных элементов страницы с помощью функции ensureElement
		this._counter = ensureElement<HTMLElement>('.header__basket-counter');  // Элемент счётчика в шапке страницы
		this._catalog = ensureElement<HTMLElement>('.gallery');  // Элемент, который содержит галерею товаров
		this._wrapper = ensureElement<HTMLElement>('.page__wrapper');  // Основной wrapper страницы
		this._basket = ensureElement<HTMLElement>('.header__basket');  // Элемент корзины

		// Добавляем обработчик события для клика по корзине
		this._basket.addEventListener('click', () =>
			this.events.emit('basket:open')  // При клике на корзину открывается корзина
		);
	}

	// Сеттер для изменения значения счётчика товаров в корзине
	set counter(value: number) {
		this.setText(this._counter, String(value));  // Обновляем текст в элементе счётчика
	}

	// Сеттер для обновления каталога товаров
	set catalog(items: HTMLElement[]) {
		this._catalog.replaceChildren(...items);  // Заменяем содержимое элемента каталога новыми элементами
	}

	// Сеттер для блокировки/разблокировки страницы
	set locked(value: boolean) {
		// Если страница заблокирована, добавляем класс 'page__wrapper_locked', если нет — удаляем его
		if (value) this._wrapper.classList.add('page__wrapper_locked');
		else this._wrapper.classList.remove('page__wrapper_locked');
	}
}

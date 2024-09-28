// Импорт базового класса Component, интерфейса событий IEvents и утилит
import { Component } from './base/Components';
import { IEvents } from '../components/base/events';
import { ensureElement } from '../utils/utils';
import { eventsSelectors } from '../utils/constants';

// Интерфейс IPage описывает структуру данных страницы: количество товаров в корзине и элементы галереи
export interface IPage {
  counter: number;         // Количество товаров в корзине
  gallery: HTMLElement[];  // Список элементов галереи
}

// Класс Page наследует базовый класс Component и реализует функциональность страницы
export class Page extends Component<IPage> {
  // Приватные свойства, представляющие элементы интерфейса
  protected _counter: HTMLElement;  // Счётчик товаров в корзине
  protected _gallery: HTMLElement;  // Галерея товаров
  protected _wrapper: HTMLElement;  // Обёртка страницы
  protected _basket: HTMLElement;   // Корзина

  // Конструктор принимает контейнер страницы и объект событий
  constructor(container: HTMLElement, protected events: IEvents) {
    super(container);  // Вызов конструктора базового класса Component

    // Инициализация элементов с использованием функции ensureElement для безопасного поиска
    this._counter = ensureElement('.header__basket-counter');  // Поиск элемента счётчика корзины
    this._gallery = ensureElement('.gallery');                 // Поиск элемента галереи
    this._wrapper = ensureElement('.page__wrapper');           // Поиск обёртки страницы
    this._basket = ensureElement('.header__basket');           // Поиск элемента корзины

    // Добавляем обработчик клика на элемент корзины
    this._basket.addEventListener('click', this.handleBasketClick);
  }

  // Приватный метод для обработки события клика на корзину
  private handleBasketClick = () => {
    // Генерируем событие открытия корзины
    this.events.emit(eventsSelectors.basketOpen);
  };

  // Сеттер для обновления значения счётчика товаров в корзине
  set counter(value: number) {
    // Устанавливаем текстовое содержимое элемента счётчика
    this.setText(this._counter, String(value));
  }

  // Сеттер для обновления галереи на странице
  set gallery(items: HTMLElement[]) {
    // Очищаем текущее содержимое галереи
    this._gallery.innerHTML = '';
    // Добавляем новые элементы в галерею
    this._gallery.append(...items);
  }

  // Сеттер для блокировки/разблокировки страницы
  set locked(value: boolean) {
    // Переключаем класс, блокирующий страницу
    this.toggleClass(this._wrapper, 'page__wrapper_locked', value);
  }
}


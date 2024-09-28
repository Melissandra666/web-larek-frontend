// Импортируем зависимости из других модулей
import { Component } from '../base/Components';  // Базовый компонент для создания пользовательских интерфейсов
import { createElement, ensureElement } from '../../utils/utils';  // Вспомогательные функции для работы с DOM
import { EventEmitter } from '../base/events';  // Событийный эмиттер для взаимодействия между компонентами
import { eventsSelectors } from '../../utils/constants';  // Константы для типов событий

// Интерфейс IBasketView определяет, какие данные ожидает отображение корзины
interface IBasketView {
  items: HTMLElement[];  // Список элементов в корзине
  total: number;  // Общая стоимость
}

// Класс Basket расширяет функциональность компонента и реализует логику корзины
export class Basket extends Component<IBasketView> {
  protected _list: HTMLElement;  // Элемент списка товаров в корзине
  protected _total: HTMLElement;  // Элемент для отображения общей стоимости
  protected _button: HTMLButtonElement;  // Кнопка для оформления заказа

  // Конструктор класса корзины
  constructor(container: HTMLElement, protected events: EventEmitter) {
    super(container);  // Инициализация базового класса Component

    // Получаем элементы корзины с помощью функции ensureElement
    this._list = ensureElement<HTMLElement>('.basket__list', this.container);
    this._total = this.container.querySelector('.basket__price') as HTMLElement;
    this._button = this.container.querySelector('.basket__button') as HTMLButtonElement;

    // Добавляем обработчик события клика по кнопке оформления заказа
    if (this._button) {
      this._button.addEventListener('click', () => {
        // При клике на кнопку эмитируем событие для открытия заказа
        events.emit(eventsSelectors.orderOpen);
      });
    }

    // Инициализируем корзину как пустую
    this.items = [];
    // Отключаем кнопку, так как корзина пуста
    this.setDisabled(this._button, true);
  }

  // Метод для переключения доступности кнопки оформления заказа
  toggleButton(isDisabled: boolean) {
    if (this._button) {
      this.setDisabled(this._button, isDisabled);  // Включаем/выключаем кнопку в зависимости от флага isDisabled
    }
  }

  // Устанавливаем новые товары в корзину
  set items(items: HTMLElement[]) {
    // Если список товаров пуст, отображаем сообщение "Корзина пуста"
    const content = items.length
      ? [...items]  // Если товары есть, то выводим их
      : [createElement<HTMLParagraphElement>('p', { textContent: 'Корзина пуста' })];  // Иначе создаём элемент с текстом

    // Обновляем содержимое списка товаров в корзине
    this._list.replaceChildren(...content);
  }

  // Устанавливаем общую стоимость товаров в корзине
  set total(total: number) {
    this.setText(this._total, `${total.toString()} синапсов`);  // Обновляем текстовое содержимое элемента для общей стоимости
  }
}

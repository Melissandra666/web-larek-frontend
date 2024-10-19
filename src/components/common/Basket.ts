import { Component } from '../base/Components'; // Импорт базового компонента
import { EventEmitter } from '../base/events'; // Импорт EventEmitter для работы с событиями
import { ensureElement, createElement } from '../../utils/utils'; // Импорт утилит для работы с DOM
import { IBasketProduct } from '../../types'; // Импорт типа данных корзины

// Интерфейс для отображения корзины
interface IBasketView {
  items: HTMLElement[]; // Массив элементов, представляющих товары
  total: number; // Общая сумма товаров в корзине
  selected: string[]; // Массив выбранных товаров
}

// Класс Basket для работы с корзиной покупок
export class Basket extends Component<IBasketView> {
  protected _list: HTMLElement; // Элемент для отображения списка товаров
  protected _total: HTMLElement; // Элемент для отображения итоговой суммы
  protected _button: HTMLElement; // Кнопка для оформления заказа

  // Конструктор корзины
  constructor(container: HTMLElement, protected events: EventEmitter) {
    super(container); // Вызов конструктора базового класса

    // Поиск элементов корзины
    this._list = ensureElement<HTMLElement>('.basket__list', this.container); // Список товаров
    this._total = this.container.querySelector('.basket__price'); // Общая сумма товаров
    this._button = this.container.querySelector('.basket__button'); // Кнопка оформления заказа

    // Добавление обработчика события на кнопку оформления заказа
    if (this._button)
      this._button.addEventListener('click', () => events.emit('order:open')); // Открытие формы заказа по клику

    this.items = []; // Инициализация пустого списка товаров
  }

  // Установка элементов списка товаров
  set items(items: HTMLElement[]) {
    if (items.length) {
      // Если есть товары в корзине
      this._list.replaceChildren(...items); // Заменяем содержимое списка на новые элементы
    } else {
      // Если корзина пуста
      this._list.replaceChildren(
        createElement<HTMLParagraphElement>('p', {
          textContent: 'Корзина пуста', // Отображаем сообщение о пустой корзине
        })
      );
    }
  }

  // Управление состоянием выбранных товаров
  set selected(items: IBasketProduct[]) {
    if (items.length) {
      // Если есть выбранные товары
      this.setDisabled(this._button, false); // Активируем кнопку оформления заказа
    } else {
      // Если товаров нет
      this.setDisabled(this._button, true); // Деактивируем кнопку оформления заказа
    }
  }

  // Установка итоговой суммы
  set total(total: number) {
    this.setText(this._total, `${total.toString()}` + ' синапсов'); // Обновляем отображение суммы
  }
}

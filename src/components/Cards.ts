import { Component } from './base/Components';
import { IProduct } from '../types/index';
import { ensureElement } from '../utils/utils';

// Объект для сопоставления категорий товаров с классами CSS для стилизации карточек
const ProductCategory: { [key: string]: string } = {
    "софт-скил": "card__category_soft",          // Класс для категории "софт-скил"
    "хард-скил": "card__category_hard",          // Класс для категории "хард-скил"
    "кнопка": "card__category_button",           // Класс для категории "кнопка"
    "дополнительное": "card__category_additional",// Класс для категории "дополнительное"
    "другое": "card__category_other"             // Класс для категории "другое"
  };
  
  // Интерфейс для управления действиями в карточке
  interface ICardActions {
    onClick: (event: MouseEvent) => void;  // Обработчик события клика
  }
  
  // Интерфейс для данных карточек, включающий данные о продукте и дополнительные поля
  export interface ICards extends IProduct {
    index?: string;       // Индекс карточки (опционально)
    buttonTitle?: string; // Текст кнопки на карточке (опционально)
  }
  
  // Класс для представления карточки продукта, наследуемый от базового компонента
  export class Card extends Component<ICards> {
    protected _title: HTMLElement;        // Элемент заголовка карточки
    protected _price: HTMLElement;        // Элемент для отображения цены
    protected _image?: HTMLImageElement;  // Элемент для изображения товара
    protected _description?: HTMLElement; // Элемент для описания товара
    protected _button?: HTMLButtonElement;// Кнопка на карточке
    protected _category?: HTMLElement;    // Элемент для отображения категории
    protected _index?: HTMLElement;       // Элемент для индекса карточки
  
    // Конструктор карточки, принимает контейнер и опционально действия
    constructor(container: HTMLElement, actions?: ICardActions) {
      super(container); // Вызываем конструктор базового класса
  
      // Инициализация элементов карточки
      this._title = ensureElement<HTMLElement>('.card__title', container);  // Заголовок карточки
      this._price = ensureElement<HTMLElement>('.card__price', container);  // Цена
      this._image = container.querySelector('.card__image') as HTMLImageElement;  // Изображение
      this._button = container.querySelector('.card__button') as HTMLButtonElement; // Кнопка
      this._description = container.querySelector('.card__text') as HTMLElement;   // Описание
      this._category = container.querySelector('.card__category') as HTMLElement;  // Категория
      this._index = container.querySelector('.basket__item-index') as HTMLElement; // Индекс
  
      // Установка обработчика клика, если он передан в параметрах
      if (actions?.onClick && this._button) {
        this._button.addEventListener('click', actions.onClick); // Клик по кнопке
      } else if (actions?.onClick) {
        container.addEventListener('click', actions.onClick);  // Клик по карточке
      }
    }
  
    // Метод для отключения кнопки, если цена равна null
    disableButton(value: number | null) {
      if (value === null && this._button) {
        this.setDisabled(this._button, true); // Отключаем кнопку, если нет цены
      }
    }
  
    // Сеттер и геттер для ID карточки
    set id(value: string) {
      this.container.dataset.id = value;  // Устанавливаем ID карточки
    }
  
    get id(): string {
      return this.container.dataset.id || '';  // Получаем ID карточки
    }
  
    // Сеттер для текста кнопки
    set buttonText(value: string) {
      if (this._button) {
        this.setText(this._button, value);  // Устанавливаем текст кнопки
      }
    }
  
    // Сеттер и геттер для заголовка карточки
    set title(value: string) {
      this.setText(this._title, value);  // Устанавливаем заголовок
    }
  
    get title(): string {
      return this._title.textContent || '';  // Получаем заголовок
    }
  
    // Сеттер и геттер для цены продукта
    set price(value: number | null) {
      this.setText(this._price, value ? `${value.toString()} синапсов` : 'Бесценно'); // Устанавливаем цену или текст "Бесценно"
      this.disableButton(value); // Отключаем кнопку, если цена равна null
    }
  
    get price(): number {
      return Number(this._price.textContent || '');  // Получаем цену
    }
  
    // Сеттер и геттер для категории товара
    set category(value: string) {
      this.setText(this._category, value);  // Устанавливаем категорию
      this.toggleClass(this._category, ProductCategory[value], true);  // Применяем соответствующий класс
    }
  
    get category(): string {
      return this._category?.textContent || '';  // Получаем категорию
    }
  
    // Сеттер и геттер для индекса карточки
    set index(value: string) {
      this.setText(this._index, value);  // Устанавливаем индекс
    }
  
    get index(): string {
      return this._index?.textContent || '';  // Получаем индекс
    }
  
    // Сеттер для изображения товара
    set image(value: string) {
      this.setImage(this._image, value, this.title);  // Устанавливаем изображение и альтернативный текст
    }
  
    // Сеттер для описания товара
    set description(value: string) {
      this.setText(this._description, value);  // Устанавливаем описание
    }
  }
  

import { IProductItem } from "../types"; // Импорт интерфейса для товара
import { ensureElement } from "../utils/utils"; // Утилита для гарантированного получения элемента
import { Component } from "./base/Components"; // Базовый класс для компонентов

// Интерфейс действия карточки (например, обработка клика)
export interface ICardAction {
  onClick: (event: MouseEvent) => void; // Функция, которая будет вызываться при клике
}

// Интерфейс для расширения данных о продукте, который будет использоваться в карточке
export interface ICard extends IProductItem {
	basketCardIndex?: string; // Индекс карточки в корзине (если есть)
	buttonTitle?: string; // Текст кнопки (например, "Добавить в корзину" или "Удалить")
}

// Класс карточки, который отображает информацию о продукте
export class Card<T> extends Component<ICard> {
  protected _title: HTMLElement; // Заголовок карточки (название продукта)
  protected _image?: HTMLImageElement; // Изображение продукта
  protected _category?: HTMLElement; // Категория продукта
  protected _description?: HTMLElement; // Описание продукта
  protected _price: HTMLElement; // Цена продукта
  protected _button?: HTMLButtonElement; // Кнопка действия (например, "В корзину")
  protected _basketCardIndex?: HTMLElement; // Индекс карточки в корзине
  protected _buttonTitle?: HTMLButtonElement; // Текст кнопки

  // Ассоциации для категорий продуктов, чтобы добавлять соответствующие классы CSS
  private categoryKey: Record<string, string> = {
    'хард-скил': '_hard',
    'софт-скил': '_soft',
    дополнительное: '_additional',
    кнопка: '_button',
    другое: '_other',
  };

  // Конструктор класса карточки, принимает контейнер для карточки и опционально действие для кнопки
  constructor(container: HTMLElement, action?: ICardAction) {
    super(container); // Вызываем конструктор базового класса Component

    // Инициализация основных элементов карточки
    this._title = ensureElement<HTMLElement>('.card__title', container);
    this._image = container.querySelector('.card__image');
    this._price = ensureElement<HTMLElement>('.card__price', container);
    this._category = container.querySelector('.card__category');
    this._description = container.querySelector('.card__text');
    this._button = container.querySelector('.card__button');
    this._basketCardIndex = container.querySelector('.basket__item-index');

    // Если было передано действие (например, клик), добавляем слушатели событий
    if (action?.onClick) {
      if (this._button) {
        this._button.addEventListener("click", action.onClick);
      } else {
        container.addEventListener("click", action.onClick);
      }
    }
  }

  // Отключение кнопки, если цена товара null (например, товар бесценен)
  disableButton(value: number | null) {
    if (!value && this._button) {
      this._button.disabled = true;
    }
  }

  // Сеттер для id карточки (сохраняем его в data-атрибут)
  set id(value: string) {
    this.container.dataset.id = value;
  }

  // Геттер для id карточки
  get id(): string {
    return this.container.dataset.id || "";
  }

  // Сеттер и геттер для индекса карточки в корзине
  set basketCardIndex(value: string) {
		this._basketCardIndex.textContent = value;
	}

	get basketCardIndex(): string {
		return this._basketCardIndex.textContent || '';
	}

  // Сеттер и геттер для заголовка карточки
  set title(value: string) {
    this.setText(this._title, value);
  }

  get title(): string {
    return this._title.textContent || "";
  }

  // Сеттер для текста кнопки
  set buttonTitle(value: string) {
    if(this._button) {
      this._button.textContent = value;
    }
  }

  // Сеттер для изображения карточки
  set image(value: string) {
    this.setImage(this._image, value, this.title);
  }

  // Сеттер для цены товара с проверкой и возможностью отключения кнопки
  set price(value: number | null) {
    this.setText(this._price, value ? `${value.toString()} синапсов` : 'Бесценно');
    this.disableButton(value);
  }

  // Геттер для цены товара
  get price(): number {
    return Number(this._price.textContent || '');
  }

  // Сеттер для категории товара с добавлением соответствующего класса
  set category(value: string) {
    this.setText(this._category, value);
    const category = this._category.classList[0]; // Основной класс категории
    this._category.className = ''; // Сбрасываем текущие классы
    this._category.classList.add(category); // Возвращаем основной класс
    this._category.classList.add(`${category}${this.categoryKey[value]}`); // Добавляем класс по категории
  }

  // Сеттер для описания карточки, поддерживает строку или массив строк
  set description(value: string | string[]) {
    if (Array.isArray(value)) {
      this._description.replaceWith(...value.map(str => {
        const descTemplate = this._description.cloneNode() as HTMLElement; // Клонируем узел для каждого описания
        this.setText(descTemplate, str);
        return descTemplate;
      }));
    } else {
      this.setText(this._description, value); // Устанавливаем строковое описание
    }
  }
}

import { FormErrors, IAppState, IOrder, IProduct } from "../types/index";
import { eventsSelectors } from "../utils/constants";
import { Model } from "./base/Model";
import { IContacts } from "./Contacts";
import { IOrderDetails } from "./Order";

export type CatalogChangeEvent = {
  catalog: Product[]; // Тип события изменения каталога
};

// Класс модели для товара
export class Product extends Model<IProduct> {
  id: string;          // Уникальный идентификатор продукта
  title: string;       // Название продукта
  category: string;    // Категория продукта
  image: string;       // Изображение продукта
  price: number;       // Цена продукта
  description: string; // Описание продукта
}

// Класс модели для заказа
export class Order extends Model<IOrder> {
  items: string[];   // Список товаров в заказе
  total: number;     // Общая стоимость заказа
  address: string;   // Адрес доставки
  payment: string;   // Способ оплаты
  email: string;     // Электронная почта клиента
  phone: string;     // Телефон клиента
}

// Класс, управляющий состоянием приложения
export class AppState extends Model<IAppState> {
  catalog: IProduct[];                // Каталог товаров
  selectedProduct: IProduct | null;   // Выбранный товар для просмотра
  order: IOrder = {                   // Текущий заказ с дефолтными значениями
    items: [],
    total: 0,
    address: '',
    payment: 'online',
    email: '',
    phone: '',
  };
  basket: IProduct[] | null = [];     // Товары в корзине
  preview: string | null;             // ID товара для предварительного просмотра
  formErrors: FormErrors = {};        // Ошибки валидации формы

  // Метод для выбора товара (предварительный просмотр)
  selectProduct(item: IProduct): void {
    this.preview = item.id;  // Устанавливаем выбранный товар
    this.emitChanges(eventsSelectors.previewChanged, item); // Уведомляем об изменении
  }

  // Метод для добавления товара в корзину
  addProduct(item: IProduct): void {
    if (this.basket?.includes(item)) return;  // Проверяем, не добавлен ли уже товар
    this.basket?.push(item);  // Добавляем товар в корзину
    this.refreshBasket();  // Обновляем состояние корзины
  }

  // Метод для удаления товара из корзины
  removeProduct(item: IProduct): void {
    if (this.basket?.includes(item)) {
      const index = this.basket.indexOf(item);
      this.basket.splice(index, 1);  // Удаляем товар из корзины
    }
    this.refreshBasket();  // Обновляем состояние корзины
  }

  // Метод для обновления состояния корзины
  refreshBasket(): void {
    this.emitChanges(eventsSelectors.counterChanged, this.basket);  // Обновляем счетчик товаров в корзине
    this.emitChanges(eventsSelectors.basketChanged, this.basket);   // Обновляем интерфейс корзины
  }

  // Метод для установки поля заказа (например, адреса или способа оплаты)
  setOrderField(field: keyof IOrderDetails, value: string) {
    this.order[field] = value;  // Обновляем поле заказа
    if (this.validateOrder()) {  // Если заказ валидный
      this.events.emit(eventsSelectors.orderReady, this.order);  // Уведомляем о готовности заказа
    }
  }

  // Метод для установки контактных данных (например, email или телефон)
  setContactField(field: keyof IContacts, value: string) {
    this.order[field] = value;  // Обновляем контактную информацию
    if (this.validateContact()) {  // Если контактные данные валидны
      this.events.emit(eventsSelectors.contactReady, this.order);  // Уведомляем о готовности контактов
    }
  }

  // Метод для очистки корзины
  clearBasket(): void {
    this.basket = [];  // Очищаем корзину
    this.refreshBasket();  // Обновляем состояние корзины
  }

  // Метод для сброса заказа к начальному состоянию
  clearOrder(): void {
    this.order = {
      items: [],
      total: 0,
      address: '',
      payment: 'online',
      email: '',
      phone: '',
    };  // Сбрасываем заказ
  }

  // Валидация контактных данных
  validateContact() {
    const validPhone = /[+78][0-9]{10,11}/;  // Шаблон для проверки телефона
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  // Шаблон для проверки email

    const errors: typeof this.formErrors = {};  // Инициализируем объект ошибок
    if (!this.order.email || !validEmail.test(this.order.email)) {
      errors.email = 'укажите корректный email';  // Добавляем ошибку, если email некорректен
    }

    if (!this.order.phone || !validPhone.test(this.order.phone)) {
      errors.phone = 'введите корректный номер';  // Добавляем ошибку, если номер телефона некорректен
    }

    this.formErrors = errors;  // Сохраняем ошибки
    this.events.emit(eventsSelectors.formErrorsChange, this.formErrors);  // Уведомляем об изменении ошибок
    return Object.keys(errors).length === 0;  // Возвращаем результат валидации (true, если ошибок нет)
  }

  // Валидация данных заказа (например, проверка на заполненность адреса)
  validateOrder() {
    const errors: typeof this.formErrors = {};
    if (!this.order.address) {
      errors.address = 'Необходимо указать адрес доставки';  // Ошибка, если адрес не указан
    }
    this.formErrors = errors;
    this.events.emit(eventsSelectors.formErrorsChange, this.formErrors);  // Уведомляем об ошибках
    return Object.keys(errors).length === 0;  // Возвращаем результат валидации
  }

  // Метод для обновления каталога товаров
  setCatalog(items: IProduct[]) {
    this.catalog = [...items];  // Обновляем каталог товаров
    this.emitChanges('items:changed', { catalog: this.catalog });  // Уведомляем об изменении каталога
  }
}

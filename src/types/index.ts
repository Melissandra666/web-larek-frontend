export interface IPage {
    catalog: HTMLElement[];     // Контейнер с карточками товаров
    itemsCounter: number;       // Количество товаров в корзине
}

export interface IProduct {
    id: string;                 // Уникальный идентификатор товара
    name: string;               // Название товара
    description: string;        // Описание товара
    price: number | null;       // Цена товара
    image: string;              // Изображение товара
    category: string;           // Категория товара
}

export type TPaymentOption = 'online' | 'offline';  // Способ оплаты

export interface IOrder {
    payment: TPaymentOption;    // Способ оплаты заказа
    address: string;            // Адрес доставки
    email: string;              // Электронная почта клиента
    phone: string;              // Телефонный номер клиента
    totalPrice: number | null;  // Общая стоимость товаров в корзине
    items: IProduct[];          // Массив товаров в корзине
}

export type TProductBase = Pick<IProduct, 'category' | 'name' | 'image' | 'price'>; // Базовые поля товара

export type TProductPopup = Pick<IProduct, 'category' | 'name' | 'description' | 'image' | 'price'>; // Поля товара для попапа

export type TOrderBasket = Pick<IProduct, 'name' | 'price'> & Pick<IOrder, 'totalPrice'>; // Поля товара и заказа для корзины

export type TOrderPayment = Pick<IOrder, 'payment' | 'address'>; // Поля для способа оплаты и адреса

export type TOrderContactsInformation = Pick<IOrder, 'email' | 'phone'>; // Поля для контактной информации

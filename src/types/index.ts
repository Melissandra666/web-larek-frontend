export interface IPage {
    catalog: HTMLElement[];     // Контейнер с карточками товаров
    itemsCounter: number;       // Количество товаров в корзине
}
  
export interface IProductItems {
    id: string,                 // Уникальный идентификатор товара
    name: string,               // Название товара
    description: string,        // Описание товара
    price: number | null,       // Цена товара
    image: string,           // Изображение товара
    category: string,           // Категория товара
}

export type TPaymentOption = 'online' | 'offline';  // Способ оплаты

export interface IOrderItems {
    payment: TPaymentOption;    // Способ оплаты заказа
    address: string;            // Адрес доставки
    email: string;              // Электронная почта клиента
    phone: string;              // Телефонный номер клиента
    totalPrice: number | null;  // Общая стоимость товаров в корзине
    items: IProductItems[];          // Массив товаров в корзине
}

export type TProduct = {
    category: IProductItems['category']; // Категория товара
    name: IProductItems['name'];         // Название товара
    image: IProductItems['image']; // Изображение товара
    price: IProductItems['price'];       // Цена товара
}

export type TProductPopup = {
    category: IProductItems['category'];       // Категория товара
    name: IProductItems['name'];               // Название товара
    description: IProductItems['description']; // Описание товара
    image: IProductItems['image'];       // Изображение товара
    price: IProductItems['price'];             // Цена товара
}

export type TOrderBasket = {
    name: IProductItems['name'];           // Название товара
    price: IProductItems['price'];         // Цена за единицу товара
    totalPrice: IOrderItems['totalPrice']; // Общая стоимость заказа
}

export type TOrderPayment = {
    payment: IOrderItems['payment'];    // Способ оплаты
    address: IOrderItems['address'];    // Адрес доставки
}

export type TOrderContactsInformation = {
    email: IOrderItems['email'];  // Электронная почта
    phone: IOrderItems['phone'];  // Номер телефона
}


  
  

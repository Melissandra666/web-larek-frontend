# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/styles/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```
## Данные и типы данных, используемые в приложении

### Интерфейс главной страницы

```
export interface IPage {
    catalog: HTMLElement[];     // Контейнер с карточками товаров
    itemsCounter: number;       // Количество товаров в корзине
}
```

### Интерфейс каталога товаров

```
export interface IProductItems {
    id: string,                 // Уникальный идентификатор товара
    name: string,               // Название товара
    description: string,        // Описание товара
    price: number | null,       // Цена товара
    image: string,           // Изображение товара
    category: string,           // Категория товара
}
```

### Интерфейс корзины

```
export interface IOrderItems {
    payment: TPaymentOption;    // Способ оплаты заказа
    address: string;            // Адрес доставки
    email: string;              // Электронная почта клиента
    phone: string;              // Телефонный номер клиента
    totalPrice: number | null;  // Общая стоимость товаров в корзине
    items: IProductItems[];          // Массив товаров в корзине
}
```

### Тип данных для способа оплаты

```
export type TPaymentOption = 'online' | 'offline';  // Способ оплаты
```

### Тип данных для каталога товаров на главной странице

```
export type TProduct = {
    category: IProductItems['category']; // Категория товара
    name: IProductItems['name'];         // Название товара
    image: IProductItems['image']; // Изображение товара
    price: IProductItems['price'];       // Цена товара
}
```

### Тип данных для карточки продукта

```
export type TProductPopup = {
    category: IProductItems['category'];       // Категория товара
    name: IProductItems['name'];               // Название товара
    description: IProductItems['description']; // Описание товара
    image: IProductItems['image'];       // Изображение товара
    price: IProductItems['price'];             // Цена товара
}
```

### Тип данных для заказа в корзине

```
export type TOrderBasket = {
    name: IProductItems['name'];           // Название товара
    price: IProductItems['price'];         // Цена за единицу товара
    totalPrice: IOrderItems['totalPrice']; // Общая стоимость заказа
}
```

### Тип данных для оплаты

```
export type TOrderPayment = {
    payment: IOrderItems['payment'];    // Способ оплаты
    address: IOrderItems['address'];    // Адрес доставки
}
```

### Тип данных для контактной информации 

```
export type TOrderContactsInformation = {
    email: IOrderItems['email'];  // Электронная почта
    phone: IOrderItems['phone'];  // Номер телефона
}
```

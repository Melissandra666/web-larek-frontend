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

## Описание проекта

Проект представляет собой интернет-магазин под названием "Web-ларёк", специализирующийся на продаже товаров для веб-разработчиков. Магазин предлагает удобный интерфейс для просмотра каталога товаров, добавления их в корзину и оформления заказов. Пользователи смогут находить различные инструменты и материалы для разработки, такие как книги, лицензии на ПО, шаблоны сайтов и другие полезные ресурсы.


Проект написан на TypeScript и реализован в виде одностраничного приложения (SPA), которое обращается к API для получения данных о товарах и заказах.

## Базовые классы и слои данных, используемые в приложении

### Базовый класс API

Класс Api представляет собой универсальный интерфейс для работы с HTTP-запросами в приложении. Он позволяет отправлять GET- и POST-запросы к серверу, а также поддерживает расширенные HTTP методы, такие как PUT и DELETE. Класс работает с базовым URL, предоставляя возможность конфигурировать запросы через передаваемые параметры. Это упрощает взаимодействие с API, делая код более читаемым и удобным для повторного использования.

#### Поля класса

1. baseUrl: string — базовый URL, к которому будут добавляться конечные точки (URI) для выполнения запросов. Это основной адрес сервера, к которому отправляются запросы.

2. options: RequestInit — параметры, используемые для настройки каждого HTTP-запроса (например, заголовки). По умолчанию задается заголовок 'Content-Type': 'application/json', что указывает на то, что отправляемые и получаемые данные — это JSON.
   
#### Методы, используемые в приложении

1. constructor(baseUrl: string, options: RequestInit = {}) - Конструктор принимает два параметра: базовый URL и дополнительные параметры для конфигурации запросов (опции заголовков). Options.headers — объект, в который можно передать дополнительные заголовки для всех запросов. По умолчанию включен заголовок для JSON данных.

2. handleResponse(response: Response): Promise<object> {} - Вспомогательный метод, который обрабатывает ответы от сервера. Если запрос выполнен успешно (статус ответа ok), метод возвращает распарсенный JSON. В случае ошибки метод вызывает Promise.reject() с текстом ошибки или статусом ответа. Этот метод обеспечивает централизованную обработку ошибок для всех запросов.

3. get(uri: string) {} - Отправляет GET-запрос на указанный URI. Используется для получения данных с сервера. Например, запрос списка товаров или информации о конкретном заказе. Возвращает промис, который будет разрешен с данными из ответа.

4. post(uri: string, data: object, method: ApiPostMethods = 'POST') {} - Отправляет POST, PUT или DELETE запросы (в зависимости от переданного метода). Параметр data — это объект, который отправляется в теле запроса. Поддерживает HTTP методы POST, PUT и DELETE через параметр method (ApiPostMethods). Возвращает промис с результатом запроса.

### Базовый класс EventEmitter

Класс EventEmitter представляет собой реализацию системы событий (event-driven), которая позволяет подписываться на события, их эмитировать (вызывать), а также удалять подписки. Это удобный инструмент для обработки и реагирования на различные действия в приложении, где важно гибко управлять подписчиками и событиями.

#### Поля класса

1. _events: Map<EventName, Set<Subscriber>> - Это основное хранилище для событий и их подписчиков. Оно хранит события в виде ключей (EventName), а в качестве значений используется множество (Set) функций-обработчиков событий (подписчиков).

#### Методы, используемые в приложении

1. on<T extends object>(eventName: EventName, callback: (event: T) => void) - Метод для подписки на событие. Добавляет обработчик события в список подписчиков для указанного события.

2. off(eventName: EventName, callback: Subscriber) - Метод для отписки от события. Удаляет подписчика из списка событий.

3. emit<T extends object>(eventName: string, data?: T) - Метод для эмиссии (вызова) события. Вызывает все функции-обработчики, которые были подписаны на это событие.

4. onAll(callback: (event: EmitterEvent) => void) - Метод для подписки на все события. Каждый раз, когда любое событие эмитируется, этот обработчик будет вызван.

5. offAll() - Метод для удаления всех подписчиков. Очищает все подписки для всех событий.

6. trigger<T extends object>(eventName: string, context?: Partial<T>) - Возвращает функцию, которая при вызове автоматически эмитирует указанное событие с данными. Это полезно для удобной настройки событий, например, в пользовательских интерфейсах.

### Класс Component

Абстрактный класс, служит в качестве базового компонента для работы с DOM.

#### Поля класса

container - контейнер, в который помещается компонент интерфейса.
Конструктор:

В конструкторе принимается в качестве аргумента DOM-элемент контейнера, который он сохраняет в защищенном свойстве.

Методы:

toggleClass(element: HTMLElement, className: string, force?: boolean) - переключить класс.
setText(element: HTMLElement, value: unknown) - установить текстовое содержимое.
setDisabled(element: HTMLElement, state: boolean) - сменить статус блокировки.
setHidden(element: HTMLElement) - метод, позволяющий визуально скрыть элемент.
setVisible(element: HTMLElement) - метод, позволяющий визуально отобразить элемент.
setImage(element: HTMLImageElement, src: string, alt?: string) - установить изображение с алтернативным текстом.
render(data?: Partial<T>): HTMLElement - метод, возвращающий корневой DOM-элемент.

### Класс AppStatus

#### Методы, используемые в приложении

1. on - Метод для подписки на событие. Добавляет обработчик события в список подписчиков для указанного события
2. off - Метод для отписки от события. Удаляет подписчика из списка событий.
3. emit - Метод для эмиссии (вызова) события. Вызывает все функции-обработчики, которые были подписаны на это событие.
4. onAll - Метод для подписки на все события. Каждый раз, когда любое событие эмитируется, этот обработчик будет вызван.
5. offAll - Метод для удаления всех подписчиков. Очищает все подписки для всех событий.
6. trigger - Возвращает функцию, которая при вызове автоматически эмитирует указанное событие с данными. Это полезно для удобной настройки событий, например, в пользовательских интерфейсах.
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

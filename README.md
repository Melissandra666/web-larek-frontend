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

1. container - контейнер, в который помещается компонент интерфейса.

#### Методы, используемые в приложении

1. toggleClass — изменить состояние класса на элементе.

2. setText — задать текстовое содержимое элемента.

3. setDisabled — изменить состояние доступности элемента.

4. setHidden — скрыть элемент визуально.

5. setVisible — сделать элемент видимым.

6. setImage — задать изображение с альтернативным текстом.

7. render — вернуть корневой DOM-элемент.

### Класс AppState

Класс отвечает за управление состоянием каталога продуктов, корзины, заказа и ошибки форм.

#### Методы, используемые в приложении

1. setCardsCatalog — метод добавляет товары в каталог карточек и инициирует событие изменения списка товаров.

2. setPreview — метод устанавливает id выбранного товара в поле preview и инициирует событие обновления выбранной карточки.

3. setOrderField — метод заполняет поля заказа данными, введёнными клиентом, и проверяет их корректность. При успешной проверке генерирует событие готовности заказа: order: ready.

4. validateOrder — метод проверяет корректность данных, введённых клиентом. В случае ошибки инициирует событие ошибки формы: formError: change.

5. getOrderItem — метод возвращает список товаров, добавленных в корзину.

6. getTotal — метод вычисляет общую стоимость товаров в корзине.

7. addItemsToBasket — метод добавляет выбранный товар по его id в массив items заказа и инициирует событие изменения корзины: basket: changed.

8. deleteItemsFromBasket — метод удаляет товар по его id из массива items в заказе и инициирует событие обновления корзины: basket: changed.

9. clearBasket — метод полностью очищает заказ.

### Класс Page

Класс главного экрана приложения и наследуется от Component.

#### Методы, используемые в приложении

1. handleBasketClick - добавляется слушатель на клик по корзине. Сеттеры:

2. set Counter - устанавливает количество товаров в корзине.

3. set Catalog - устанавливает товары в каталог.

4. set Locked - позволяет заблокировать страницу для прокрутки.

### Класс Card

Этот класс реализует карточку товара и наследуется от Component.

#### Методы, используемые в приложении

1. set id и get id позволяют задать и получить идентификатор товара.

2. set title и get title позволяют задать и получить название товара.

3. set image задаёт изображение товара.

4. set price позволяет установить цену товара.

5. set category задаёт категорию товара.

6. set description задаёт описание товара.

7. set basketIndex устанавливает порядковый номер товара в корзине.

### Класс Modal 

Этот класс представляет модальное окно и наследуется от компонента Component.

#### Методы, используемые в приложении

1. set content — сеттер для задания содержимого.

2. open() — метод, который открывает окно.

3. close() — метод, который закрывает окно.

4. render() — метод для отображения элемента.

### Класс Basket

Этот класс представляет корзину товаров и является наследником компонента Component.

#### Методы, используемые в приложении

1. set total — сеттер для задания общей стоимости товаров в корзине.

2. set items — сеттер для установки списка отображаемых товаров в корзине.

### Класс Form

Этот класс отвечает за управление состоянием формы, обработку полей ввода, ошибок и отправку данных на сервер, являясь наследником компонента Component.

#### Методы, используемые в приложении

1. onInputChange — защищённый метод, обрабатывающий изменение данных, вводимых пользователем.

2. set valid — отключает кнопку отправки, если форма заполнена корректно.

3. set errors — добавляет сообщения об ошибках валидации.

4. render — метод для отображения формы.

### Класс Order

Этот класс представляет форму заказа, которая включает выбор метода оплаты и адреса доставки, и наследуется от класса Form.

#### Методы, используемые в приложении

1. set address — сеттер для установки адреса.

2. set payment — сеттер для выбора метода оплаты.

### Класс Contacts

Этот класс представляет форму для ввода контактных данных и наследуется от класса Form.

#### Методы, используемые в приложении

1. set email — сеттер для задания адреса электронной почты.

2. set phone — сеттер для установки номера телефона.

### Класс Success

Этот класс отображает уведомления об успешном завершении заказа и наследуется от компонента Component.

#### Методы, используемые в приложении

1. set total - который устанавливает значение итоговой суммы заказа

## Презентеры

Презентер обрабатывает события, возникающие в процессе взаимодействия пользователя с интерфейсом. Ниже приведены основные события:

1. items:changed - это событие инициируется при обновлении списка продуктов, что позволяет интерфейсу отразить изменения в доступных товарах.

2. modal:openModal -  это событие срабатывает, когда модальное окно открывается, предоставляя пользователю доступ к дополнительной информации или действиям.

3. modal:closeModal - данное событие происходит при закрытии модального окна, что возвращает пользователя к основному интерфейсу.

4. product:add - это событие инициируется, когда пользователь добавляет товар в корзину, что позволяет обновить состояние корзины.

5. product:delete - данное событие возникает при удалении товара из корзины, обеспечивая актуальность списка товаров.

6. basket:changed - событие, которое сигнализирует об изменениях в интерфейсе корзины, позволяя обновить отображаемую информацию о текущих товарах.

7. counter:changed - это событие связано с изменением счетчика товаров в корзине, что помогает пользователю увидеть актуальное количество добавленных товаров.

8. order:changed - событие, возникающее при любых изменениях в заказе, что позволяет интерфейсу отразить новую информацию о текущем состоянии заказа.

9. address:change - это событие инициируется, когда пользователь изменяет адрес, позволяя системе обновить соответствующие данные.

10. contacts:change - данное событие происходит при изменении контактной информации пользователя, что обеспечивает актуальность данных.

11. errors:changed - событие, сигнализирующее о возникновении ошибок в форме, позволяя пользователю увидеть проблемы и исправить их.

12. order:submit - это событие происходит при подтверждении формы оплаты, что запускает процесс обработки заказа.

13. contacts:submit - данное событие инициируется при подтверждении формы с контактными данными, позволяя системе сохранить или обработать введенную информацию.

14. payment:toggle - событие, которое срабатывает при смене способа оплаты, обновляя интерфейс и доступные варианты.

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
    image: string,              // Изображение товара
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
    items: IProductItems[];     // Массив товаров в корзине
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
    image: IProductItems['image'];       // Изображение товара
    price: IProductItems['price'];       // Цена товара
}
```

### Тип данных для карточки продукта

```
export type TProductPopup = {
    category: IProductItems['category'];       // Категория товара
    name: IProductItems['name'];               // Название товара
    description: IProductItems['description']; // Описание товара
    image: IProductItems['image'];             // Изображение товара
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

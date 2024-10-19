import { Model } from './base/model'; // Импорт базовой модели
import {
	IAppState,         // Интерфейс состояния приложения
	IBasketProduct,    // Интерфейс продукта в корзине
	ICatalogProduct,   // Интерфейс продукта в каталоге
	IOrder,            // Интерфейс заказа
	FormErrors         // Интерфейс ошибок формы
} from '../types';     // Импорт интерфейсов
import { ICard } from './Card'; // Импорт интерфейса карточки

// Интерфейс для события изменения каталога
export interface CatalogChangeEvent {
	products: ICatalogProduct[];
}

// Класс состояния приложения, который наследует базовую модель
export class AppState extends Model<IAppState> {
	basket: IBasketProduct[] = []; // Корзина с продуктами
	catalog: ICatalogProduct[]; // Список продуктов каталога
	loading: boolean; // Статус загрузки данных
	order: IOrder = { // Текущий заказ
		payment: '', 
		address: '',
		email: '',
		phone: '',
		total: 0,
		items: [],
	};
	
	preview: string | null; // Превью продукта
	formErrors: FormErrors = {}; // Ошибки формы

	// Метод для добавления продукта в корзину
	addToBasket(item: IBasketProduct) {
		if (item.price !== null && this.basket.indexOf(item) < 0) {
			this.basket.push(item);
			this.emitChanges('counter:changed', this.basket); // Обновляем счетчик корзины
			this.emitChanges('basket:changed', this.basket); // Обновляем содержимое корзины
		}
	}

	// Метод для удаления продукта из корзины
	removeFromBasket(item: IBasketProduct) {
		this.basket = this.basket.filter((it) => it != item);
		this.emitChanges('counter:changed', this.basket); // Обновляем счетчик корзины
		this.emitChanges('basket:changed', this.basket); // Обновляем содержимое корзины
	}

	// Метод для очистки корзины
	clearBasket() {
		this.basket = [];
		this.emitChanges('counter:changed', this.basket); // Обновляем счетчик корзины
		this.emitChanges('basket:changed', this.basket); // Обновляем содержимое корзины
	}

	// Метод для расчета общей суммы заказа
	getTotal() {
		return this.basket.reduce((total, item) => total + item.price, 0);
	}

	// Устанавливаем список продуктов каталога
	setCatalog(items: ICard[]) {
		this.catalog = items;
		this.emitChanges('items:changed', { catalog: this.catalog }); // Сообщаем об изменении каталога
	}

	// Устанавливаем превью для продукта
	setPreview(item: ICard) {
		this.preview = item.id;
		this.emitChanges('preview:changed', item); // Сообщаем об изменении превью
	}

	// Валидация формы заказа
	validateOrderForm() {
		const errors: typeof this.formErrors = {}; // Объект для ошибок

		// Проверка на заполненность полей заказа
		if (!this.order.payment)
			errors.payment = 'Необходимо указать способ оплаты';
		if (!this.order.address)
			errors.address = 'Необходимо указать адрес';

		// Проверка email
		if (!this.order.email)
			errors.email = 'Необходимо указать email';
		else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.order.email))
			errors.email = 'Некорректный формат email';

		// Проверка телефона
		if (!this.order.phone)
			errors.phone = 'Необходимо указать телефон';
		else if (
			!/^(\+7|8)\s?\(?\d{3}\)?\s?\d{3}\s?\d{2}\s?\d{2}$/.test(this.order.phone)
		)
			errors.phone = 'Некорректный формат телефона';

		this.formErrors = errors; // Сохраняем ошибки
		this.events.emit('formErrors:change', this.formErrors); // Отправляем событие об изменении ошибок формы

		// Возвращаем, прошла ли форма валидацию
		return Object.keys(errors).length === 0;
	}

	// Устанавливаем значение поля формы заказа
	setOrderField(field: keyof IOrder, value: string | number) {
		if (field === 'total') this.order[field] = value as number; // Если поле 'total', приводим к числу
		else if (field === 'items') {
			this.order[field].push(value as string); // Добавляем элемент в список товаров
		} else this.order[field] = value as string; // Иначе обновляем значение поля
		
		// Если валидация прошла успешно, отправляем событие о завершении заказа
		if (this.validateOrderForm()) 
			this.events.emit('order:success', this.order);
	}

	// Сброс контактной информации
	contactsReset() {
		this.order.email = '';
		this.order.phone = '';
	}
}

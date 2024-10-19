import { Form } from './common/Form';  // Импортируем базовый класс формы
import { IContactsForm, IDeliveryForm } from '../types';  // Интерфейсы для формы контактов и доставки
import { IEvents } from './base/events';  // Интерфейс событий
import { ensureAllElements } from '../utils/utils';  // Утилита для получения всех элементов

// Класс Order расширяет функциональность базовой формы и включает как поля доставки, так и контактов
export class Order extends Form<IDeliveryForm & IContactsForm> {
	protected _payment: HTMLButtonElement[];  // Массив кнопок выбора способа оплаты

	// Конструктор принимает контейнер формы и объект событий
	constructor(container: HTMLFormElement, events: IEvents) {
		super(container, events);  // Вызываем конструктор базового класса Form

		// Находим все кнопки с классом '.button_alt' в контейнере формы
		this._payment = ensureAllElements<HTMLButtonElement>(
			'.button_alt',
			container
		);

		// Добавляем обработчики событий для каждой кнопки выбора способа оплаты
		this._payment.forEach((button) =>
			button.addEventListener('click', () => this.selected(button.name))  // При клике выбирается способ оплаты
		);
	}

	// Сеттер для установки значения поля адреса
	set address(value: string) {
		// Устанавливаем значение в поле 'address' формы
		(this.container.elements.namedItem('address') as HTMLInputElement).value =
			value;
	}

	// Сеттер для установки значения поля email
	set email(value: string) {
		// Устанавливаем значение в поле 'email' формы
		(this.container.elements.namedItem('email') as HTMLInputElement).value =
			value;
	}

	// Сеттер для установки значения поля phone
	set phone(value: string) {
		// Устанавливаем значение в поле 'phone' формы
		(this.container.elements.namedItem('phone') as HTMLInputElement).value =
			value;
	}

	// Сеттер для активации или деактивации кнопки отправки формы
	set valid(value: boolean) {
		// Если форма валидна, кнопка становится активной, иначе — неактивной
		this._submit.disabled = !value;
	}

	// Метод выбора способа оплаты
	selected(name: string) {
		// Перебираем все кнопки оплаты и добавляем/удаляем класс 'button_alt-active' в зависимости от выбранной
		this._payment.forEach((button) =>
			this.toggleClass(button, 'button_alt-active', button.name === name)
		);
		// Вызываем событие изменения способа оплаты с переданным именем
		this.events.emit('order.payment:change', { name });
	}
}

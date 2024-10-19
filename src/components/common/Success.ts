import { Component } from '../base/Components'; // Импорт базового класса компонента
import { ensureElement } from '../../utils/utils'; // Импорт утилиты для поиска элементов в DOM
import { ISuccess } from '../../types'; // Импорт интерфейса для данных об успешном заказе

// Интерфейс для действий, связанных с успешным завершением заказа
interface ISuccessActions {
	onClick: () => void; // Обработчик события клика
}

// Класс компонента для отображения сообщения об успешном завершении заказа
export class Success extends Component<ISuccess> {
	protected _total: HTMLElement; // Элемент для отображения итоговой суммы
	protected _closeButton: HTMLButtonElement; // Кнопка закрытия

	// Конструктор класса Success
	constructor(container: HTMLElement, protected actions?: ISuccessActions) {
		super(container); // Вызов конструктора родительского класса

		// Инициализация элементов: сумма заказа и кнопка закрытия
		this._total = ensureElement<HTMLElement>(
			'.order-success__description', // Селектор для суммы заказа
			this.container // Контейнер, в котором ищем элемент
		);
		this._closeButton = ensureElement<HTMLButtonElement>(
			'.order-success__close', // Селектор для кнопки закрытия
			this.container
		);

		// Если передано действие onClick, добавляем слушатель на кнопку закрытия
		if (actions?.onClick)
			this._closeButton.addEventListener('click', actions.onClick);
	}

	// Устанавливаем текстовое значение для итоговой суммы заказа
	set total(value: string) {
		this.setText(this._total, value);
	}
}

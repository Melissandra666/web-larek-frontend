// Импорт базового класса Form, вспомогательной функции ensureElement и интерфейса событий
import { Form } from './common/Form';
import { ensureElement } from '../utils/utils';
import { IEvents } from '../components/base/events';

// Интерфейс IOrderDetails описывает структуру данных для заказа (способ оплаты и адрес доставки)
export interface IOrderDetails {
  payment: string;  // Способ оплаты (наличные или карта)
  address: string;  // Адрес доставки
}

// Интерфейс для действий, которые можно привязать к кнопкам формы заказа
interface IOrderActions {
  onClick: (event: MouseEvent) => void;  // Обработчик события клика
}

// Класс Order расширяет базовый класс Form для работы с формой заказа
export class Order extends Form<IOrderDetails> {
  // Кнопки для выбора способа оплаты: карта и наличные
  protected _card: HTMLButtonElement;  // Кнопка выбора оплаты картой
  protected _cash: HTMLButtonElement;  // Кнопка выбора оплаты наличными

  // Конструктор класса принимает контейнер формы, объект событий и действия для обработки событий клика
  constructor(container: HTMLFormElement, events: IEvents, actions?: IOrderActions) {
    super(container, events);  // Вызов конструктора родительского класса Form

    // Инициализация кнопок для выбора способа оплаты с помощью утилиты ensureElement
    this._card = ensureElement<HTMLButtonElement>('button[name="card"]', this.container);  // Поиск кнопки "Карта"
    this._cash = ensureElement<HTMLButtonElement>('button[name="cash"]', this.container);  // Поиск кнопки "Наличные"

    // Устанавливаем активный класс для кнопки "Карта" по умолчанию
    this.toggleClass(this._card, 'button_alt-active');

    // Если передан обработчик клика, добавляем его на обе кнопки
    if (actions?.onClick) {
      this.addButtonClickHandler(actions.onClick);
    }
  }

  // Приватный метод для добавления обработчиков кликов на кнопки выбора оплаты
  private addButtonClickHandler(onClick?: (event: MouseEvent) => void) {
    if (onClick) {
      // Привязываем обработчик к обеим кнопкам: картой и наличными
      this._card.addEventListener('click', onClick);
      this._cash.addEventListener('click', onClick);
    }
  }

  // Сеттер для установки значения поля адреса доставки
  set address(value: string) {
    // Устанавливаем значение поля "address" в форме
    (this.container.elements.namedItem('address') as HTMLInputElement).value = value;
  }

  // Метод для переключения активного состояния кнопок (выбора способа оплаты)
  toggleButtons(toggleOn: HTMLElement) {
    // Активируем одну кнопку и деактивируем другую, основываясь на том, какая была нажата
    this.toggleClass(this._card, 'button_alt-active', toggleOn === this._card);
    this.toggleClass(this._cash, 'button_alt-active', toggleOn === this._cash);
  }
}

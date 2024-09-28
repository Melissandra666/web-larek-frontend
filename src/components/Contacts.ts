// Импорт базового класса Form и интерфейса событий
import { Form } from './common/Form';
import { IEvents } from '../components/base/events';

// Интерфейс для контактной информации, включает email и телефон
export interface IContacts {
  email: string;  // Электронная почта
  phone: string;  // Телефонный номер
}

// Класс Contacts расширяет базовый класс Form и представляет форму для ввода контактной информации
export class Contacts extends Form<IContacts> {
  private _inputPhone: HTMLInputElement;  // Поле для ввода телефона
  private _inputEmail: HTMLInputElement;  // Поле для ввода email

  // Конструктор класса, принимающий контейнер формы и объект событий
  constructor(container: HTMLFormElement, events: IEvents) {
    super(container, events);  // Вызов конструктора родительского класса Form

    // Получение элементов формы по их именам
    this._inputPhone = this.container.elements.namedItem('phone') as HTMLInputElement;  // Инициализация поля телефона
    this._inputEmail = this.container.elements.namedItem('email') as HTMLInputElement;  // Инициализация поля email
  }

  // Геттер для получения значения поля телефона
  get phone(): string {
    return this._inputPhone.value;  // Возвращает текущее значение поля телефона
  }

  // Сеттер для изменения значения поля телефона
  set phone(value: string) {
    this._inputPhone.value = value;  // Устанавливает новое значение для поля телефона
  }

  // Геттер для получения значения поля email
  get email(): string {
    return this._inputEmail.value;  // Возвращает текущее значение поля email
  }

  // Сеттер для изменения значения поля email
  set email(value: string) {
    this._inputEmail.value = value;  // Устанавливает новое значение для поля email
  }
}

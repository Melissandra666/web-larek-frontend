import { Component } from '../base/Components'; // Импорт базового класса компонентов
import { IEvents } from '../base/events'; // Импорт интерфейса событий
import { ensureElement } from '../../utils/utils'; // Импорт утилиты для поиска элементов

// Интерфейс состояния формы
interface IFormState {
  valid: boolean; // Указывает, валидна ли форма
  errors: string[]; // Список ошибок формы
}

// Класс формы, работающий с любым типом данных (T)
export class Form<T> extends Component<IFormState> {
  protected _submit: HTMLButtonElement; // Кнопка отправки формы
  protected _errors: HTMLElement; // Элемент для отображения ошибок

  // Конструктор класса Form
  constructor(protected container: HTMLFormElement, protected events: IEvents) {
    super(container); // Вызов конструктора базового класса

    // Поиск кнопки отправки формы
    this._submit = ensureElement<HTMLButtonElement>(
      'button[type=submit]', // Селектор кнопки отправки
      this.container // Контейнер формы
    );

    // Поиск блока ошибок
    this._errors = ensureElement<HTMLElement>(
      '.form__errors', // Селектор блока ошибок
      this.container // Контейнер формы
    );

    // Добавление обработчика для события ввода данных в форму
    this.container.addEventListener('input', (e: Event) => {
      const target = e.target as HTMLInputElement, // Получаем элемент, вызвавший событие
        field = target.name as keyof T, // Имя поля формы
        value = target.value; // Значение поля формы

      // Вызов метода для обработки изменения ввода
      this.onInputChange(field, value);
    });

    // Добавление обработчика для события отправки формы
    this.container.addEventListener('submit', (e: Event) => {
      e.preventDefault(); // Предотвращаем стандартное поведение формы

      // Генерируем событие отправки формы
      this.events.emit(`${this.container.name}:submit`);
    });
  }

  // Метод обработки изменений ввода в форме
  protected onInputChange(field: keyof T, value: string) {
    // Генерация события изменения значения поля
    this.events.emit(`${this.container.name}.${String(field)}:change`, {
      field, // Поле формы
      value, // Значение поля
    });
  }

  // Установка валидности формы
  set valid(value: boolean) {
    this._submit.disabled = !value; // Отключение кнопки отправки, если форма не валидна
  }

  // Установка ошибок формы
  set errors(value: string) {
    this.setText(this._errors, value); // Установка текста ошибки в соответствующий элемент
  }

  // Метод рендеринга формы с обновленным состоянием
  render(state: Partial<T> & IFormState) {
    const { valid, errors, ...inputs } = state; // Извлекаем валидность, ошибки и поля формы

    // Рендерим базовый компонент с состоянием формы
    super.render({ valid, errors });
    
    // Присваиваем новые значения полям формы
    Object.assign(this, inputs);

    return this.container; // Возвращаем контейнер формы
  }
}

import { Component } from '../base/Components';  // Импортируем базовый класс компонента
import { IEvents } from '../base/events';  // Импортируем интерфейс для работы с событиями
import { ensureElement } from '../../utils/utils';  // Вспомогательная функция для получения элементов DOM

// Определение интерфейса состояния формы
interface IFormState {
    valid: boolean;  // Индикатор валидности формы
    errors: string[];  // Список ошибок валидации
}

// Класс Form для работы с HTML-формами, расширяет базовый компонент
export class Form<T> extends Component<IFormState> {
    protected _submit: HTMLButtonElement;  // Кнопка отправки формы
    protected _errors: HTMLElement;  // Элемент для отображения ошибок

    // Конструктор принимает контейнер формы и события
    constructor(protected container: HTMLFormElement, protected events: IEvents) {
        super(container);  // Инициализация базового компонента

        // Находим кнопку отправки формы и блок для ошибок с помощью ensureElement
        this._submit = ensureElement<HTMLButtonElement>('button[type=submit]', this.container);
        this._errors = ensureElement<HTMLElement>('.form__errors', this.container);

        // Добавляем обработчик события 'input' для отслеживания изменений в полях формы
        this.container.addEventListener('input', (e: Event) => {
            const target = e.target as HTMLInputElement;  // Получаем элемент, на котором произошло событие
            const field = target.name as keyof T;  // Определяем имя поля формы
            const value = target.value;  // Получаем текущее значение поля
            this.onInputChange(field, value);  // Вызываем обработчик изменения значения поля
        });

        // Обработчик события 'submit' для отправки формы
        this.container.addEventListener('submit', (e: Event) => {
            e.preventDefault();  // Отключаем стандартное поведение формы
            this.events.emit(`${this.container.name}:submit`);  // Генерируем событие отправки формы
        });
    }

    // Обработчик изменения значений полей формы
    protected onInputChange(field: keyof T, value: string) {
        // Генерируем событие с обновленным значением поля
        this.events.emit(`${this.container.name}.${String(field)}:change`, {
            field,
            value
        });
    }

    // Метод для обновления валидности формы
    set valid(value: boolean) {
        this.setDisabled(this._submit, !value);  // Отключаем кнопку отправки, если форма невалидна
    }

    // Метод для отображения ошибок валидации
    set errors(value: string) {
        this.setText(this._errors, value);  // Обновляем текст ошибок в элементе
    }

    // Метод рендера для обновления состояния формы
    render(state: Partial<T> & IFormState) {
        const { valid, errors, ...inputs } = state;  // Деструктуризация состояния: валидность, ошибки и данные полей
        super.render({ valid, errors });  // Вызываем родительский метод render для обновления компонента
        Object.assign(this, inputs);  // Обновляем поля формы
        return this.container;  // Возвращаем контейнер формы
    }
}

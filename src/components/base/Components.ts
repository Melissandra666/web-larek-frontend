export abstract class Component<T> {
    // Конструктор принимает HTML-элемент контейнера, где будет рендериться компонент
    protected constructor(protected readonly container: HTMLElement) {}

    // Переключение класса на элементе, опционально с использованием флага для принудительного добавления/удаления
    toggleClass(element: HTMLElement, className: string, force?: boolean) {
        element.classList.toggle(className, force);
    }

    // Устанавливает текстовое содержимое элемента, преобразуя значение в строку
    protected setText(element: HTMLElement, value: unknown) {
        if (element) {
            element.textContent = String(value);
        }
    }

    // Меняет статус элемента (включить/отключить) путем установки или удаления атрибута 'disabled'
    setDisabled(element: HTMLElement, state: boolean) {
        if (element) {
            state ? element.setAttribute('disabled', 'disabled') : element.removeAttribute('disabled');
        }
    }

    // Делает элемент невидимым, скрывая его с помощью CSS-свойства display
    protected setHidden(element: HTMLElement) {
        element.style.display = 'none';
    }

    // Отображает элемент, удаляя ранее установленное CSS-свойство display
    protected setVisible(element: HTMLElement) {
        element.style.removeProperty('display');
    }

    // Устанавливает изображение для HTMLImageElement и задает альтернативный текст, если он указан
    protected setImage(element: HTMLImageElement, src: string, alt?: string) {
        if (element) {
            element.src = src;
            if (alt) {
                element.alt = alt;
            }
        }
    }

    // Рендерит корневой элемент контейнера компонента, применяя переданные данные к текущему экземпляру
    render(data?: Partial<T>): HTMLElement {
        Object.assign(this as object, data ?? {});
        return this.container;
    }
}

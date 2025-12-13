import { Component } from "../../base/Component";
import { ensureElement } from '../../../utils/utils';

export abstract class CardView<T> extends Component<T> {
    protected titleEl: HTMLElement;
    protected priceEl: HTMLElement;

    protected constructor(container: HTMLElement) {
        super(container);
        
        // Ищем элементы внутри контейнера карточки
        this.titleEl = ensureElement<HTMLElement>('.card__title', container);
        this.priceEl = ensureElement<HTMLElement>('.card__price', container);
    }

    set title(value: string) {
        this.titleEl.textContent = value;
    }

    set price(value: number | null) {
        this.priceEl.textContent = value === null ? "Бесценно" : `${value} синапсов`;
    }
}

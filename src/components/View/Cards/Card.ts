import { Component } from "../../base/Component";
import { ensureElement } from '../../../utils/utils';

export abstract class CardView<T> extends Component<T> {
    protected _title: HTMLElement;
    protected _price: HTMLElement;

    protected constructor(container: HTMLElement) {
        super(container);
        
        // Ищем элементы внутри контейнера карточки
        this._title = ensureElement<HTMLElement>('.card__title', container);
        this._price = ensureElement<HTMLElement>('.card__price', container);
    }


    set title(value: string) {
        this._title.textContent = value;
    }

    set price(value: number | null){
        if (value === null) {
            this._price.textContent = "Бесценно";
        } else {
            this._price.textContent = `${value} синапсов`;
        }
    }
}
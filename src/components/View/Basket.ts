import { Component } from "../base/Component";
import { ensureElement } from '../../utils/utils';

export interface IBasketActions {
    onCheckout?: (event: MouseEvent) => void;
}

interface IBasketData {
    items: HTMLElement[];
    total: number;
}

export class BasketView extends Component<IBasketData> {
    protected _list: HTMLUListElement;
    protected _total: HTMLElement;
    protected _button: HTMLButtonElement;

    constructor(container: HTMLElement, actions?: IBasketActions) {
        super(container);
        
        this._list = ensureElement<HTMLUListElement>('.basket__list', container);
        this._total = ensureElement<HTMLElement>('.basket__price', container);
        this._button = ensureElement<HTMLButtonElement>('.basket__button', container);
        this._button.disabled = true;

        if (actions?.onCheckout) {
            this._button.addEventListener('click', actions.onCheckout);
        }

    }

    set items(items: HTMLElement[]) {
        this._list.replaceChildren(...items);
        this._button.disabled = items.length == 0;
    }

    set total(total: number) {
        this._total.textContent = `${total} синапсов`;
    }
}
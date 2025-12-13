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
    protected listEl: HTMLUListElement;
    protected totalEl: HTMLElement;
    protected buttonEl: HTMLButtonElement;

    constructor(container: HTMLElement, actions?: IBasketActions) {
        super(container);
        
        this.listEl = ensureElement<HTMLUListElement>('.basket__list', container);
        this.totalEl = ensureElement<HTMLElement>('.basket__price', container);
        this.buttonEl = ensureElement<HTMLButtonElement>('.basket__button', container);
        this.buttonEl.disabled = true;

        if (actions?.onCheckout) {
            this.buttonEl.addEventListener('click', actions.onCheckout);
        }
    }

    set items(items: HTMLElement[]) {
        this.listEl.replaceChildren(...items);
        this.buttonEl.disabled = items.length === 0;
    }

    set total(total: number) {
        this.totalEl.textContent = `${total} синапсов`;
    }
}

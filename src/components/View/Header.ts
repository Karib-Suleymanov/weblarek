import { Component } from "../base/Component";
import { ensureElement } from "../../utils/utils";

export interface IHeaderActions {
    onBasketClick?: (event: MouseEvent) => void;
}

export class HeaderView extends Component<{ counter: number }> {
    protected counterEl: HTMLElement;
    protected basketBtn: HTMLButtonElement;

    constructor(container: HTMLElement, actions?: IHeaderActions) {
        super(container);
        
        this.counterEl = ensureElement<HTMLElement>('.header__basket-counter', container);
        this.basketBtn = ensureElement<HTMLButtonElement>('.header__basket', container);

        if (actions?.onBasketClick) {
            this.basketBtn.addEventListener('click', actions.onBasketClick);
        }
    }

    set counter(value: number) {
        this.counterEl.textContent = String(value);
    }
}

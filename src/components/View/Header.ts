import { Component } from "../base/Component";
import { ensureElement } from "../../utils/utils";

export interface IHeaderActions {
    onBasketClick?: (event: MouseEvent) => void;
}

export class HeaderView extends Component<{ counter: number }> {
    protected _counter: HTMLElement;
    protected _basket: HTMLButtonElement;

    constructor(container: HTMLElement, actions?: IHeaderActions) {
        super(container);
        
        this._counter = ensureElement<HTMLElement>('.header__basket-counter', container);
        this._basket = ensureElement<HTMLButtonElement>('.header__basket', container);

        if (actions?.onBasketClick) {
            this._basket.addEventListener('click', actions.onBasketClick);
        }
    }

    set counter(value: number) {
        this._counter.textContent = String(value);
    }
}
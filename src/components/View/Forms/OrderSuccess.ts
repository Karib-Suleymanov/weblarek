import { Component } from '../../base/Component';
import { ensureElement } from '../../../utils/utils';

export interface ISuccessActions {
    onClose?: () => void;
}

export class OrderSuccessView extends Component<{ total: number }> {
    protected _description: HTMLElement;
    protected _closeButton: HTMLButtonElement;

    constructor(container: HTMLElement, actions?: ISuccessActions) {
        super(container);
        
        this._description = ensureElement<HTMLElement>('.order-success__description', container);
        this._closeButton = ensureElement<HTMLButtonElement>('.order-success__close', container);

        this._closeButton.addEventListener('click', () => {
            actions?.onClose?.();
        });
    }

    set total(value: number) {
        this._description.textContent = `Списано ${value} синапсов`;
    }
}
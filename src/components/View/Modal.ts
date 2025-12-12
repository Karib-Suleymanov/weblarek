import { Component } from "../base/Component";
import { ensureElement } from "../../utils/utils";

export interface IModalActions {
    onClose?: () => void;
}

export class ModalView extends Component<{ content: HTMLElement }> {
    protected _closeButton: HTMLButtonElement;
    protected _content: HTMLElement;

    constructor(container: HTMLElement, actions?: IModalActions) {
        super(container);
        
        this._closeButton = ensureElement<HTMLButtonElement>('.modal__close', container);
        this._content = ensureElement<HTMLElement>('.modal__content', container);
        this._closeButton.addEventListener('click', () => this.close());

        if (actions?.onClose) {
            this.container.addEventListener('modal:close', actions.onClose);
        }
    }

    set content(value: HTMLElement) {
        this._content.innerHTML = '';
        this._content.append(value);
    }

    open(): void {
        this.container.classList.add('modal_active');
        document.body.style.overflow = 'hidden';
    }

    close(): void {
        this.container.classList.remove('modal_active');
        document.body.style.overflow = ''; 
    }
}
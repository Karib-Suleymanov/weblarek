import { Component } from "../base/Component";
import { ensureElement } from "../../utils/utils";

export interface IModalActions {
    onClose?: () => void;
}

export class ModalView extends Component<{ content: HTMLElement }> {
    protected _closeButton: HTMLButtonElement;
    protected _content: HTMLElement;

    public isOpen = false; // текущее состояние окна
    public currentContent: HTMLElement | null = null; // текущий контент модалки

    constructor(container: HTMLElement, actions?: IModalActions) {
        super(container);
        
        this._closeButton = ensureElement<HTMLButtonElement>('.modal__close', container);
        this._content = ensureElement<HTMLElement>('.modal__content', container);

        this._closeButton.addEventListener('click', () => this.close());

        // Закрытие по клику на оверлей
        this.container.addEventListener('click', (e) => {
            if (e.target === this.container) {
                this.close();
            }
        });

        if (actions?.onClose) {
            this.container.addEventListener('modal:close', actions.onClose);
        }
    }

    set content(value: HTMLElement) {
        this._content.innerHTML = '';
        this._content.append(value);
        this.currentContent = value;
    }

    open(): void {
        this.container.classList.add('modal_active');
        document.body.style.overflow = 'hidden';
        this.isOpen = true;
    }

    close(): void {
        this.container.classList.remove('modal_active');
        document.body.style.overflow = ''; 
        this.isOpen = false;
    }
}

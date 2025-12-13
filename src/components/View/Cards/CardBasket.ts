import { CardView } from './Card';
import { ensureElement } from '../../../utils/utils';

export interface IBasketCardActions {
    onRemove?: (event: MouseEvent) => void;
}

interface ICardBasketData {
    title: string;
    price: number | null;
    index: number;
}

export class CardBasketView extends CardView<ICardBasketData> {
    protected indexEl: HTMLElement;
    protected deleteButton: HTMLButtonElement;

    constructor(container: HTMLElement, actions?: IBasketCardActions) {
        super(container);
        
        this.indexEl = ensureElement<HTMLElement>('.basket__item-index', container);
        this.deleteButton = ensureElement<HTMLButtonElement>('.basket__item-delete', container);

        if (actions?.onRemove) {
            this.deleteButton.addEventListener('click', actions.onRemove);
        }
    }

    set index(value: number) {
        this.indexEl.textContent = String(value);
    }
}

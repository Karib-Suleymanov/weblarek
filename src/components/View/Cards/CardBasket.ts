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
    protected _index: HTMLElement;
    protected _deleteButton: HTMLButtonElement;

    constructor(container: HTMLElement, actions?: IBasketCardActions) {
        super(container);
        
        this._index = ensureElement<HTMLElement>('.basket__item-index', container);
        this._deleteButton = ensureElement<HTMLButtonElement>('.basket__item-delete', container);

        if (actions?.onRemove) {
            this._deleteButton.addEventListener('click', actions.onRemove);
        }
    }

    set index(value: number) {
        this._index.textContent = String(value);
    }
}
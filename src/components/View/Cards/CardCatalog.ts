import { CardView } from './Card';
import { ensureElement } from '../../../utils/utils';
import { categoryMap } from '../../../utils/constants';
import { IProduct } from '../../../types';

export interface ICardActions {
    onClick?: (event: MouseEvent) => void;
}

export class CardCatalogView extends CardView<IProduct> {
    protected imageEl: HTMLImageElement;
    protected categoryEl: HTMLElement;

    constructor(container: HTMLElement, actions?: ICardActions) {
        super(container);
        
        this.imageEl = ensureElement<HTMLImageElement>('.card__image', container);
        this.categoryEl = ensureElement<HTMLElement>('.card__category', container);

        if (actions?.onClick) {
            container.addEventListener('click', actions.onClick);
        }
    }

    set image(value: string) {
        this.setImage(this.imageEl, value);
    }

    set category(value: string) {
        this.categoryEl.textContent = value;

        this.categoryEl.className = 'card__category';
        const categoryClass = categoryMap[value as keyof typeof categoryMap];
        if (categoryClass) {
            this.categoryEl.classList.add(categoryClass);
        }
    }
}

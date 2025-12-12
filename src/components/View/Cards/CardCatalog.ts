import { CardView } from './Card';
import { ensureElement } from '../../../utils/utils';
import { categoryMap } from '../../../utils/constants';
import { IProduct } from '../../../types';

export interface ICardActions {
    onClick?: (event: MouseEvent) => void;
}

export class CardCatalogView extends CardView<IProduct> {
    protected _image: HTMLImageElement;
    protected _category: HTMLElement;

    constructor(container: HTMLElement, actions?: ICardActions) {
        super(container);
        
        this._image = ensureElement<HTMLImageElement>('.card__image', container);
        this._category = ensureElement<HTMLElement>('.card__category', container);

        if (actions?.onClick) {
            container.addEventListener('click', actions.onClick);
        }
    }

    set image(value: string) {
        this.setImage(this._image, value);
    }

    set category(value: string) {
        this._category.textContent = value;
        

        this._category.className = 'card__category';
        const categoryClass = categoryMap[value as keyof typeof categoryMap];
        if (categoryClass) {
            this._category.classList.add(categoryClass);
        }
    }
}
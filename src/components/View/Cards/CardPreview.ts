import { CardView } from './Card';
import { ensureElement } from '../../../utils/utils';
import { categoryMap } from '../../../utils/constants';
import { IProduct } from '../../../types';

type CategoryKey = keyof typeof categoryMap;

export interface ICardPreviewActions {
    onToggle?: () => void;
}

interface ICardPreviewData {
    item: Partial<IProduct>;
    buttonText: string;
}

export class CardPreviewView extends CardView<ICardPreviewData> {
    protected _category: HTMLElement;
    protected _image: HTMLImageElement;
    protected _description: HTMLElement;
    protected _button: HTMLButtonElement;

    constructor(container: HTMLElement, actions?: ICardPreviewActions) {
        super(container);

        this._category = ensureElement<HTMLElement>(".card__category", container);
        this._image = ensureElement<HTMLImageElement>(".card__image", container);
        this._description = ensureElement<HTMLElement>(".card__text", container);
        this._button = ensureElement<HTMLButtonElement>(".card__button", container);

        if (actions?.onToggle) {
            this._button.addEventListener("click", () => {
                actions.onToggle!();
            });
        }
    }

    set category(value: string) {
        this._category.textContent = value;

        for (const key in categoryMap) {
            this._category.classList.toggle(
                categoryMap[key as CategoryKey],
                key == value,
            );
        }
    }

    set image(value: string) {
        console.log(value);
        this.setImage(this._image, value);
    }

    set description(value: string) {
        this._description.textContent = value;
    }

    set item(item: Partial<IProduct>) {
        this.image = item.image!;
        this.category = item.category!;
        this.description = item.description!;
        this.price = item.price!;
        this.title = item.title!;

        if (item.price === null) {
            this._button.disabled = true;
        } else {
            this._button.disabled = false;
        }
    }

    set buttonText(buttonText: string) {
        this._button.textContent = buttonText;
    }
}
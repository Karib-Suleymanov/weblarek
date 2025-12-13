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
    protected categoryEl: HTMLElement;
    protected imageEl: HTMLImageElement;
    protected descriptionEl: HTMLElement;
    protected buttonEl: HTMLButtonElement;

    constructor(container: HTMLElement, actions?: ICardPreviewActions) {
        super(container);

        this.categoryEl = ensureElement<HTMLElement>(".card__category", container);
        this.imageEl = ensureElement<HTMLImageElement>(".card__image", container);
        this.descriptionEl = ensureElement<HTMLElement>(".card__text", container);
        this.buttonEl = ensureElement<HTMLButtonElement>(".card__button", container);

        if (actions?.onToggle) {
            this.buttonEl.addEventListener("click", () => {
                actions.onToggle!();
            });
        }
    }

    set category(value: string) {
        this.categoryEl.textContent = value;

        for (const key in categoryMap) {
            this.categoryEl.classList.toggle(
                categoryMap[key as CategoryKey],
                key == value,
            );
        }
    }

    set image(value: string) {
        this.setImage(this.imageEl, value);
    }

    set description(value: string) {
        this.descriptionEl.textContent = value;
    }

    set item(item: Partial<IProduct>) {
        this.image = item.image!;
        this.category = item.category!;
        this.description = item.description!;
        this.price = item.price!;
        this.title = item.title!;

        this.buttonEl.disabled = item.price === null;
    }

    set buttonText(buttonText: string) {
        this.buttonEl.textContent = buttonText;
    }
}

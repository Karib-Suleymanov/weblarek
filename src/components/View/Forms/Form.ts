import { ensureElement } from '../../../utils/utils';
import { Component } from '../../base/Component';
import { IEvents } from '../../base/Events';

export abstract class Form<T> extends Component<T> {
    protected submitBtn: HTMLButtonElement;
    protected errorsEl: HTMLElement;
    protected events: IEvents;

    constructor(container: HTMLElement, events: IEvents) {
        super(container);
        this.events = events;

        this.submitBtn = ensureElement<HTMLButtonElement>(
            '.modal__actions .button',
            this.container
        );

        this.errorsEl = ensureElement<HTMLElement>(
            '.form__errors',
            this.container
        );

        this.container.addEventListener('submit', (e) => {
            e.preventDefault();
            this.events.emit(`${this.container.getAttribute('name')}:submit`);
        });
    }

    set errors(errors: Partial<Record<string, string>>) {
        const messages = Object.values(errors).filter(Boolean);

        if (messages.length) {
            this.errorsEl.textContent = messages.join('. ');
            this.setSubmitEnabled(false);
        } else {
            this.errorsEl.textContent = '';
            this.setSubmitEnabled(true);
        }
    }

    private setSubmitEnabled(enabled: boolean): void {
        this.submitBtn.toggleAttribute('disabled', !enabled);
    }
}

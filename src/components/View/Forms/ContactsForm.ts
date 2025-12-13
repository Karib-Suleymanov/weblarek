import { ensureElement } from '../../../utils/utils';
import { IEvents } from '../../base/Events';
import { Form } from './Form';

interface IContactsFormData {
    email: string;
    phone: string;
    errors: Partial<Record<'email' | 'phone', string>>;
}

export class ContactsFormView extends Form<IContactsFormData> {
    protected emailInput: HTMLInputElement;
    protected phoneInput: HTMLInputElement;

    constructor(container: HTMLElement, events: IEvents) {
        super(container, events);

        this.emailInput = ensureElement<HTMLInputElement>(
            'input[name="email"]',
            this.container
        );
        this.phoneInput = ensureElement<HTMLInputElement>(
            'input[name="phone"]',
            this.container
        );

        this.emailInput.addEventListener('input', () =>
            this.events.emit('contacts:update', { email: this.emailInput.value })
        );

        this.phoneInput.addEventListener('input', () =>
            this.events.emit('contacts:update', { phone: this.phoneInput.value })
        );

        this.container.addEventListener('submit', (e) => {
            e.preventDefault();
            this.events.emit('contacts:submit');
        });
    }

    set email(value: string) {
        this.emailInput.value = value ?? '';
    }

    set phone(value: string) {
        this.phoneInput.value = value ?? '';
    }

    protected getData(): IContactsFormData {
        return {
            email: this.emailInput.value,
            phone: this.phoneInput.value,
            errors: {}
        };
    }

    setData(data: Partial<IContactsFormData>): void {
        if (data.email !== undefined) this.email = data.email;
        if (data.phone !== undefined) this.phone = data.phone;
    }

    clear(): void {
        this.email = '';
        this.phone = '';
        this.errors = {};
    }
}

import { TPayment } from '../../../types';
import { ensureElement } from '../../../utils/utils';
import { IEvents } from '../../base/Events';
import { TOrderErrors } from '../../Models/User';
import { Form } from './Form';

interface IOrderFormData {
    payment: TPayment;
    address: string;
    errors: TOrderErrors;
}

export class OrderFormView extends Form<IOrderFormData> {
    protected btnCard: HTMLButtonElement;
    protected btnCash: HTMLButtonElement;
    protected addressInput: HTMLInputElement;

    constructor(container: HTMLElement, events: IEvents) {
        super(container, events);

        this.btnCard = ensureElement<HTMLButtonElement>(
            'button[name="card"]',
            this.container,
        );
        this.btnCash = ensureElement<HTMLButtonElement>(
            'button[name="cash"]',
            this.container,
        );
        this.addressInput = ensureElement<HTMLInputElement>(
            'input[name="address"]',
            this.container,
        );

        this.btnCard.addEventListener("click", () =>
            this.events.emit("order:update", { payment: "online" })
        );
        this.btnCash.addEventListener("click", () =>
            this.events.emit("order:update", { payment: "upon-receipt" })
        );
        this.addressInput.addEventListener("input", () =>
            this.events.emit("order:update", { address: this.addressInput.value })
        );

        this.container.addEventListener("submit", (e) => {
            e.preventDefault();
            this.events.emit("order:submit");
        });
    }

    set payment(value: TPayment) {
        this.btnCard.classList.toggle("button_alt-active", value === "online");
        this.btnCash.classList.toggle("button_alt-active", value === "upon-receipt");
    }

    set address(value: string) {
        this.addressInput.value = value ?? "";
    }

    set errors(value: TOrderErrors) {
        super.errors = value;
    }

    protected getData(): IOrderFormData {
        return {
            payment: this.btnCard.classList.contains("button_alt-active") ? "online" : 
                    this.btnCash.classList.contains("button_alt-active") ? "upon-receipt" : "",
            address: this.addressInput.value,
            errors: {}
        };
    }

    setData(data: Partial<IOrderFormData>): void {
        if (data.payment !== undefined) this.payment = data.payment;
        if (data.address !== undefined) this.address = data.address;
    }

    clear(): void {
        this.payment = "" as TPayment;
        this.address = "";
        this.errors = {};
    }
}
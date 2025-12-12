import { IBuyer, TPayment, ValidationErrors } from "../../types";
import { EventEmitter } from "../base/Events";

export class User {
  payment: TPayment = undefined;
  address: string = '';
  email: string = '';
  phone: string = '';

  protected events: EventEmitter;

  constructor(events: EventEmitter) {
    this.events = events;
  }

  setData(data: Partial<IBuyer>): void {
    if (!data || typeof data !== 'object') throw new Error('Не объект');

    const valid: TPayment[] = ['online', 'upon-receipt', undefined];

    if (data.payment !== undefined) {
      if (!valid.includes(data.payment)) throw new Error('Недопустимое значение payment');
      this.payment = data.payment;
      this.events.emit('order:updated');
    }

    if (data.address !== undefined) {
      this.address = data.address;
      this.events.emit('order:updated');
    }

    if (data.email !== undefined) {
      this.email = data.email;
      this.events.emit('contacts:updated');
    }

    if (data.phone !== undefined) {
      this.phone = data.phone;
      this.events.emit('contacts:updated');
    }
  }

  getData(): IBuyer {
    return {
      payment: this.payment,
      address: this.address,
      email: this.email,
      phone: this.phone,
    };
  }

  clear(): void {
    this.payment = undefined;
    this.address = '';
    this.email = '';
    this.phone = '';

    this.events.emit('order:updated');
    this.events.emit('contacts:updated');
  }

  validate(): ValidationErrors {
    const errors: ValidationErrors = {};

    if (!this.payment) errors.payment = 'Не выбран вид оплаты';
    if (!this.address.trim()) errors.address = 'Укажите адрес';
    if (!this.email.trim()) errors.email = 'Укажите email';
    if (!this.phone.trim()) errors.phone = 'Укажите телефон';

    return errors;
  }
}

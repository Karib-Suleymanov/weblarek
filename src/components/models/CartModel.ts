import { IProduct } from "../../types";
import { EventEmitter } from "../base/Events";

export class CartModel {
    items: IProduct[] = [];
    protected events: EventEmitter;

    constructor(events: EventEmitter) {
        this.events = events;
    }

    add(item: IProduct): void {
        if (!item || typeof item !== "object") {
            throw new Error("Не валидный продукт");
        }
        if (!item.id || typeof item.id !== "string") {
            throw new Error("Не валидный ID");
        }
        if (item.price === null) {
            throw new Error("Товар бесценный)");
        }

        if (this.contains(item.id)) {
            console.warn("Товар уже находится в корзине");
            return;
        }

        this.items.push({ ...item });
        this.events.emit("basket:changed");
    }

    remove(id: string): void {
        if (!id || typeof id !== "string") {
            throw new Error("Не валидный ID");
        }

        if (!this.contains(id)) {
            console.warn("Товар не найден в корзине");
            return;
        }

        this.items = this.items.filter(item => item.id !== id);
        this.events.emit("basket:changed");
    }

    clear(): void {
        this.items = [];
        this.events.emit("basket:changed");
    }

    getCount(): number {
        return this.items.length;
    }

    getTotal(): number {
        return this.items.reduce((total, item) => total + (item.price || 0), 0);
    }

    contains(id: string): boolean {
        return this.items.some(item => item.id === id);
    }

    getItems(): IProduct[] {
        return [...this.items];
    }
}

import { IProduct } from "../../types";
import { EventEmitter } from "../base/Events";

export class CatalogProducts {
  items: IProduct[] = [];
  previewItem: IProduct | null = null;

  protected events: EventEmitter;

  constructor(events: EventEmitter, initialItems: IProduct[] = []) {
    this.events = events;

    if (!Array.isArray(initialItems)) {
      throw new Error("Начальные данные должны быть массивом");
    }

    this.items = initialItems;
  }

  setItems(items: IProduct[]): void {
    if (!Array.isArray(items)) {
      throw new Error("Не массив");
    }
    this.items = items;
    this.previewItem = null;
    this.events.emit("catalog:changed");
  }

  getProductById(id: string): IProduct | undefined {
    if (!id || typeof id !== "string") throw new Error("Некорректный ID товара");
    return this.items.find((item) => item.id === id);
  }

  setSelectedItem(item: IProduct | null): void {
    if (item === null) {
      this.previewItem = null;
      this.events.emit("catalog:previewClosed");
      return;
    }
    if (!item || typeof item !== "object") throw new Error("Некорректный объект товара");
    this.previewItem = item;
    this.events.emit("catalog:preview", item);
  }

  getSelectedItem(): IProduct | null {
    return this.previewItem;
  }
}

import { IProduct } from "../../types";

export class ProductsModel {
  private items: IProduct[] = [];
  private selectedItem: IProduct | undefined;

  constructor(initialItems: IProduct[] = []) {
    this.items = initialItems;
  }

  setItems(items: IProduct[]): void {
    if (!Array.isArray(items)) {
      throw new Error("Не массив");
    }
    this.items = items;
    this.selectedItem = undefined;
  }

  getItems(): IProduct[] {
    return this.items;
  }

  /**
   * @param id - уникальный идентификатор товара
   * @returns объект товара или undefined, если не найден
   */
  getProductById(id: string): IProduct | undefined {
    if (!id || typeof id !== "string") {
      throw new Error("ID товара некорректно, либо оно отсутствует");
    }
    return this.items.find((item) => item.id === id);
  }

  getSelectedItem(): IProduct | undefined {
    return this.selectedItem;
  }

  /**
   * @param item - товар для отображения или null для сброса выбора
   */
  setSelectedItem(item: IProduct | null): void {
    if (item === null) {
      this.selectedItem = undefined;
      return;
    }
    if (!item || typeof item !== 'object') {
      throw new Error('Не валидный объект');
    }
    this.selectedItem = item;
  }
}

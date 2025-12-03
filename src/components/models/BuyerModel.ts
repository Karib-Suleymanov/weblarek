import { IBuyer, ValidationErrors } from "../../types";

/**
 * Модель для работы с данными покупателя
 * Обеспечивает хранение, установку, получение и валидацию данных покупателя
 */
export class BuyerModel {
  private data: IBuyer;

  /**
   * Создаёт экземпляр модели покупателя
   * Изначально способ оплаты не выбран (`not_selected`)
   */
  constructor() {
    this.data = {
      payment: 'not_selected',
      email: '',
      phone: '',
      address: ''
    };
  }

  /**
   * Устанавливает данные покупателя (частично или полностью)
   * @param data - объект с полями IBuyer (можно передать не все поля)
   */
  setData(data: Partial<IBuyer>): void {
    if (!data || typeof data !== "object") {
      throw new Error("Не объект");
    }

    // Обновляем только переданные поля (пустые строки тоже допустимы)
    this.data = {
      ...this.data,
      ...data
    };

    // Единственная проверка: payment должен быть валидным, если был передан
    if (data.payment !== undefined) {
      const valid = ['cash', 'card', 'not_selected'];

      if (!valid.includes(data.payment)) {
        throw new Error("Недопустимое значение payment");
      }
    }
  }

  /**
   * Возвращает текущие данные покупателя
   */
  getData(): IBuyer {
    return this.data;
  }

  /**
   * Валидирует данные покупателя
   * Проверяет обязательные поля
   */
  validate(): ValidationErrors {
    const errors: ValidationErrors = {};

    if (this.data.payment === 'not_selected') {
      errors.payment = "Не выбран вид оплаты";
    }

    if (!this.data.address) {
      errors.address = "Укажите адрес";
    }

    if (!this.data.phone) {
      errors.phone = "Укажите телефон";
    }

    if (!this.data.email) {
      errors.email = "Укажите email";
    }

    return errors;
  }

  /**
   * Полная очистка данных покупателя
   */
  clear(): void {
    this.data = {
      payment: 'not_selected',
      email: '',
      phone: '',
      address: ''
    };
  }
}

import { IBuyer, TPayment, ValidationErrors } from "../../types";


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
   * @throws {Error} Если data не является объектом
   */
  setData(data: Partial<IBuyer>): void {
    if (!data || typeof data !== "object") {
      throw new Error("Не объект");
    }

    // Обновляем только переданные поля
    this.data = {
      ...this.data,
      ...data
    };

    // Проверяем обязательные строковые поля (только если они были переданы)
    if (data.email !== undefined && !data.email) {
      throw new Error("Email обязателен для заполнения");
    }
    if (data.phone !== undefined && !data.phone) {
      throw new Error("Телефон обязателен для заполнения");
    }
    if (data.address !== undefined && !data.address) {
      throw new Error("Адрес обязателен для заполнения");
    }

    // Если передано поле payment — проверяем его допустимость
    if (data.payment !== undefined) {
      if (!['cash', 'card', 'not_selected'].includes(data.payment)) {
        throw new Error("Недопустимое значение payment");
      }
    }
  }

  /**
   * Возвращает текущие данные покупателя
   * @returns {IBuyer} Полный объект с данными покупателя
   */
  getData(): IBuyer {
    return this.data;
  }

  /**
   * Валидирует данные покупателя
   * @returns {ValidationErrors} Объект с сообщениями об ошибках (пустой, если всё валидно)
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
   * Очищает все данные покупателя
   * Устанавливает payment в 'not_selected', остальные поля — в пустые строки
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

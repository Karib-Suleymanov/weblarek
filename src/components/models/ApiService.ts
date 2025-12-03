import { IApi, IProduct, IOrderData, IOrderResult, IProductListResponse } from "../../types";

export class ApiService {
  constructor(private api: IApi) {}

  /**
   * Получает каталог товаров с сервера
   * @returns Promise с массивом товаров
   */
  getProductList(): Promise<IProduct[]> {
    const url = "/product";
    console.log("[ApiService] Выполняется GET запрос на:", url);

    return this.api.get<IProductListResponse>(url).then((res) => {
      console.log("[ApiService] Ответ сервера:", res);
      return res.items; // возвращаем корректный массив товаров
    });
  }

  /**
   * Отправляет заказ на сервер
   */
  submitOrder(order: IOrderData): Promise<IOrderResult> {
    const url = "/order";
    console.log("[ApiService] Выполняется POST запрос на:", url);

    return this.api.post<IOrderResult>(url, order);
  }
}

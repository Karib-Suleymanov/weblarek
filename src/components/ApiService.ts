import { IApi, IProduct, IOrder, IOrderResult, IProductListResponse } from "../types";
import { CDN_URL } from "../utils/constants";

export class ApiService {
  constructor(private api: IApi) {}

  /**
   * Получает каталог товаров + подставляет корректные URL картинок
   */
  getProductList(): Promise<IProduct[]> {
    return this.api
      .get<IProductListResponse>("/product")
      .then((response) =>
        response.items.map((item) => ({
          ...item,
          image: CDN_URL + item.image.replace(/\.svg$/i, ".png"),
        }))
      );
  }

  /**
   * Отправляет заказ на сервер
   */
  submitOrder(order: IOrder): Promise<IOrderResult> {
    return this.api.post<IOrderResult>("/order", order);
  }
}

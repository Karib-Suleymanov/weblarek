// Методы POST для API
export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

// API
export interface IApi {
  get<T extends object>(uri: string): Promise<T>;
  post<T extends object>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}

// Товар
export interface IProduct {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
}

// Список товаров с сервера
export interface IProductListResponse {
  total: number;
  items: IProduct[];
}

// Способ оплаты
export type TPayment = 'online' | 'upon-receipt' | undefined;

// Покупатель
export interface IBuyer {
  payment?: TPayment;
  email: string;
  phone: string;
  address: string;
}

// Заказ
export interface IOrder extends IBuyer {
  items: string[];
  total: number;
}

// Результат заказа
export interface IOrderResult {
  id: string;
  total: number;
}

// Валидация
export type ValidationErrors = Partial<Record<keyof IBuyer, string>>;

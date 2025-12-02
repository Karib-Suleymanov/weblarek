import "./scss/styles.scss";
import { ProductsModel } from "./components/models/ProductsModel";
import { CartModel } from "./components/models/CartModel";
import { BuyerModel } from "./components/models/BuyerModel";
import { apiProducts } from "./utils/data";
import { ApiService } from "./components/models/ApiService";
import { Api } from "./components/base/Api";
import { API_URL } from "./utils/constants";

// === Инициализация моделей ===
const productsModel = new ProductsModel();
const cartModel = new CartModel();
const buyerModel = new BuyerModel();

// === Тестирование ProductsModel ===
try {
  // Заполняем товары из локального датасета
  if (apiProducts.items.length > 0) {
    productsModel.setItems(apiProducts.items);
    console.log("[ProductsModel] Массив товаров из каталога:", productsModel.getItems());
    console.log("[ProductsModel] Количество товаров:", productsModel.getItems().length);

    // Тестируем getProductById
    const firstProduct = apiProducts.items[0];
    const testProduct = productsModel.getProductById(firstProduct.id);
    console.log("[ProductsModel] Товар по ID:", testProduct);

    // Выбираем товар
    productsModel.setSelectedItem(firstProduct);
    console.log("[ProductsModel] Выбранный товар:", productsModel.getSelectedItem());
  } else {
    console.warn("[ProductsModel] Нет товаров в apiProducts.items");
  }
} catch (error) {
  console.error("[ProductsModel] Ошибка при работе с товарами:", error);
}

// === Тестирование CartModel ===
try {
  const products = productsModel.getItems();
  if (products.length >= 2) {
    cartModel.addItem(products[0]);
    cartModel.addItem(products[1]);
    console.log("[CartModel] Товары в корзине:", cartModel.getItems());
    console.log("[CartModel] Количество товаров в корзине:", cartModel.getTotalCount());
    console.log("[CartModel] Общая стоимость корзины:", cartModel.getTotalPrice());
    console.log("[CartModel] Товар 1 в корзине?", cartModel.contains(products[0].id));

    cartModel.removeItem(products[0].id);
    console.log("[CartModel] После удаления - товары:", cartModel.getItems());
    console.log("[CartModel] После удаления - количество:", cartModel.getTotalCount());
  } else {
    console.warn("[CartModel] Недостаточно товаров для тестирования корзины");
  }
} catch (error) {
  console.error("[CartModel] Ошибка при работе с корзиной:", error);
}

// === Тестирование BuyerModel ===
try {
  // Частичное заполнение (если модель поддерживает)
  buyerModel.setData({
    email: "test@mail.ru",
    payment: "card",
    address: "Нижний Новгород",
    phone: "+79999999999"
  });
  console.log("[BuyerModel] Данные покупателя после заполнения:", buyerModel.getData());

  // Валидация
  const validationErrors = buyerModel.validate();
  if (Object.keys(validationErrors).length === 0) {
    console.log("[BuyerModel] Валидация пройдена успешно");
  } else {
    console.log("[BuyerModel] Ошибки валидации:", validationErrors);
  }

  // Очистка
  buyerModel.clear();
  console.log("[BuyerModel] После очистки:", buyerModel.getData());
} catch (error) {
  console.error("[BuyerModel] Ошибка при работе с данными покупателя:", error);
}

// === Работа с API ===
try {
  const api = new Api(API_URL);
  const apiService = new ApiService(api);

  apiService
    .getProductList()
    .then((products) => {
      console.log("[API] Товары с сервера:", products);

      productsModel.setItems(products);
      console.log("[ProductsModel] Товары в модели после сервера:", productsModel.getItems());
    })
    .catch((error) => {
      console.error("[API] Ошибка получения товаров:", error);
      // Здесь можно добавить fallback: показать локальные товары или сообщение пользователю
    });
} catch (error) {
  console.error("[API] Ошибка инициализации API:", error);
}
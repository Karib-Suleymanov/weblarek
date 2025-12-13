import './scss/styles.scss';

import { EventEmitter } from './components/base/Events';
import { Api } from './components/base/Api';
import { API_URL } from './utils/constants';
import { ApiService } from './components/ApiService';

import { CatalogProducts } from './components/Models/ProductsModel';
import { CartModel } from './components/Models/CartModel'; 
import { User } from './components/Models/User';

import { GalleryView } from './components/View/Gallery';
import { CardCatalogView } from './components/View/Cards/CardCatalog';
import { CardPreviewView } from './components/View/Cards/CardPreview';
import { CardBasketView } from './components/View/Cards/CardBasket';
import { BasketView } from './components/View/Basket';
import { HeaderView } from './components/View/Header';
import { ModalView } from './components/View/Modal';
import { OrderFormView } from './components/View/Forms/OrderForm';
import { ContactsFormView } from './components/View/Forms/ContactsForm';
import { OrderSuccessView } from './components/View/Forms/OrderSuccess';

import { ensureElement, cloneTemplate } from './utils/utils';
import { IProduct, IBuyer, IOrder, IOrderResult } from './types';
import { apiProducts } from './utils/data';

export const events = new EventEmitter();

// === Модели ===
const catalog = new CatalogProducts(events);
const basket = new CartModel(events);
const user = new User(events);
const apiService = new ApiService(new Api(API_URL));

// === Шаблоны ===
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>("#card-catalog");
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>("#card-preview");
const basketTemplate = ensureElement<HTMLTemplateElement>("#basket");
const basketItemTemplate = ensureElement<HTMLTemplateElement>("#card-basket");
const orderTemplate = ensureElement<HTMLTemplateElement>("#order");
const contactsTemplate = ensureElement<HTMLTemplateElement>("#contacts");
const successTemplate = ensureElement<HTMLTemplateElement>("#success");

// === Статичные компоненты (создаём один раз) ===
const modalView = new ModalView(ensureElement<HTMLElement>("#modal-container"), { onClose: () => events.emit("modal:close") });
const basketView = new BasketView(cloneTemplate(basketTemplate), { onCheckout: () => events.emit("basket:checkout") });
const headerView = new HeaderView(ensureElement<HTMLElement>(".header"), { onBasketClick: () => events.emit("basket:open") });
const galleryView = new GalleryView(ensureElement<HTMLElement>(".gallery"), events);
const orderFormView = new OrderFormView(cloneTemplate(orderTemplate), events);
const contactsFormView = new ContactsFormView(cloneTemplate(contactsTemplate), events);
const orderSuccessView = new OrderSuccessView(cloneTemplate(successTemplate), { onClose: () => modalView.close() });

// === Инициализация каталога ===
apiService.getProductList()
    .then(products => catalog.setItems(products))
    .catch(() => {
        console.warn("[API] Используем локальные товары как fallback");
        catalog.setItems(apiProducts.items);
    });

// === Events ===

// Отображение каталога
events.on("catalog:changed", () => {
    const cards = catalog.items.map(item => {
        const card = new CardCatalogView(cloneTemplate(cardCatalogTemplate), {
            onClick: () => events.emit("card:select", item),
        });
        return card.render(item);
    });
    galleryView.render({ catalog: cards });
});

// Превью товара
events.on("catalog:preview", (item: IProduct) => {
    const inBasket = basket.contains(item.id);
    const buttonText = item.price === null ? "Недоступно" : inBasket ? "Удалить из корзины" : "В корзину";

    const cardPreviewView = new CardPreviewView(cloneTemplate(cardPreviewTemplate), {
        onToggle: () => {
            events.emit("card:buy", item);
            modalView.close();
        },
    });

    modalView.content = cardPreviewView.render({ item, buttonText });
    modalView.open();
});

// Обновление корзины
events.on("basket:changed", () => {
    headerView.render({ counter: basket.getCount() });

    const items = basket.getItems().map((product, index) => {
        const card = new CardBasketView(cloneTemplate(basketItemTemplate), {
            onRemove: () => events.emit("basket:remove", product),
        });
        return card.render({ title: product.title, price: product.price ?? null, index: index + 1 });
    });

    basketView.render({ items, total: basket.getTotal() });

    // Если модалка открыта и показывается корзина, обновляем содержимое
    if (modalView.isOpen && modalView.currentContent === basketView.render()) {
    modalView.content = basketView.render();
    }

});

// Обновление формы заказа
events.on("order:updated", () => {
    const errors = user.validate();
    orderFormView.render({
        payment: user.payment,
        errors: { payment: errors.payment, address: errors.address },
    });
});

// Обновление формы контактов
events.on("contacts:updated", () => {
    const errors = user.validate();
    contactsFormView.render({
        errors: { email: errors.email, phone: errors.phone },
    });
});

// События выбора и покупки товара
events.on("card:select", (item: IProduct) => catalog.setSelectedItem(item));
events.on("card:buy", (item: IProduct) => {
    if (basket.contains(item.id)) basket.remove(item.id);
    else basket.add(item);
});
events.on("basket:remove", (item: IProduct) => basket.remove(item.id));
events.on("basket:open", () => {
    modalView.content = basketView.render();
    modalView.open();
});

// Оформление заказа
events.on("basket:checkout", () => {
    const errors = user.validate();
    modalView.content = orderFormView.render({
        payment: user.payment,
        address: user.address,
        errors: { payment: errors.payment, address: errors.address },
    });
    modalView.open();
});

// Подтверждение заказа (контакты)
events.on("order:submit", () => {
    const errors = user.validate();
    modalView.content = contactsFormView.render({
        email: user.email,
        phone: user.phone,
        errors: { email: errors.email, phone: errors.phone },
    });
    modalView.open();
});

// Отправка данных контактов → submit заказа
events.on("contacts:submit", () => {
    const order: IOrder = {
        payment: user.payment!,
        address: user.address,
        email: user.email,
        phone: user.phone,
        total: basket.getTotal(),
        items: basket.getItems().map(i => i.id),
    };

    apiService.submitOrder(order)
        .then((result: IOrderResult) => {
            // Используем уже созданный экземпляр
            orderSuccessView.total = result.total;
            modalView.content = orderSuccessView.render();

            basket.clear();
            user.clear();
        })
        .catch(() => console.error("Не удалось оформить заказ"));
});

// Обновление моделей при изменении форм
events.on("order:update", (data: IBuyer) => user.setData(data));
events.on("contacts:update", (data: IBuyer) => user.setData(data));

// Закрытие модального окна
events.on("modal:close", () => modalView.close());

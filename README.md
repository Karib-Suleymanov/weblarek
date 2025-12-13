# Проектная работа «Веб-ларёк"

Стек: **HTML, SCSS, TypeScript, Vite**

---

## Структура проекта

* `src/` — исходные файлы проекта
* `src/components/` — компоненты приложения
* `src/components/base/` — базовые классы
* `src/models/` — модели данных
* `src/utils/` — утилиты и константы
* `src/scss/` — стили

---

## Важные файлы

* `index.html` — HTML-файл главной страницы
* `src/main.ts` — точка входа приложения
* `src/types/index.ts` — типы данных
* `src/scss/styles.scss` — корневой файл стилей
* `src/utils/constants.ts` — константы
* `src/utils/utils.ts` — утилитарные функции

---

## Установка и запуск

```bash
npm install
npm run dev
```

или

```bash
yarn
yarn dev
```

---

## Сборка проекта

```bash
npm run build
```

или

```bash
yarn build
```

---

# Интернет-магазин «Web-Larёk»

«Web-Larёk» — интернет-магазин товаров для веб‑разработчиков. Пользователь может просматривать каталог, добавлять товары в корзину, оформлять заказ и отправлять его на сервер.

---

## Архитектура приложения

Приложение построено по архитектурному паттерну **MVP (Model–View–Presenter)**.

### Model

Отвечает за хранение и обработку данных.

### View

Отвечает за отображение интерфейса и генерацию пользовательских событий.

### Presenter

Содержит бизнес-логику приложения и связывает модели с представлениями через события.

Взаимодействие между слоями реализовано с помощью событийного брокера (`EventEmitter`).

---

## Базовый код

### `Component<T>`

**Назначение:** базовый класс для всех View-компонентов.

**Поля:**

* `container: HTMLElement` — корневой DOM-элемент компонента

**Методы:**

* `render(data?: Partial<T>): HTMLElement` — применяет переданные данные и возвращает DOM-элемент
* `setImage(element: HTMLImageElement, src: string, alt?: string): void` — утилита для установки изображения

---

### `Api`

**Назначение:** базовый класс для работы с HTTP-запросами.

**Поля:**

* `baseUrl: string` — базовый URL сервера
* `options: RequestInit` — параметры запросов

**Методы:**

* `get(uri: string): Promise<object>` — GET-запрос
* `post(uri: string, data: object, method?: ApiPostMethods): Promise<object>` — POST / PUT запрос
* `handleResponse(response: Response): Promise<object>` — обработка ответа сервера

---

### `EventEmitter`

**Назначение:** брокер событий, реализующий паттерн «Наблюдатель».

**Поля:**

* `_events: Map<string | RegExp, Set<Function>>` — коллекция подписок

**Методы:**

* `on(event, callback)` — подписка на событие
* `emit(event, data?)` — генерация события
* `trigger(event, context?)` — генератор обработчика события

---

## Типы данных

### `IProduct`

```ts
interface IProduct {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
}
```

### `TPayment`

```ts
type TPayment = 'card' | 'cash';
```

### `IBuyer`

```ts
interface IBuyer {
  payment: TPayment;
  email: string;
  phone: string;
  address: string;
}
```

---

## Модели данных

### `CatalogProducts`

**Назначение:** управление каталогом товаров.

**Поля:**

* `_items: IProduct[]` — список товаров
* `_previewItem: IProduct | null` — выбранный товар

**Методы:**

* `setItems(items: IProduct[]): void`
* `getItems(): IProduct[]`
* `getProduct(id: string): IProduct | undefined`
* `setPreviewItem(item: IProduct): void`
* `getPreviewItem(): IProduct | null`

---

### `BasketProducts`

**Назначение:** управление корзиной.

**Поля:**

* `_items: IProduct[]` — товары в корзине

**Методы:**

* `getItems(): IProduct[]`
* `addItem(item: IProduct): void`
* `removeItem(item: IProduct): void`
* `clearCart(): void`
* `getTotalPrice(): number`
* `getItemsCount(): number`
* `checkProductInCart(id: string): boolean`

---

### `User`

**Назначение:** хранение и валидация данных покупателя.

**Поля:**

* `_payment: TPayment`
* `_email: string`
* `_phone: string`
* `_address: string`

**Методы:**

* `setData(data: Partial<IBuyer>): void`
* `getData(): IBuyer`
* `clearData(): void`
* `validate(): Record<string, string>`

---

## Компоненты View

### `BasketView`

**Назначение:** отображение корзины и итоговой суммы заказа.

**Поля:**

* `listEl: HTMLUListElement` — список товаров
* `totalEl: HTMLElement` — итоговая стоимость
* `buttonEl: HTMLButtonElement` — кнопка оформления заказа

**Сеттеры:**

* `items: HTMLElement[]`
* `total: number`

---

### `GalleryView`

**Назначение:** отображение каталога товаров.

**Поля:**

* `events: IEvents` — брокер событий

**Сеттеры:**

* `catalog: HTMLElement[]`

---

### `HeaderView`

**Назначение:** отображение шапки сайта и счётчика корзины.

**Поля:**

* `counterEl: HTMLElement`
* `basketBtn: HTMLButtonElement`

**Сеттеры:**

* `counter: number`

---

### `ModalView`

**Назначение:** универсальное модальное окно.

**Поля:**

* `_closeButton: HTMLButtonElement`
* `_content: HTMLElement`
* `isOpen: boolean`
* `currentContent: HTMLElement | null`

**Методы:**

* `open(): void`
* `close(): void`
* `content: HTMLElement`

---

### Формы заказа

* `OrderFormView` — выбор способа оплаты и адреса доставки
* `ContactsFormView` — ввод email и телефона

---

### Дополнительные компоненты

* `CardCatalogView` — карточка товара в каталоге
* `CardPreviewView` — карточка товара в модальном окне
* `CardBasketView` — товар в корзине
* `OrderSuccessView` — сообщение об успешном заказе

---

## Presenter и принцип работы с событиями

### Presenter

**Назначение:** управляет бизнес-логикой приложения, связывает модели и View. Presenter не содержит прямой визуальной логики — он реагирует на события, изменяет данные моделей и инициирует обновление представлений.

**Функции Presenter:**

* Подписка на события от компонентов View (клики, ввод данных)
* Вызов методов моделей для изменения данных
* Генерация событий для обновления View после изменений моделей

### Принцип работы с событиями

1. **Подписка на события** — компоненты View и модели используют `EventEmitter.on` для подписки на определённые события.
2. **Генерация событий** — при взаимодействии пользователя или изменении модели вызывается `EventEmitter.emit`, уведомляя всех подписчиков.
3. **Обработка событий Presenter-ом** — Presenter подписан на события, реагирует на них, обновляет модели и View через сеттеры или методы `render`.
4. **Централизованная коммуникация** — все события проходят через `EventEmitter`, что позволяет слоям быть слабо связанными и легко расширяемыми.

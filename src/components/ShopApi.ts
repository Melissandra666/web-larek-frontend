import { IOrder, IOrderResult, IProductItem } from "../types";
import { Api, ApiListResponse } from './base/api';

// Интерфейс для API магазина
export interface IShopApi {
  // Метод для получения списка товаров
  getProductItems: () => Promise<IProductItem[]>;
  
  // Метод для отправки заказа
  order: (order: IOrder) => Promise<IOrderResult>;
}

// Класс, реализующий API магазина
export class ShopApi extends Api implements IShopApi {
  readonly cdn: string;  // Базовый URL для CDN

  // Конструктор, принимающий URL для CDN и базовый URL API
  constructor(cdn: string, baseUrl: string, options?: RequestInit) {
    super(baseUrl, options);  // Инициализация базового API с URL и опциями
    this.cdn = cdn;  // Присваиваем CDN URL
  }

  // Метод для получения списка товаров
  getProductItems(): Promise<IProductItem[]> {
    return this.get('/product')  // Делаем GET-запрос к /product
      .then((data: ApiListResponse<IProductItem>) => 
        // Преобразуем результат: добавляем CDN URL к изображениям товаров
        data.items.map((item) => ({
          ...item,  // Оставляем остальные данные без изменений
          image: this.cdn + item.image  // Добавляем CDN URL к пути изображения
        }))
      );
  }

  // Метод для отправки заказа
  order(order: IOrder): Promise<IOrderResult> {
    return this.post(`/order`, order)  // Делаем POST-запрос с данными заказа
      .then((data: IOrderResult) => data);  // Возвращаем результат с сервера
  }
}

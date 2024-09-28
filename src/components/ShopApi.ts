// Импортируем базовый класс API и типы данных, используемые в классе ShopAPI
import { Api, ApiListResponse } from "./base/api";
import { IProduct, IOrder, IOrderSuccess, IShopAPI } from "../types/index";

// Класс ShopAPI расширяет функционал базового класса API и реализует интерфейс IShopAPI
export class ShopAPI extends Api implements IShopAPI {
	readonly cdn: string;  // Переменная для хранения адреса CDN (контентно-распределённой сети)

	// Конструктор принимает базовый URL для API, URL для CDN и дополнительные опции для запросов
	constructor(baseUrl: string, cdn: string, options?: RequestInit) {
		super(baseUrl, options);  // Вызов конструктора родительского класса Api с передачей базового URL и опций
		this.cdn = cdn;  // Сохранение URL CDN в переменную cdn
	}

	// Метод для получения списка продуктов с API
	async getProductList(): Promise<IProduct[]> {
		// Делаем GET-запрос к эндпоинту '/product', получаем список продуктов
		return this.get('/product').then((data: ApiListResponse<IProduct>) =>
			// Модифицируем каждый элемент списка, добавляя к ссылке на изображение адрес CDN
			data.items.map((item) => ({
				...item,
				image: this.cdn + item.image  // Объединяем URL CDN и путь к изображению
			}))
		);
	}

	// Метод для получения информации о конкретном продукте по его ID
	async getProduct(id: string): Promise<IProduct> {
		// Делаем GET-запрос к эндпоинту с ID продукта и приводим ответ к типу IProduct
		return (await this.get(`/product/${id}`)) as IProduct;
	}

	// Метод для создания заказа
	async createOrder(order: IOrder): Promise<IOrderSuccess> {
		// Делаем POST-запрос с данными заказа к эндпоинту '/order' и возвращаем результат как IOrderSuccess
		return (await this.post('/order', order)) as IOrderSuccess;
	}
}

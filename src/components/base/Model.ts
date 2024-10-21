/**
 * Тип для описания ответа API при запросе списка элементов.
 * 
 * @typeParam Type - Тип элементов в списке
 * @property total - Общее количество элементов
 * @property items - Массив элементов указанного типа
 */
export type ApiListResponse<Type> = {
  total: number;
  items: Type[];
};

/**
 * Тип для методов API, которые изменяют данные на сервере (POST, PUT, DELETE).
 */
export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

/**
 * Класс для работы с API.
 * Предоставляет методы для выполнения GET и POST запросов к серверу.
 */
export class Api {
  // Базовый URL для всех запросов
  readonly baseUrl: string;
  // Опции для каждого запроса, включая заголовки
  protected options: RequestInit;

  /**
   * Конструктор для инициализации базового URL и опций запроса (например, заголовков).
   * 
   * @param baseUrl - Базовый URL API, к которому будут отправляться запросы
   * @param options - Дополнительные опции для запросов (например, заголовки), по умолчанию пустой объект
   */
  constructor(baseUrl: string, options: RequestInit = {}) {
    this.baseUrl = baseUrl;
    this.options = {
      // Устанавливаем заголовок по умолчанию как JSON
      headers: {
        'Content-Type': 'application/json',
        // Объединяем пользовательские заголовки с дефолтными, если они есть
        ...(options.headers as object ?? {}),
      },
    };
  }

  /**
   * Обрабатывает ответ от сервера, проверяя статус.
   * Если запрос успешен, возвращает данные в формате JSON.
   * Если запрос не успешен, возвращает ошибку или статус ответа.
   * 
   * @param response - Ответ от сервера
   * @returns Промис с результатом или ошибкой
   */
  protected handleResponse(response: Response): Promise<object> {
    if (response.ok) return response.json(); // Успешный ответ
    else
      return response.json().then((data) =>
        Promise.reject(data.error ?? response.statusText) // Обрабатываем ошибку
      );
  }

  /**
   * Выполняет GET-запрос по указанному URI.
   * 
   * @param uri - Относительный путь для запроса
   * @returns Промис с данными ответа от API
   */
  get(uri: string) {
    return fetch(this.baseUrl + uri, {
      ...this.options,
      method: 'GET', // Используем метод GET
    }).then(this.handleResponse); // Обрабатываем ответ с помощью handleResponse
  }

  /**
   * Выполняет POST, PUT или DELETE запрос с передачей данных.
   * 
   * @param uri - Относительный путь для запроса
   * @param data - Данные, отправляемые на сервер
   * @param method - HTTP метод, по умолчанию POST
   * @returns Промис с данными ответа от API
   */
  post(uri: string, data: object, method: ApiPostMethods = 'POST') {
    return fetch(this.baseUrl + uri, {
      ...this.options,
      method, // Метод запроса (POST, PUT или DELETE)
      body: JSON.stringify(data), // Данные в формате JSON
    }).then(this.handleResponse); // Обрабатываем ответ с помощью handleResponse
  }
}

import axios from "axios";

export class BaseRequest {
  static handleError = (error: any): Promise<any> => {
    return Promise.reject(error);
  };

  protected async post(url: string, config?: any): Promise<any> {
    try {
      const response = await axios.post(url, config);

      if (response.status === 401) {
        console.error("Необходима авторизация");
      } else if (response.status === 204) {
        console.error("Ошибка 204");
      } else if (response.status === 404) {
        console.error("Ошибка 404");
      }
      return response;
    } catch (error) {
      console.error("Необработанная ошибка");
      throw error;
    }
  }

  protected async get(url: string, config?: any): Promise<any> {
    try {
      const response = await axios.get(url, config);

      if (response.status === 401) {
        console.error("Необходима авторизация");
      } else if (response.status === 204) {
        console.error("Ошибка 204");
      } else if (response.status === 404) {
        console.error("Ошибка 404");
      }
      return response;
    } catch (error) {
      console.error("Необработанная ошибка");
      throw error;
    }
  }
  protected async delete(url: string): Promise<any> {
    try {
      const response = await axios.delete(url);

      if (response.status === 401) {
        console.error("Необходима авторизация");
      } else if (response.status === 204) {
        console.error("Ошибка 204");
      } else if (response.status === 404) {
        console.error("Ошибка 404");
      }
      return response;
    } catch (error) {
      console.error("Необработанная ошибка");
      throw error;
    }
  }
  protected async patch(url: string, config?: any): Promise<any> {
    try {
      const response = await axios.patch(url, config);

      if (response.status === 401) {
        console.error("Необходима авторизация");
      } else if (response.status === 204) {
        console.error("Ошибка 204");
      } else if (response.status === 404) {
        console.error("Ошибка 404");
      }
      return response;
    } catch (error) {
      console.error("Необработанная ошибка");
      throw error;
    }
  }
}

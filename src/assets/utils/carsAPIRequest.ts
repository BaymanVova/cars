import { BaseRequest } from "./baseRequest";
import { CarInfo } from "../../store/reducers/car-reducers";
import { APIResponse } from "./APIResponse";

export class CarsAPIRequest extends BaseRequest {
  constructor() {
    super();
    this.getAll = this.getAll.bind(this);
  }

  getAll(): Promise<CarInfo[]> {
    return this.get("https://caronline-f2f9e.firebaseio.com/cars.json")
      .then((response: any) => {
        let temp: CarInfo[] = [];
        for (let key in response.data) {
          const car: CarInfo = {
            id: key,
            ...response.data[key]
          };
          temp.push(car);
        }
        return temp;
      })
      .catch(BaseRequest.handleError);
  }
  add(car: CarInfo): Promise<any> {
    return this.post("https://caronline-f2f9e.firebaseio.com/cars.json", car)
      .then((response: any) => {
        console.log(response);
        let result: APIResponse;
        if (response?.status === 200) {
          result = { result: true };
        } else {
          throw "Ошибка при добавлении товара";
        }
        return result;
      })
      .catch(BaseRequest.handleError);
  }
}

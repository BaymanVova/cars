import { BaseRequest } from "./baseRequest";
import { CarInfo } from "../../store/reducers/car-reducers";

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
          temp.push(response.data[key]);
        }
        return temp;
      })
      .catch(BaseRequest.handleError);
  }
}

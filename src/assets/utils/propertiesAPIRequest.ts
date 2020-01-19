import { BaseRequest } from "./baseRequest";
import { Property } from "../../store/reducers/car-reducers";

export class PropertiesAPIRequest extends BaseRequest {
  constructor() {
    super();
    this.getAll = this.getAll.bind(this);
  }

  getAll(): Promise<Property[]> {
    return this.get("https://caronline-f2f9e.firebaseio.com/properties.json")
      .then((response: any) => {
        let temp: Property[] = [];
        for (let key in response.data) {
          temp.push(response.data[key]);
        }
        return temp;
      })
      .catch(BaseRequest.handleError);
  }
}

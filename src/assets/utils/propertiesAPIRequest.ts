import { BaseRequest } from "./baseRequest";
import { Property } from "../../store/reducers/car-reducers";
import { APIResponse } from "./APIResponse";
import axios from "axios";

export interface newProperty {
  nameProperty: string;
  typeProperty: string;
}

export class PropertiesAPIRequest extends BaseRequest {
  constructor() {
    super();
    this.getAll = this.getAll.bind(this);
    this.add = this.add.bind(this);
    this.delete = this.delete.bind(this);
  }

  getAll(): Promise<Property[]> {
    return this.get("https://caronline-f2f9e.firebaseio.com/properties.json")
      .then((response: any) => {
        let temp: Property[] = [];
        for (let key in response.data) {
          const property: Property = {
            idProperty: key,
            ...response.data[key]
          };
          temp.push(property);
        }
        return temp;
      })
      .catch(BaseRequest.handleError);
  }

  add(property: newProperty): Promise<any> {
    return this.post(
      "https://caronline-f2f9e.firebaseio.com/properties.json",
      property
    )
      .then((response: any) => {
        console.log(response);
        let result: APIResponse;
        if (response?.status === 200) {
          result = { result: true };
        } else {
          throw "Ошибка при добавлении свойства";
        }
        return result;
      })
      .catch(BaseRequest.handleError);
  }

  delete(id: string): Promise<any> {
    console.log("delete");
    return axios
      .delete(`https://caronline-f2f9e.firebaseio.com/properties/${id}.json`)
      .then((response: any) => {
        console.log(response);
        let result: APIResponse;
        if (response?.status === 200) {
          result = { result: true };
        } else {
          throw "Ошибка при удалении свойства";
        }
        return result;
      })
      .catch(BaseRequest.handleError);
  }
  edit(id: string, property: newProperty): Promise<any> {
    console.log("delete");
    return axios
      .patch(
        `https://caronline-f2f9e.firebaseio.com/properties/${id}.json`,
        property
      )
      .then((response: any) => {
        console.log(response);
        let result: APIResponse;
        if (response?.status === 200) {
          result = { result: true };
        } else {
          throw "Ошибка при редактировании свойства";
        }
        return result;
      })
      .catch(BaseRequest.handleError);
  }
}

import { CarInfo } from "../reducers/car-reducers";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import axios from "axios";

export const GET_CARS_START = "GET_CAR_START";
export const GET_CARS_SUCCESS = "GET_CAR_SUCCESS";
export const GET_CARS_FAIL = "GET_CAR_FAIL";

export const SORT_CARS = "SORT_CARS";

export const getCarsStart = () => {
  return {
    type: GET_CARS_START
  };
};

export const getCarsSuccess = (cars: CarInfo[]) => {
  return {
    type: GET_CARS_SUCCESS,
    payload: {
      cars
    }
  };
};

export const getCarsFail = (error: string) => {
  return {
    type: GET_CARS_FAIL,
    payload: {
      error
    }
  };
};

export const sort = (key: string) => {
  return {
    type: SORT_CARS,
    payload: {
      key
    }
  };
};

export const getCars = (): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    dispatch(getCarsStart());
    axios
      .get("https://caronline-f2f9e.firebaseio.com/cars.json")
      .then(response => {
        console.log(response);
        let temp: CarInfo[] = [];
        for (let key in response.data) {
          temp.push(response.data[key]);
        }
        dispatch(getCarsSuccess(temp));
      })
      .catch((error: any) => {
        console.log(error);
        dispatch(getCarsFail(error.message));
      });
  };
};

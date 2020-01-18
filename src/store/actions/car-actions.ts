import { CarInfo } from "../reducers/car-reducers";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { CarsAPIRequest } from "../../assets/utils/carsAPIRequest";

export const GET_CARS_START = "GET_CAR_START";
export const GET_CARS_SUCCESS = "GET_CAR_SUCCESS";
export const GET_CARS_FAIL = "GET_CAR_FAIL";

export const GET_CAR_BY_ID = "GET_CAR_BY_ID";
export const CLEAR_CURRENT_CAR = "CLEAR_CURRENT_CAR";

export const SORT_CARS = "SORT_CARS";

const getCarsStart = () => {
  return {
    type: GET_CARS_START
  };
};

const getCarsSuccess = (cars: CarInfo[]) => {
  return {
    type: GET_CARS_SUCCESS,
    payload: {
      cars
    }
  };
};

const getCarsFail = (error: string) => {
  return {
    type: GET_CARS_FAIL,
    payload: {
      error
    }
  };
};

export const getCarById = (id: string) => {
  return {
    type: GET_CAR_BY_ID,
    payload: {
      id
    }
  };
};

const ClearCurrentCar = () => {
  return {
    type: CLEAR_CURRENT_CAR
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
    try {
      dispatch(ClearCurrentCar());
      dispatch(getCarsStart());
      const carAPI: CarsAPIRequest = new CarsAPIRequest();
      const carState = await carAPI.getAll();
      console.log(carState);
      dispatch(getCarsSuccess(carState));
    } catch (e) {
      console.log(e);
      dispatch(getCarsFail(e.message));
    }
  };
};

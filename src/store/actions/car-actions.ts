import { CarInfo } from "../reducers/car-reducers";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { CarsAPIRequest } from "../../assets/utils/carsAPIRequest";
import { APIResponse } from "../../assets/utils/APIResponse";

export const GET_CARS_START = "GET_CAR_START";
export const GET_CARS_SUCCESS = "GET_CAR_SUCCESS";
export const GET_CARS_FAIL = "GET_CAR_FAIL";

export const ADD_CARS_START = "ADD_CARS_START";
export const ADD_CARS_SUCCESS = "ADD_CARS_SUCCESS";
export const ADD_CARS_FAIL = "ADD_CARS_FAIL";

export const DELETE_CARS_START = "DELETE_CARS_START";
export const DELETE_CARS_SUCCESS = "DELETE_CARS_SUCCESS";
export const DELETE_CARS_FAIL = "DELETE_CARS_FAIL";

export const EDIT_CARS_START = "EDIT_CARS_START";
export const EDIT_CARS_SUCCESS = "EDIT_CARS_SUCCESS";
export const EDIT_CARS_FAIL = "EDIT_CARS_FAIL";

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

const addCarsStart = (car: CarInfo) => {
  return {
    type: ADD_CARS_START,
    payload: {
      car
    }
  };
};

const addCarSuccess = () => {
  return {
    type: ADD_CARS_SUCCESS
  };
};
const addCarFail = (error: string) => {
  return {
    type: ADD_CARS_FAIL,
    payload: {
      error
    }
  };
};

const editCarsStart = () => {
  return {
    type: EDIT_CARS_START
  };
};

const editCarSuccess = () => {
  return {
    type: EDIT_CARS_SUCCESS
  };
};
const editCarFail = (error: string) => {
  return {
    type: EDIT_CARS_FAIL,
    payload: {
      error
    }
  };
};

const deleteCarStart = () => {
  return {
    type: DELETE_CARS_START
  };
};
const deleteCarSuccess = () => {
  return {
    type: DELETE_CARS_SUCCESS
  };
};

const deleteCarFail = (error: string) => {
  return {
    type: DELETE_CARS_FAIL,
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
      dispatch(getCarsSuccess(carState));
    } catch (e) {
      console.error(e);
      dispatch(getCarsFail(e.message));
    }
  };
};

export const addCar = (
  car: CarInfo
): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    try {
      dispatch(addCarsStart(car));
      const carAPI: CarsAPIRequest = new CarsAPIRequest();
      const response: APIResponse = await carAPI.add(car);
      dispatch(addCarSuccess());
    } catch (error) {
      console.error("response-error", error);
      dispatch(addCarFail(error));
    }
  };
};

export const deleteCar = (
  id: string
): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    try {
      dispatch(deleteCarStart());
      const carAPI: CarsAPIRequest = new CarsAPIRequest();
      const response: APIResponse = await carAPI.delete(id);
      dispatch(deleteCarSuccess());
    } catch (error) {
      console.error("response-error", error);
      dispatch(deleteCarFail(error));
    }
  };
};

export const editCar = (
  id: string,
  car: CarInfo
): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    try {
      dispatch(editCarsStart());
      const carAPI: CarsAPIRequest = new CarsAPIRequest();
      const response: APIResponse = await carAPI.edit(id, car);
      console.log("response", response);
      dispatch(editCarSuccess());
    } catch (error) {
      console.log("response-error", error);
      dispatch(editCarFail(error));
    }
  };
};

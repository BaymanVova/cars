import * as actionTypes from "../actions/car-actions";
import { sortTableAsx, sortTableDesc } from "../../assets/utils/sortTable";

export interface Property {
  idProperty: number;
  nameProperty: string;
  typeProperty: string;
  valueProperty: string | string[];
}
export interface CarInfo {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  date: Date;
  properties: Property[];
}

export interface CarState {
  cars: CarInfo[] | null;
  isLoading: boolean;
  error: string;
  orderBy: string;
  isDesc: boolean;
}

const initialState: CarState = {
  cars: null,
  isLoading: false,
  error: "",
  orderBy: "",
  isDesc: true
};

const getCarsStart = (state: CarState): CarState => {
  return { ...state, error: "", isLoading: true };
};

const getCarsSuccess = (state: CarState, action: any): CarState => {
  return {
    ...state,
    cars: action.payload.cars,
    isLoading: false,
    error: ""
  };
};

const getCarsFail = (state: CarState, action: any): CarState => {
  return { ...state, isLoading: false, error: action.payload.error };
};

const sort = (state: CarState, action: any): CarState => {
  const newOrder: boolean =
    state.orderBy === action.payload.key ? !state.isDesc : true;
  let newValues = [...state.cars!];
  if (newOrder) {
    newValues = sortTableDesc(action.payload.key, newValues);
  } else {
    newValues = sortTableAsx(action.payload.key, newValues);
  }
  return {
    ...state,
    cars: newValues,
    orderBy: action.payload.key,
    isDesc: newOrder
  };
};

export const reducer = (
  state: CarState = initialState,
  action: any
): CarState => {
  switch (action.type) {
    case actionTypes.GET_CARS_START:
      return getCarsStart(state);
    case actionTypes.GET_CARS_SUCCESS:
      return getCarsSuccess(state, action);
    case actionTypes.GET_CARS_FAIL:
      return getCarsFail(state, action);
    case actionTypes.SORT_CARS:
      return sort(state, action);
    default:
      return state;
  }
};

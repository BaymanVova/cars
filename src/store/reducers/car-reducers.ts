import * as actionTypes from "../actions/car-actions";
import { sortTableAsx, sortTableDesc } from "../../assets/utils/sortTable";
import { LoadState } from "../../assets/utils/loadState";

export interface Property {
  idProperty: string;
  nameProperty: string;
  typeProperty: string;
  valueProperty: string[];
}
export interface CarInfo {
  id?: string;
  name: string;
  description: string;
  image: string;
  price: number;
  date: Date;
  properties: Property[];
}

export interface CarState {
  cars: CarInfo[] | null;
  currentCar: CarInfo | null;
  loadState: LoadState;
  error: string;
  orderBy: string;
  isDesc: boolean;
}

const initialState: CarState = {
  cars: null,
  currentCar: null,
  loadState: LoadState.needLoad,
  error: "",
  orderBy: "",
  isDesc: true
};

const getCarsStart = (state: CarState): CarState => {
  return { ...state, error: "", loadState: LoadState.loading };
};

const getCarsSuccess = (state: CarState, action: any): CarState => {
  return {
    ...state,
    cars: action.payload.cars,
    loadState: LoadState.allIsLoaded,
    error: ""
  };
};

const getCarsFail = (state: CarState, action: any): CarState => {
  return { ...state, loadState: LoadState.error, error: action.payload.error };
};

const addCarsStart = (state: CarState): CarState => {
  return { ...state, loadState: LoadState.loading, error: "" };
};
const addCarsSuccess = (state: CarState): CarState => {
  return { ...state, loadState: LoadState.added };
};
const addCarsFail = (state: CarState, action: any): CarState => {
  return { ...state, loadState: LoadState.error, error: action.payload.error };
};

const deleteCarStart = (state: CarState): CarState => {
  return { ...state, loadState: LoadState.loading, error: "" };
};

const deleteCarSuccess = (state: CarState): CarState => {
  return { ...state, loadState: LoadState.deleted, error: "" };
};
const deleteCarFail = (state: CarState, action: any): CarState => {
  return { ...state, loadState: LoadState.error, error: action.payload.error };
};

const editCarsStart = (state: CarState): CarState => {
  return { ...state, loadState: LoadState.loading, error: "" };
};
const editCarsSuccess = (state: CarState): CarState => {
  return { ...state, loadState: LoadState.edited, error: "" };
};
const editCarsFail = (state: CarState, action: any): CarState => {
  return { ...state, loadState: LoadState.error, error: action.payload.error };
};

// Так как FireBase не возвращает (или я не разобрался) данные по ID, я просто ищу среди всего списка
const getCarById = (state: CarState, action: any): CarState => {
  const curCar = state.cars?.find(_ => _.id == action.payload.id) || null;
  return { ...state, currentCar: curCar };
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

const ClearCurrentCar = (state: CarState): CarState => {
  return { ...state, currentCar: null };
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
    case actionTypes.ADD_CARS_START:
      return addCarsStart(state);
    case actionTypes.ADD_CARS_SUCCESS:
      return addCarsSuccess(state);
    case actionTypes.ADD_CARS_FAIL:
      return addCarsFail(state, action);
    case actionTypes.EDIT_CARS_START:
      return editCarsStart(state);
    case actionTypes.EDIT_CARS_SUCCESS:
      return editCarsSuccess(state);
    case actionTypes.EDIT_CARS_FAIL:
      return editCarsFail(state, action);
    case actionTypes.DELETE_CARS_START:
      return deleteCarStart(state);
    case actionTypes.DELETE_CARS_SUCCESS:
      return deleteCarSuccess(state);
    case actionTypes.DELETE_CARS_FAIL:
      return deleteCarFail(state, action);
    case actionTypes.GET_CAR_BY_ID:
      return getCarById(state, action);
    case actionTypes.CLEAR_CURRENT_CAR:
      return ClearCurrentCar(state);
    case actionTypes.SORT_CARS:
      return sort(state, action);
    default:
      return state;
  }
};

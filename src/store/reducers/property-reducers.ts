import { Property } from "./car-reducers";
import * as actionTypes from "../actions/property-actions";
import { sortTableAsx, sortTableDesc } from "../../assets/utils/sortTable";

export interface PropertyState {
  properties: Property[] | null;
  isLoading: boolean;
  error: string;
  orderBy: string;
  isDesc: boolean;
}
const initialState: PropertyState = {
  properties: null,
  isLoading: false,
  error: "",
  orderBy: "",
  isDesc: true
};

const getPropertiesStart = (state: PropertyState): PropertyState => {
  return { ...state, isLoading: true, error: "" };
};

const getPropertiesSuccess = (
  state: PropertyState,
  action: any
): PropertyState => {
  return {
    ...state,
    isLoading: false,
    error: "",
    properties: action.payload.properties
  };
};

const getPropertiesFail = (
  state: PropertyState,
  action: any
): PropertyState => {
  return { ...state, isLoading: false, error: action.payload.error };
};

const sortProperties = (state: PropertyState, action: any): PropertyState => {
  const newOrder: boolean =
    state.orderBy === action.payload.key ? !state.isDesc : true;
  let newValues = [...state.properties!];
  if (newOrder) {
    newValues = sortTableDesc(action.payload.key, newValues);
  } else {
    newValues = sortTableAsx(action.payload.key, newValues);
  }
  return {
    ...state,
    properties: newValues,
    orderBy: action.payload.key,
    isDesc: newOrder
  };
};

export const reducer = (state: PropertyState = initialState, action: any) => {
  switch (action.type) {
    case actionTypes.GET_PROPERTY_START: {
      return getPropertiesStart(state);
    }
    case actionTypes.GET_PROPERTY_SUCCESS: {
      return getPropertiesSuccess(state, action);
    }
    case actionTypes.GET_PROPERTY_FAIL: {
      return getPropertiesFail(state, action);
    }
    case actionTypes.SORT_PROPERTIES: {
      return sortProperties(state, action);
    }
    default:
      return state;
  }
};

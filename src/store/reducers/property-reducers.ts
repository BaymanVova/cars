import { Property } from "./car-reducers";
import * as actionTypes from "../actions/property-actions";
import { sortTableAsx, sortTableDesc } from "../../assets/utils/sortTable";
import { LoadState } from "../../assets/utils/loadState";

export interface PropertyState {
  properties: Property[] | null;
  loadState: LoadState;
  error: string;
  orderBy: string;
  isDesc: boolean;
}
const initialState: PropertyState = {
  properties: null,
  loadState: LoadState.needLoad,
  error: "",
  orderBy: "",
  isDesc: true
};

const getPropertiesStart = (state: PropertyState): PropertyState => {
  return { ...state, loadState: LoadState.loading, error: "" };
};

const getPropertiesSuccess = (
  state: PropertyState,
  action: any
): PropertyState => {
  return {
    ...state,
    loadState: LoadState.allIsLoaded,
    error: "",
    properties: action.payload.properties
  };
};

const getPropertiesFail = (
  state: PropertyState,
  action: any
): PropertyState => {
  return { ...state, loadState: LoadState.error, error: action.payload.error };
};

const addPropertyStart = (state: PropertyState, action: any): PropertyState => {
  // Нельзя добавить существующее свойство
  // Эта задача должна выполняться на бэке, тут я сделаю костыль)
  const exist = state.properties?.find(
    _ => _.nameProperty === action.payload.property.nameProperty
  );
  if (exist) {
    console.error("Добавляемое свойство уже есть в наборе свойств", exist);
    throw "Добавляемое свойство уже есть в наборе свойств";
  }
  return {
    ...state,
    loadState: LoadState.loading,
    error: ""
  };
};
const addPropertySuccess = (state: PropertyState): PropertyState => {
  return {
    ...state,
    loadState: LoadState.added,
    error: ""
  };
};

const addPropertyFail = (state: PropertyState, action: any): PropertyState => {
  return {
    ...state,
    loadState: LoadState.error,
    error: action.payload.error
  };
};

const deletePropertyStart = (state: PropertyState): PropertyState => {
  return {
    ...state,
    loadState: LoadState.loading,
    error: ""
  };
};
const deletePropertySuccess = (state: PropertyState): PropertyState => {
  return {
    ...state,
    loadState: LoadState.deleted,
    error: ""
  };
};

const deletePropertyFail = (
  state: PropertyState,
  action: any
): PropertyState => {
  return {
    ...state,
    loadState: LoadState.error,
    error: action.payload.error
  };
};

const editPropertyStart = (
  state: PropertyState,
  action: any
): PropertyState => {
  // Нельзя добавить существующее свойство
  // Эта задача должна выполняться на бэке, тут я сделаю костыль)
  const exist = state.properties?.find(
    _ =>
      _.nameProperty === action.payload.property.nameProperty &&
      _.idProperty !== action.payload.id
  );
  if (exist) {
    console.error("Добавляемое свойство уже есть в наборе свойств", exist);
    throw "Добавляемое свойство уже есть в наборе свойств";
  }
  return {
    ...state,
    loadState: LoadState.loading,
    error: ""
  };
};
const editPropertySuccess = (state: PropertyState): PropertyState => {
  return {
    ...state,
    loadState: LoadState.edited,
    error: ""
  };
};

const editPropertyFail = (state: PropertyState, action: any): PropertyState => {
  return {
    ...state,
    loadState: LoadState.error,
    error: action.payload.error
  };
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
    case actionTypes.ADD_PROPERTY_START: {
      return addPropertyStart(state, action);
    }
    case actionTypes.ADD_PROPERTY_SUCCESS: {
      return addPropertySuccess(state);
    }
    case actionTypes.ADD_PROPERTY_FAIL: {
      return addPropertyFail(state, action);
    }
    case actionTypes.DELETE_PROPERTY_START: {
      return deletePropertyStart(state);
    }
    case actionTypes.DELETE_PROPERTY_SUCCESS: {
      return deletePropertySuccess(state);
    }
    case actionTypes.DELETE_PROPERTY_FAIL: {
      return deletePropertyFail(state, action);
    }
    case actionTypes.EDIT_PROPERTY_START: {
      return editPropertyStart(state, action);
    }
    case actionTypes.EDIT_PROPERTY_SUCCESS: {
      return editPropertySuccess(state);
    }
    case actionTypes.EDIT_PROPERTY_FAIL: {
      return editPropertyFail(state, action);
    }
    case actionTypes.SORT_PROPERTIES: {
      return sortProperties(state, action);
    }
    default:
      return state;
  }
};

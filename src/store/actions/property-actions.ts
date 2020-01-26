import { Property } from "../reducers/car-reducers";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import {
  newProperty,
  PropertiesAPIRequest
} from "../../assets/utils/propertiesAPIRequest";
import { APIResponse } from "../../assets/utils/APIResponse";

export const GET_PROPERTY_START = "GET_PROPERTY_START";
export const GET_PROPERTY_SUCCESS = "GET_PROPERTY_SUCCESS";
export const GET_PROPERTY_FAIL = "GET_PROPERTY_FAIL";

export const ADD_PROPERTY_START = "ADD_PROPERTY_START";
export const ADD_PROPERTY_SUCCESS = "ADD_PROPERTY_SUCCESS";
export const ADD_PROPERTY_FAIL = "ADD_PROPERTY_FAIL";

export const DELETE_PROPERTY_START = "DELETE_PROPERTY_START";
export const DELETE_PROPERTY_SUCCESS = "DELETE_PROPERTY_SUCCESS";
export const DELETE_PROPERTY_FAIL = "DELETE_PROPERTY_FAIL";

export const EDIT_PROPERTY_START = "EDIT_PROPERTY_START";
export const EDIT_PROPERTY_SUCCESS = "EDIT_PROPERTY_SUCCESS";
export const EDIT_PROPERTY_FAIL = "EDIT_PROPERTY_FAIL";

export const SORT_PROPERTIES = "SORT_PROPERTIES";

const getPropertyStart = () => {
  return {
    type: GET_PROPERTY_START
  };
};

const getPropertySuccess = (properties: Property[]) => {
  return {
    type: GET_PROPERTY_SUCCESS,
    payload: {
      properties
    }
  };
};

const getPropertyFail = (error: string) => {
  return {
    type: GET_PROPERTY_FAIL,
    payload: {
      error
    }
  };
};

const addPropertyStart = (property: newProperty) => {
  return {
    type: ADD_PROPERTY_START,
    payload: {
      property
    }
  };
};

const addPropertySuccess = () => {
  return {
    type: ADD_PROPERTY_SUCCESS
  };
};

const addPropertyFail = (error: string) => {
  return {
    type: ADD_PROPERTY_FAIL,
    payload: {
      error
    }
  };
};

const deletePropertyStart = (id: string) => {
  return {
    type: DELETE_PROPERTY_START,
    payload: {
      id
    }
  };
};

const deletePropertySuccess = () => {
  return {
    type: DELETE_PROPERTY_SUCCESS
  };
};

const deletePropertyFail = (error: string) => {
  return {
    type: DELETE_PROPERTY_FAIL,
    payload: {
      error
    }
  };
};

const editPropertyStart = (id: string, property: newProperty) => {
  return {
    type: EDIT_PROPERTY_START,
    payload: {
      id,
      property
    }
  };
};

const editPropertySuccess = () => {
  return {
    type: EDIT_PROPERTY_SUCCESS
  };
};

const editPropertyFail = (error: string) => {
  return {
    type: EDIT_PROPERTY_FAIL,
    payload: {
      error
    }
  };
};

export const sortProperties = (key: string) => {
  return {
    type: SORT_PROPERTIES,
    payload: {
      key
    }
  };
};
export const getProperty = (): ThunkAction<
  Promise<void>,
  {},
  {},
  AnyAction
> => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    try {
      dispatch(getPropertyStart());
      const propertyAPI: PropertiesAPIRequest = new PropertiesAPIRequest();
      const response: Property[] = await propertyAPI.getAll();
      dispatch(getPropertySuccess(response));
    } catch (error) {
      dispatch(getPropertyFail(error));
    }
  };
};

export const addProperty = (
  property: newProperty
): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    try {
      dispatch(addPropertyStart(property));
      const propertyAPI: PropertiesAPIRequest = new PropertiesAPIRequest();
      const response: APIResponse = await propertyAPI.add(property);
      console.log("response", response);
      dispatch(addPropertySuccess());
    } catch (error) {
      console.log("response-error", error);
      dispatch(addPropertyFail(error));
    }
  };
};

export const deleteProperty = (
  id: string
): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    try {
      dispatch(deletePropertyStart(id));
      const propertyAPI: PropertiesAPIRequest = new PropertiesAPIRequest();
      const response: APIResponse = await propertyAPI.delete(id);
      console.log("response", response);
      dispatch(deletePropertySuccess());
    } catch (error) {
      console.log("response-error", error);
      dispatch(deletePropertyFail(error));
    }
  };
};

export const editProperty = (
  id: string,
  property: newProperty
): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    try {
      dispatch(editPropertyStart(id, property));
      const propertyAPI: PropertiesAPIRequest = new PropertiesAPIRequest();
      const response: APIResponse = await propertyAPI.edit(id, property);
      console.log("response", response);
      dispatch(editPropertySuccess());
    } catch (error) {
      console.log("response-error", error);
      dispatch(editPropertyFail(error));
    }
  };
};

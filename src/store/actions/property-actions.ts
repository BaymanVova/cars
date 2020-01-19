import { Property } from "../reducers/car-reducers";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { PropertiesAPIRequest } from "../../assets/utils/propertiesAPIRequest";

export const GET_PROPERTY_START = "GET_PROPERTY_START";
export const GET_PROPERTY_SUCCESS = "GET_PROPERTY_SUCCESS";
export const GET_PROPERTY_FAIL = "GET_PROPERTY_FAIL";

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

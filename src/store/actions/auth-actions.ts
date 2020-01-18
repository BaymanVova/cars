import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { AuthRequest } from "../../assets/utils/authRequest";
import { AuthAPIRequest } from "../../assets/utils/authAPIRequest";

export const AUTH_START = "AUTH_START";
export const AUTH_SUCCESS = "AUTH_SUCCESS";
export const AUTH_FAIL = "AUTH_FAIL";
export const AUTH_LOGOUT = "AUTH_LOGOUT";
export const SET_AUTH_REDIRECT_PATH = "SET_AUTH_REDIRECT_PATH";

export const REG_START = "REG_START";
export const REG_SUCCESS = "REG_SUCCESS";
export const REG_FAIL = "REG_FAIL";

export const SET_INIT = "SET_INIT";

export const setInit = () => {
  return {
    type: SET_INIT
  };
};

export const regStart = () => {
  return {
    type: REG_START
  };
};

export const regSuccess = (idToken: string, userId: string) => {
  return {
    type: REG_SUCCESS,
    idToken,
    userId
  };
};

export const regFail = (error: string) => {
  return {
    type: REG_FAIL,
    error
  };
};

export const authStart = () => {
  return {
    type: AUTH_START
  };
};

export const authSuccess = (idToken: string, userId: string) => {
  return {
    type: AUTH_SUCCESS,
    idToken,
    userId
  };
};

export const authFail = (error: string) => {
  return {
    type: AUTH_FAIL,
    error
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("userId");
  return {
    type: AUTH_LOGOUT
  };
};

export const checkAuthTimeout = (expirationTime: number) => {
  return (dispatch: any) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime);
  };
};

export const auth = (
  email: string,
  password: string
): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    dispatch(authStart());
    const authData = {
      email,
      password,
      returnSecureToken: true
    };
    const authAPI: AuthAPIRequest = new AuthAPIRequest();
    authAPI
      .signIn(authData)
      .then(response => {
        console.log(response);
        const expirationDate: Date = new Date(
          new Date().getTime() + response.expiresIn * 1000
        );
        localStorage.setItem("token", response.idToken);
        localStorage.setItem("expirationDate", expirationDate.toString());
        localStorage.setItem("userId", response.localId);
        dispatch(authSuccess(response.idToken, response.localId));
        dispatch(checkAuthTimeout(response.expiresIn * 1000));
      })
      .catch((error: any) => {
        console.log(error);
        dispatch(authFail(error.response.data.error.message));
      });
  };
};

export const registarion = (
  firstName: string,
  lastName: string,
  email: string,
  password: string
) => (dispatch: any) => {
  dispatch(regStart());
  const regData: AuthRequest = {
    email,
    password,
    returnSecureToken: true
  };
  const authAPI: AuthAPIRequest = new AuthAPIRequest();
  authAPI
    .registration(regData)
    .then(response => {
      const expirationDate: Date = new Date(
        new Date().getTime() + response.expiresIn * 1000
      );
      localStorage.setItem("token", response.idToken);
      localStorage.setItem("expirationDate", expirationDate.toString());
      localStorage.setItem("userId", response.localId);
      dispatch(regSuccess(response.idToken, response.localId));
      dispatch(checkAuthTimeout(response.expiresIn * 1000));
    })
    .catch((error: any) => {
      console.log(error);
      dispatch(regFail(error.response.data.error.message));
    });
};

export const authCheckState = () => (dispatch: any) => {
  const token = localStorage.getItem("token");
  if (token) {
    const expirationDate: Date = new Date(
      localStorage.getItem("expirationDate")!
    );
    if (expirationDate > new Date()) {
      const userId = localStorage.getItem("userId");
      dispatch(authSuccess(token, userId!));
      dispatch(
        checkAuthTimeout(expirationDate.getTime() - new Date().getTime())
      );
    } else {
      dispatch(logout());
    }
  }
  dispatch(setInit());
};

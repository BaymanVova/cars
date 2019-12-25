import axios from "axios";

export const AUTH_START = "AUTH_START";
export const AUTH_SUCCESS = "AUTH_SUCCESS";
export const AUTH_FAIL = "AUTH_FAIL";
export const AUTH_LOGOUT = "AUTH_LOGOUT";
export const SET_AUTH_REDIRECT_PATH = "SET_AUTH_REDIRECT_PATH";

export const REG_START = "REG_START";
export const REG_SUCCESS = "REG_SUCCESS";
export const REG_FAIL = "REG_FAIL";

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

export const auth = (email: string, password: string) => (dispatch: any) => {
  dispatch(authStart());
  const authData = {
    email,
    password,
    returnSecureToken: true
  };
  axios
    .post(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBr234HzNifT_aIEYwijpcapRmjZkn_iUo",
      authData
    )
    .then(response => {
      console.log(response);
      const expirationDate: Date = new Date(
        new Date().getTime() + response.data.expiresIn * 1000
      );
      localStorage.setItem("token", response.data.idToken);
      localStorage.setItem("expirationDate", expirationDate.toString());
      localStorage.setItem("userId", response.data.localId);
      dispatch(authSuccess(response.data.idToken, response.data.localId));
      dispatch(checkAuthTimeout(response.data.expiresIn * 1000));
    })
    .catch((err: any) => {
      console.log(err);
      dispatch(authFail(err.response.data.error));
    });
};

export const registarion = (
  firstName: string,
  lastName: string,
  email: string,
  password: string
) => (dispatch: any) => {
  dispatch(regStart());
  const regData = {
    email,
    password,
    returnSecureToken: true
  };
  axios
    .post(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBr234HzNifT_aIEYwijpcapRmjZkn_iUo",
      regData
    )
    .then(response => {
      const expirationDate: Date = new Date(
        new Date().getTime() + response.data.expiresIn * 1000
      );
      localStorage.setItem("token", response.data.idToken);
      localStorage.setItem("expirationDate", expirationDate.toString());
      localStorage.setItem("userId", response.data.localId);
      dispatch(regSuccess(response.data.idToken, response.data.localId));
      dispatch(checkAuthTimeout(response.data.expiresIn * 1000));
    })
    .catch((error: any) => {
      console.log(error);
      dispatch(regFail(error.message));
    });
};

export const authCheckState = () => (dispatch: any) => {
  const token = localStorage.getItem("token");
  if (!token) {
    dispatch(logout());
  } else {
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
};

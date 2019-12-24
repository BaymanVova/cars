import axios from "axios";

export const AUTH_START = "AUTH_START";
export const AUTH_SUCCESS = "AUTH_SUCCESS";
export const AUTH_FAIL = "AUTH_FAIL";
export const AUTH_LOGOUT = "AUTH_LOGOUT";
export const SET_AUTH_REDIRECT_PATH = "SET_AUTH_REDIRECT_PATH";

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
  return {
    type: AUTH_LOGOUT
  };
};

export const checkAuthTimeout = (expirationTime: number) => {
  return (dispatch: any) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
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
      dispatch(authSuccess(response.data.idToken, response.data.localId));
      dispatch(checkAuthTimeout(response.data.expiresIn));
    })
    .catch((err: any) => {
      console.log(err);
      dispatch(authFail(err.response.data.error));
    });
};

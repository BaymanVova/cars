import * as actionTypes from "../actions/auth-actions";
import { act } from "react-dom/test-utils";

interface AuthState {
  token: string | null;
  userId: string | null;
  error: string | null;
  loading: boolean;
  authRedirectPath: string;
}
const initialState: AuthState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
  authRedirectPath: "/"
};

const regStart = (state: AuthState): AuthState => {
  return { ...state, error: null, loading: true };
};

const regSuccess = (state: AuthState, action: any): AuthState => {
  return {
    ...state,
    error: null,
    loading: false,
    token: action.tokenId,
    userId: action.userId
  };
};

const regFail = (state: AuthState, action: any): AuthState => {
  return {
    ...state,
    error: action.error,
    loading: false
  };
};

const authStart = (state: AuthState): AuthState => {
  return { ...state, error: null, loading: true };
};

const authSuccess = (state: AuthState, action: any): AuthState => {
  console.log("action", action);
  return {
    ...state,
    token: action.idToken,
    userId: action.userId,
    error: null,
    loading: false
  };
};

const authFail = (state: AuthState, action: any): AuthState => {
  return { ...state, error: action.error, loading: false };
};
const setAuthRedirectPath = (state: AuthState, action: any): AuthState => {
  return { ...state, authRedirectPath: action.path };
};

const authLogout = (state: AuthState, action: any) => {
  return { ...state, token: null, userId: null };
};

const reducer = (state: AuthState = initialState, action: any) => {
  switch (action.type) {
    case actionTypes.REG_START:
      return regStart(state);
    case actionTypes.REG_SUCCESS:
      return regSuccess(state, action);
    case actionTypes.REG_FAIL:
      return regFail(state, action);
    case actionTypes.AUTH_START:
      return authStart(state);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action);
    case actionTypes.SET_AUTH_REDIRECT_PATH:
      return setAuthRedirectPath(state, action);
    default:
      return state;
  }
};

export default reducer;

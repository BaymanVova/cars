import * as actionTypes from "../actions/auth-actions";

export interface AuthState {
  token: string | null;
  userId: string | null;
  error: string | null;
  loading: boolean;
  initialized: boolean;
}
const initialState: AuthState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
  initialized: false
};

const setInitialized = (state: AuthState): AuthState => {
  return { ...state, initialized: true };
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

const authLogout = (state: AuthState) => {
  return { ...state, token: null, userId: null };
};

export const reducer = (
  state: AuthState = initialState,
  action: any
): AuthState => {
  switch (action.type) {
    case actionTypes.SET_INIT:
      return setInitialized(state);
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
      return authLogout(state);
    default:
      return state;
  }
};

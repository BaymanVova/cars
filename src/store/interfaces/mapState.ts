import { AuthState } from "../reducers/auth-reducers";
import { CarState } from "../reducers/car-reducers";

export interface MapState {
  auth: AuthState;
  cars: CarState;
}

import { AuthState } from "../reducers/auth-reducers";
import { CarState } from "../reducers/car-reducers";
import { PropertyState } from "../reducers/property-reducers";

export interface MapState {
  auth: AuthState;
  cars: CarState;
  properties: PropertyState;
}

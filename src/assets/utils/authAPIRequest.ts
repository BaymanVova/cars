import { BaseRequest } from "./baseRequest";
import { AuthRequest } from "./authRequest";

export class AuthAPIRequest extends BaseRequest {
  constructor() {
    super();
    this.signIn = this.signIn.bind(this);
    this.registration = this.registration.bind(this);
  }

  signIn(signInRequest: AuthRequest): Promise<any> {
    return this.post(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBr234HzNifT_aIEYwijpcapRmjZkn_iUo",
      signInRequest
    )
      .then(response => response.data)
      .catch(BaseRequest.handleError);
  }

  registration(regRequest: AuthRequest): Promise<any> {
    return this.post(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBr234HzNifT_aIEYwijpcapRmjZkn_iUo",
      regRequest
    )
      .then(response => response.data)
      .catch(BaseRequest.handleError);
  }
}

import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint =
  apiUrl + "/v1/accounts:signUp?key=AIzaSyDJfkfb1ncRFf19sRjZY2DCoc4UFf3HWMM";

export function register(user) {
  return http.post(apiEndpoint, {
    email: user.email,
    password: user.password,
    returnSecureToken: true,
  });
}



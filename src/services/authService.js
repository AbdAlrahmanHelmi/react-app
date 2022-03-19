import http from "./httpService";
import { apiUrl } from "../config.json";
import jwtDecode from "jwt-decode";

const apiEndpoint =
  apiUrl +
  "/v1/accounts:signInWithPassword?key= AIzaSyDJfkfb1ncRFf19sRjZY2DCoc4UFf3HWMM";

const tokenKey = "token";

export async function login(email, password) {
  const { data } = await http.post(apiEndpoint, {
    email: email,
    password: password,
    returnSecureToken: true,
  });
  localStorage.setItem(tokenKey, data.idToken);
}
export const loginWithJwt = (jwt) => {
  localStorage.setItem(tokenKey, jwt);
};
export const logOut = () => {
  localStorage.removeItem(tokenKey);
};
export const getCurrentUser = () => {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
};

export default {
  login,
  logOut,
  getCurrentUser,
  loginWithJwt,
};

import jwtDecode from "jwt-decode";
import http from "./httpService";
//import { apiUrl } from "../config.json";
const apiUrl = "http://localhost:8080/api/v1/";
const apiEndpoint = apiUrl + "users";
//const tokenKey = "token";

http.setJwt(getJwt());

/**
 * Sign in a registered user into the application
 * @param {String} email registered user email
 * @param {String} password registered user password
 */
export async function signIn(email, password) {
  const res = await http.post(`${apiEndpoint}/signin`, {
    email,
    password,
  });
  const jwt = res.data.token;
  localStorage.token = jwt; //store token
}

/**
 * Log user with the JWT key
 * @param {String} jwt JWT key
 */
export function loginWithJwt(jwt) {
  localStorage.token = jwt;
}

export function logout() {
  delete localStorage.token;
}

/**
 * Get the token from the localstorage, decode to get user credentials. If there
 * is an error or no token, return null
 * @returns User or Null
 */
export function getCurrentUser() {
  try {
    const jwt = localStorage.token;
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

/**
 * get the current token string
 * @returns String
 */
export function getJwt() {
  return localStorage.token;
}

export default {
  signIn,
  logout,
  loginWithJwt,
  getCurrentUser,
  getJwt,
};

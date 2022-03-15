import http from "./httpService";
const apiUrl = "http://localhost:8080/api/v1/";
//import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "users";
/**
 * Register a new user into application with user data
 * @param {Object} data -> {name , email, password, passwordConfirm}
 * @returns
 */
export function signUp(data) {
  return http.post(`${apiEndpoint}/signup`, data);
}

export function getMe() {
  return http.get(`${apiEndpoint}/me`);
}

/**
 * Patch request to update user data
 *
 * @param {Object} data  -> {name, email, photo}
 * @returns Promise
 */
export function updateMe(data) {
  return http.patch(`${apiEndpoint}/updateMe`, data);
}

export function updateMyPassword(data) {
  return http.patch(`${apiEndpoint}/updateMyPassword`, data);
}

export function getUsers(query) {
  let searchQuery = `role=${query.role}&`;
  if (query.name) searchQuery += `name=${query.name}&`;
  searchQuery += `limit=${query.limit}&page=${query.page}`;
  //const searchQuery = `role=${query}`;
  return http.get(`${apiEndpoint}?${searchQuery}`);
}

export default {
  signUp,
  getMe,
  updateMyPassword,
};

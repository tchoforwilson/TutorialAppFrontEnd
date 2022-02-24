import axios from "axios";

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if (!expectedError) {
    console.log("Logging the error", error);
  }
  return Promise.reject(error);
});

/**
 * set the JWT token in the http header
 * @param {String} jwt JWT token
 */
function setJwt(jwt) {
  axios.defaults.headers.authorization = "Bearer " + jwt;
}

export default {
  get: axios.get,
  post: axios.post,
  patch: axios.patch,
  delete: axios.delete,
  setJwt,
};

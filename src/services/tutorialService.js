import http from "./httpService";

const apiUrl = "http://localhost:8080/api/v1/tutorials";

export function getTutorials(query) {
  let searchQuery = "";
  if (query.title) searchQuery = `title=${query.title}&`;
  searchQuery += `limit=${query.limit}&page=${query.page}`;
  return http.get(`${apiUrl}?${searchQuery}`);
}

export function getTutorial(id) {
  return http.get(`${apiUrl}/${id}`);
}

export function addTutorial(data) {
  return http.post(`${apiUrl}/`, data);
}

export function updateTutorial(id, data) {
  return http.patch(`${apiUrl}/${id}`, data);
}

export function deleteTutorial(id) {
  return http.delete(`${apiUrl}/${id}`);
}

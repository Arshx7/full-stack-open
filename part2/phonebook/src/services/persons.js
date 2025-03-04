import axios from "axios";

const baseUrl = "/api/persons";

function getAll() {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
}

function create(newPerson) {
  const request = axios.post(baseUrl, newPerson);
  return request.then((response) => response.data);
}

function deletePerson(id) {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then((response) => response);
}

function update(id, updatedPerson) {
  const request = axios.put(`${baseUrl}/${id}`, updatedPerson);
  return request.then((response) => response.data);
}
export default {
  getAll,
  create,
  deletePerson,
  update,
};

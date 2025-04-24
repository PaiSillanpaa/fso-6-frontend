import axios from "axios";

const baseUrl = "http://localhost:3001/api/notes";
//const baseUrl = "http://localhost:5173/test-pages";
//const baseUrl = "api/notes";

export const getAll = () => {
  return axios.get(baseUrl);
};

export const create = (newPerson) => axios.post(baseUrl, newPerson);
//export const addPerson = (newPerson) => {};

export const remove = (id) => axios.delete(`${baseUrl}/${id}`);

export const update = (id, newPerson) =>
  axios.put(`${baseUrl}/${id}`, newPerson);

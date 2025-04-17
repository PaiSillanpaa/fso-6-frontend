import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import axios from "axios";

const baseUrl = "/api/notes";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const promise = axios.get("http://localhost:3001/notes");
promise.then((response) => {
  console.log(response);
});

const promise2 = axios.get("http://localhost:3001/foobar");
console.log(promise2);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);

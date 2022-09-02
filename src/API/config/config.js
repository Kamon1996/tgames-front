import axios from "axios";
export const API = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 1000,
});

if (localStorage.getItem("token")) {
  API.defaults.headers.common["Authorization"] = localStorage.getItem("token");
}

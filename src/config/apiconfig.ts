import axios from "axios";
export const tGamesApi = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 10000,
});

const token = localStorage.getItem("token");

if (token !== null) {
  tGamesApi.defaults.headers.common["Authorization"] = token;
}

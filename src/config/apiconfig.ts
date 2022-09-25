import axios from "axios";
export const tGamesApi = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 10000,
});

export const TOKEN = localStorage.getItem("token");

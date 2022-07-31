import { API } from "../config/config";

export async function APIGetProfile() {
  const response = await API.get("/profile");
  console.log(response);
  return response;
}

export async function APIGetUsers() {
  const response = await API.get(`/users`);
  return response.data;
}

export async function APIShowUser(username) {
  const response = await API.get(`/users/${username}`);
  return response.data;
}

export async function APIDeleteUser(username) {
  const response = await API.delete(`/users/${username}`);
  return response.data;
}
export async function APIUpdateUser(payload) {
  const response = await API.put(`/users/${payload.username}`, payload.data);
  return response.data;
}

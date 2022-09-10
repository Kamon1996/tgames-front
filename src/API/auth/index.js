import { API } from "../config/config";

export async function APIRegistration(payload) {
  const response = await API.post(`/users`, payload);
  return response.data;
}

export async function APILogin(payload) {
  const response = await API.post(`/auth/login`, payload);
  return response.data;
}

import axios from "axios";
import { ILoginFormData } from "../types/form-data";
import { ISignupRequestPayload } from "../types/request-payload";
import { IUserDetailsResponse } from "../types/response";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function createAccount(body: ISignupRequestPayload) {
  const response = await axios.post(`${BASE_URL}/register`, body);
  return response?.data;
}

export async function login(payload: ILoginFormData) {
  const response = await axios.post(`${BASE_URL}/login`, payload);
  return response?.data;
}

export async function getUserDetails(): Promise<IUserDetailsResponse> {
  const response = await axios.get(`${BASE_URL}/api/me`, { withCredentials: true });
  return response?.data;
}

export async function logout() {
  const response = await axios.post(`${BASE_URL}/api/logout`, null, { withCredentials: true });
  return response?.data;
}

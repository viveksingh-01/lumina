import axios from "axios";
import { ILoginFormData } from "../types/form-data";
import { ISignupRequestPayload } from "../types/request-payload";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function createAccount(body: ISignupRequestPayload) {
  const response = await axios.post(`${BASE_URL}/register`, body, { withCredentials: true });
  return response?.data;
}

export async function login(payload: ILoginFormData) {
  const response = await axios.post(`${BASE_URL}/login`, payload, { withCredentials: true });
  return response?.data;
}

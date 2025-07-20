import axios from "axios";
import { ISignupRequestPayload } from "../types/request-payload";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function createAccount(body: ISignupRequestPayload) {
  const response = await axios.post(`${BASE_URL}/register`, body);
  return response?.data;
}

import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function getResponse(payload: any) {
  const { data } = await axios.post(`${BASE_URL}/api/chat`, payload, { withCredentials: true });
  return data?.response;
}

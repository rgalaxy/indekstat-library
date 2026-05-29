import axios from "axios";
import type { LoginRequest, LoginApiResponse } from "../types";
import { API_ENDPOINTS } from "@/shared/constants/endpoints";
import { API_BASE_URL } from "@/shared/constants/auth";

const authAxios = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  timeout: 15000,
});

export const loginApi = async (
  credentials: LoginRequest,
): Promise<LoginApiResponse> => {
  const { data } = await authAxios.post<LoginApiResponse>(
    API_ENDPOINTS.AUTH.LOGIN,
    credentials,
  );
  return data;
};

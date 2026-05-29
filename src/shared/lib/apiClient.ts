import axios from "axios";
import { store } from "@/app/store";
import { clearAuth } from "@/features/auth/slices/authSlice";
import {
  API_BASE_URL,
  CSRF_HEADER_NAME,
  CSRF_COOKIE_NAME,
} from "@/shared/constants/auth";

const getCsrfToken = (): string => {
  const match = document.cookie
    .split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith(`${CSRF_COOKIE_NAME}=`));
  return match ? decodeURIComponent(match.split("=")[1]) : "";
};

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  timeout: 15000,
});

apiClient.interceptors.request.use((config) => {
  const state = store.getState();
  const token = state.auth.accessToken;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  if (
    ["post", "put", "delete", "patch"].includes(
      config.method?.toLowerCase() ?? "",
    )
  ) {
    const csrf = getCsrfToken();
    if (csrf) {
      config.headers[CSRF_HEADER_NAME] = csrf;
    }
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      store.dispatch(clearAuth());
    }
    return Promise.reject(error);
  },
);

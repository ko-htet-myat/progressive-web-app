import { useAuthStore } from "@/store/auth-store";
import axios from "axios";
import { refreshAuth } from "./auth";

// base api
const baseApiUrl = import.meta.env.VITE_BASE_API_URL;

// Public instance for open endpoints like login/register
export const api = axios.create({
  baseURL: baseApiUrl,
  headers: { "Content-Type": "application/json" },
});

// Private instance for protected resource queries
export const privateApi = axios.create({
  baseURL: baseApiUrl,
  headers: { "Content-Type": "application/json" },
  withCredentials: true, // Necessary to send the HttpOnly refresh token cookie
});

// Request interceptor injects the current access token
privateApi.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().accessToken;
    if (token && !config.headers["Authorization"]) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor handles automatic 401 token refresh loops
privateApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const prevRequest = error?.config;
    if (error?.response?.status === 401 && !prevRequest?._retry) {
      prevRequest._retry = true;
      console.warn("Received 401 Unauthorized, attempting to refresh token...");
      try {
        const newAccessToken = await refreshAuth();

        prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return privateApi(prevRequest);
      } catch (refreshError) {
        // refreshAuth already logs the error and calls logout()
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

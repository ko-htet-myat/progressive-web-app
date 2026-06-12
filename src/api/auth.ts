import { privateApi } from "./index";
import { useAuthStore } from "@/store/auth-store";

// Cache the refresh promise so concurrent calls return the same network request
let refreshPromise: Promise<string> | null = null;

export const refreshAuth = async (): Promise<string> => {
  if (refreshPromise) {
    return refreshPromise;
  }

  refreshPromise = (async () => {
    try {
      // Must use privateApi (withCredentials: true) so the browser
      // sends the stored HttpOnly refreshToken cookie with the request
      const response = await privateApi.post("/auth/refresh");

      // Handle potential nested structures based on robust token parsing
      const newAccessToken =
        response.data?.accessToken ||
        response.data?.token ||
        response.data?.data?.accessToken ||
        response.data?.data?.token;

      if (!newAccessToken) {
        console.error("Refresh token API succeeded but returned no access token:", response.data);
        throw new Error("No access token in refresh response");
      }

      useAuthStore.getState().setAccessToken(newAccessToken);
      return newAccessToken;
    } catch (error) {
      console.error("Silent token refresh failed, clearing auth state:", error);
      useAuthStore.getState().logout();
      throw error;
    } finally {
      // Clear the promise cache so subsequent calls can trigger a new refresh if needed
      refreshPromise = null;
    }
  })();

  return refreshPromise;
};

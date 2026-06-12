import { privateApi } from "@/api";
import { useAuthStore } from "@/store/auth-store";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useLoginMutation = () => {
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const setDeviceId = useAuthStore((state) => state.setDeviceId);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (credentials: Record<string, string>) => {
      // Must use privateApi (withCredentials: true) so the browser
      // stores the HttpOnly refreshToken cookie from the Set-Cookie header
      const response = await privateApi.post("/auth/login", credentials);
      console.log("Login API response:", response.data);
      return response.data;
    },
    onSuccess: (data) => {
      // Handle cases where the token might be nested under `data` or named `token` instead of `accessToken`
      const token =
        data?.accessToken ||
        data?.token ||
        data?.data?.accessToken ||
        data?.data?.token;
      const deviceId = data?.data?.deviceId;

      console.log(data, "response---");

      if (deviceId) {
        setDeviceId(deviceId);
      }

      if (!token) {
        console.error(
          "Failed to extract access token from response data:",
          data,
        );
      }

      setAccessToken(token || null);
      queryClient.clear(); // Wipe the cache clean of any old data
    },
  });
};

export const useLogoutMutation = () => {
  const logout = useAuthStore((state) => state.logout);
  const deviceId = useAuthStore((state) => state.deviceId);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await privateApi.post("/auth/logout", { deviceId });
      console.log("Logout API response:", response.data);
      return response.data;
    },
    onSuccess: () => {
      logout();
      queryClient.clear(); // Wipe the cache clean of any old data
    },
  });
};

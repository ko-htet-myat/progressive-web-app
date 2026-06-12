import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  accessToken: string | null;
  deviceId: string | null;
  isAuthenticated: boolean;
  setAccessToken: (token: string | null) => void;
  setDeviceId: (id: string | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      deviceId: null,
      isAuthenticated: false,
      setAccessToken: (token) =>
        set({
          accessToken: token,
          isAuthenticated: !!token,
        }),
      setDeviceId: (id) => set({ deviceId: id }),
      logout: () =>
        set({
          accessToken: null,
          isAuthenticated: false,
          deviceId: null,
        }),
    }),
    {
      name: "auth-storage", // unique name for localStorage key
      partialize: (state) => ({ deviceId: state.deviceId }), // Only persist deviceId
    }
  )
);

import { refreshAuth } from "@/api/auth";
import SettingsGrid from "@/components/setting-cards";
import { useAuthStore } from "@/store/auth-store";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  beforeLoad: async () => {
    const isAuthenticated = useAuthStore.getState().isAuthenticated;
    const deviceId = useAuthStore.getState().deviceId;
    if (!isAuthenticated) {
      try {
        if (!deviceId) throw new Error("No Token");
        await refreshAuth();
      } catch (error) {
        throw redirect({
          to: "/login",
        });
      }
    }
  },
  component: Index,
});

function Index() {
  return <SettingsGrid />;
}

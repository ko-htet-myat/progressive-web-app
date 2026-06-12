import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { useAuthStore } from "@/store/auth-store";
import { refreshAuth } from "@/api/auth";

export const Route = createFileRoute("/_app")({
  beforeLoad: async () => {
    // Read state directly from Zustand store to bypass React's async context update cycle
    const isAuthenticated = useAuthStore.getState().isAuthenticated;
    const deviceId = useAuthStore.getState().deviceId;
    if (!isAuthenticated) {
      try {
        if (!deviceId) throw new Error("No Token");
        await refreshAuth();
      } catch (error) {
        // Refresh failed (no cookie or expired), throw redirect
        throw redirect({
          to: "/login",
          search: {
            redirect: window.location.pathname,
          },
        });
      }
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <Outlet />
    </div>
  );
}

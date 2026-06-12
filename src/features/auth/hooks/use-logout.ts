import { refreshAuth } from "@/api/auth";
import { useLogoutMutation } from "@/api/endpoints/auth/mutations";
import { useAuthStore } from "@/store/auth-store";
import { useNavigate } from "@tanstack/react-router";

export function useLogout() {
  const logoutMutation = useLogoutMutation();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const navigate = useNavigate();
  const logout = async () => {
    try {
      await logoutMutation.mutateAsync();
      navigate({ to: "/login" });
    } catch (error) {
      console.log(error);
    }
  };
  const reFresh = async () => {
    try {
      await refreshAuth();
    } catch (error) {
      console.log(error);
    }
  };

  return { logout, reFresh, isAuthenticated };
}

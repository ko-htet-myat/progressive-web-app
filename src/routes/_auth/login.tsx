import LoginForm from "@/features/auth/components/login-form";
import { useAuthStore } from "@/store/auth-store";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { z } from "zod";

const loginSearchSchema = z.object({
  redirect: z.string().optional(),
});

export const Route = createFileRoute("/_auth/login")({
  validateSearch: loginSearchSchema,
  beforeLoad: ({ search }) => {
    if (useAuthStore.getState().isAuthenticated) {
      throw redirect({
        to: search.redirect || "/",
      });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <LoginForm />;
}


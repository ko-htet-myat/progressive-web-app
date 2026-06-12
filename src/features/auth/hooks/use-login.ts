import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { useLoginMutation } from "@/api/endpoints/auth/mutations";
import { loginSchema } from "../schemas/login.schema";
import type { LoginInput } from "../schemas/login.schema";

export function useLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  // Get redirect path from URL search params safely
  const search = useSearch({ from: "/_auth/login" });
  const loginMutation = useLoginMutation();

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginInput) => {
    try {
      await loginMutation.mutateAsync({
        email: values.email,
        password: values.password,
      });

      const target = search.redirect || "/";
      navigate({ to: target });
    } catch (error) {
      // Error is already globally logged via mutation interceptor, but we can set form errors or show alerts here
      form.setError("root", {
        message: error instanceof Error ? error.message : "Invalid credentials",
      });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    isLoading: loginMutation.isPending,
    error: loginMutation.error,
    showPassword,
    togglePasswordVisibility,
  };
}

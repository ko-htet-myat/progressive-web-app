import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useLogin } from "../hooks/use-login";

export default function LoginForm() {
  const {
    form: {
      register,
      formState: { errors },
    },
    onSubmit,
    isLoading,
    showPassword,
    togglePasswordVisibility,
  } = useLogin();

  return (
    <div className="min-h-screen w-full grid place-items-center text-zinc-900 font-sans p-2 sm:p-6 md:p-12 relative overflow-hidden">
      {/* Right Form Side Column */}
      <Card className=" w-full max-w-md mx-auto lg:mx-0 flex flex-col justify-center">
        <CardContent>
          {/* Header specific to desktop view pane */}
          <h2 className="text-3xl text-center font-semibold tracking-tight text-black mb-8">
            Sign in
          </h2>

          <form onSubmit={onSubmit} className="space-y-4">
            {/* Global / Root Form Error */}
            {errors.root && (
              <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl">
                {errors.root.message}
              </div>
            )}

            {/* Email / Username Field */}
            <div className="relative">
              <Input
                type="text"
                placeholder="Enter email or user name"
                aria-invalid={!!errors.email}
                className="w-full h-14 px-5 rounded-xl border-none bg-[#EEF0FF] text-indigo-950 placeholder:text-indigo-400/70 focus-visible:ring-2 focus-visible:ring-indigo-400 transition-all text-base"
                {...register("email")}
              />
              {errors.email && (
                <span className="text-xs text-red-500 mt-1 block pl-2">
                  {errors.email.message}
                </span>
              )}
            </div>

            {/* Password Field with Hide/Show switch toggle */}
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                aria-invalid={!!errors.password}
                className="w-full h-14 pl-5 pr-12 rounded-xl border-none bg-[#EEF0FF] text-indigo-950 placeholder:text-indigo-400/70 focus-visible:ring-2 focus-visible:ring-indigo-400 transition-all text-base"
                {...register("password")}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-4 top-7 -translate-y-1/2 text-indigo-400 hover:text-indigo-600 transition-colors focus:outline-none"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5 opacity-80" />
                ) : (
                  <Eye className="w-5 h-5 opacity-80" />
                )}
              </button>
              {errors.password && (
                <span className="text-xs text-red-500 mt-1 block pl-2">
                  {errors.password.message}
                </span>
              )}
            </div>

            {/* "Forgot" password hint element */}
            <div className="text-right">
              <a
                href="#"
                className="text-xs text-zinc-400 hover:text-zinc-600 transition-colors"
              >
                Forgot password ?
              </a>
            </div>

            {/* Custom Deep Purple Drop-Shadow Login Button */}
            <div className="pt-4">
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-14 rounded-xl bg-[#4D47C3] hover:bg-[#403ba6] text-white font-medium text-base shadow-[0_10px_25px_-5px_rgba(77,71,195,0.4)] transition-all disabled:opacity-75 disabled:pointer-events-none"
              >
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen w-full grid place-items-center bg-white text-zinc-900 font-sans p-6 md:p-12 relative overflow-hidden">
      {/* Right Form Side Column */}
      <section className="lg:col-span-5 w-full max-w-md mx-auto lg:mx-0 flex flex-col justify-center">
        {/* Header specific to desktop view pane */}
        <h2 className=" text-3xl text-center font-semibold tracking-tight text-black mb-8">
          Sign in
        </h2>

        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          {/* Email / Username Field */}
          <div className="relative">
            <Input
              type="text"
              placeholder="Enter email or user name"
              className="w-full h-14 px-5 rounded-xl border-none bg-[#EEF0FF] text-indigo-950 placeholder:text-indigo-400/70 focus-visible:ring-2 focus-visible:ring-indigo-400 transition-all text-base"
            />
          </div>

          {/* Password Field with Hide/Show switch toggle */}
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full h-14 pl-5 pr-12 rounded-xl border-none bg-[#EEF0FF] text-indigo-950 placeholder:text-indigo-400/70 focus-visible:ring-2 focus-visible:ring-indigo-400 transition-all text-base"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-indigo-400 hover:text-indigo-600 transition-colors focus:outline-none"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5 opacity-80" />
              ) : (
                <Eye className="w-5 h-5 opacity-80" />
              )}
            </button>
          </div>

          {/* "Forgor" password hint element */}
          <div className="text-right">
            <a
              href="#"
              className="text-xs text-zinc-400 hover:text-zinc-600 transition-colors"
            >
              Forgor password ?
            </a>
          </div>

          {/* Custom Deep Purple Drop-Shadow Login Button */}
          <div className="pt-4">
            <Button
              type="submit"
              className="w-full h-14 rounded-xl bg-[#4D47C3] hover:bg-[#403ba6] text-white font-medium text-base shadow-[0_10px_25px_-5px_rgba(77,71,195,0.4)] transition-all"
            >
              Login
            </Button>
          </div>
        </form>
      </section>
    </div>
  );
}

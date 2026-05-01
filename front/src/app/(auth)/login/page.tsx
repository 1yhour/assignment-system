"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import AuthShell from "@/components/ui/AuthShell";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <AuthShell
      heading="Welcome back"
      subheading="Sign in to continue to your dashboard"
      quote={{
        text: "This platform cut our reporting time in half. The interface is clean, fast, and actually enjoyable to use.",
        author: "Sarah Lin",
        role: "Head of Operations, Meridian",
      }}
    >
      <div className="space-y-5">
        <div className="space-y-1.5">
          <Label htmlFor="email" className="text-slate-700 font-medium text-sm">
            Email address
          </Label>
          <Input
            type="email"
            id="email"
            placeholder="you@example.com"
            className="h-11 bg-slate-50 border-slate-200 focus:bg-white rounded-lg"
          />
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between items-center">
            <Label htmlFor="password" className="text-slate-700 font-medium text-sm">
              Password
            </Label>
            <Link href="/forgot-password" className="text-xs text-indigo-600 hover:text-indigo-800 font-medium">
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="••••••••"
              className="h-11 bg-slate-50 border-slate-200 focus:bg-white rounded-lg pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Checkbox id="remember" className="border-slate-300 data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600" />
          <label htmlFor="remember" className="text-sm text-slate-500 cursor-pointer select-none">
            Remember me for 30 days
          </label>
        </div>

        <Button onClick={() => router.push("/")} className="w-full h-11 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg flex items-center justify-center gap-2 group">
          Sign in
          <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
        </Button>

        <p className="text-center text-sm text-slate-500 pt-2">
          Don't have an account?{" "}
          <Link href="/register" className="text-indigo-600 font-semibold hover:text-indigo-800">
            Create one free
          </Link>
        </p>
      </div>
    </AuthShell>
  );
}
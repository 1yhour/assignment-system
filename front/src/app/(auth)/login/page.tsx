"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, ArrowRight, Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import AuthShell from "@/components/ui/AuthShell";
import { useAuth } from "@/hooks/useAuth";

export default function LoginPage() {
  const { login, errors, clearErrors } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await login({ email, password });
    } catch {
      // errors are set in context
    } finally {
      setSubmitting(false);
    }
  }

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
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* General error */}
        {errors.general && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
            {errors.general[0]}
          </div>
        )}

        <div className="space-y-1.5">
          <Label htmlFor="email" className="text-slate-700 font-medium text-sm">
            Email address
          </Label>
          <Input
            type="email"
            id="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => { setEmail(e.target.value); clearErrors(); }}
            className="h-11 bg-slate-50 border-slate-200 text-black focus:bg-white rounded-lg"
            required
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email[0]}</p>
          )}
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
              value={password}
              onChange={(e) => { setPassword(e.target.value); clearErrors(); }}
              className="h-11 bg-slate-50 border-slate-200 text-black focus:bg-white rounded-lg pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password[0]}</p>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Checkbox id="remember" className="border-slate-300 data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600" />
          <label htmlFor="remember" className="text-sm text-slate-500 cursor-pointer select-none">
            Remember me for 30 days
          </label>
        </div>

        <Button
          type="submit"
          disabled={submitting}
          className="w-full h-11 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg flex items-center justify-center gap-2 group"
        >
          {submitting ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <>
              Sign in
              <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </>
          )}
        </Button>

        <p className="text-center text-sm text-slate-500 pt-2">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-indigo-600 font-semibold hover:text-indigo-800">
            Create one free
          </Link>
        </p>
      </form>
    </AuthShell>
  );
}
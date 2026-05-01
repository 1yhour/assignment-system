"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AuthShell from "@/components/ui/AuthShell";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <AuthShell
      heading="Create an account"
      subheading="Start your free trial — no credit card required"
      quote={{
        text: "Onboarding took minutes, not days. We were up and running before lunch.",
        author: "James Okafor",
        role: "CTO, Luminary Labs",
      }}
    >
      <div className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="firstName" className="text-slate-700 font-medium text-sm">
              First name
            </Label>
            <Input
              id="firstName"
              placeholder="Jane"
              className="h-11 bg-slate-50 border-slate-200 focus:bg-white rounded-lg"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="lastName" className="text-slate-700 font-medium text-sm">
              Last name
            </Label>
            <Input
              id="lastName"
              placeholder="Doe"
              className="h-11 bg-slate-50 border-slate-200 focus:bg-white rounded-lg"
            />
          </div>
        </div>

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
          <Label htmlFor="password" className="text-slate-700 font-medium text-sm">
            Password
          </Label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Min. 8 characters"
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

        <Button className="w-full h-11 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg flex items-center justify-center gap-2 group">
          Create account
          <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
        </Button>

        <p className="text-center text-xs text-slate-400 leading-relaxed">
          By creating an account you agree to our{" "}
          <Link href="/terms" className="text-indigo-600 hover:underline">Terms</Link>{" "}
          and{" "}
          <Link href="/privacy" className="text-indigo-600 hover:underline">Privacy Policy</Link>.
        </p>

        <p className="text-center text-sm text-slate-500">
          Already have an account?{" "}
          <Link href="/login" className="text-indigo-600 font-semibold hover:text-indigo-800">
            Sign in
          </Link>
        </p>
      </div>
    </AuthShell>
  );
}
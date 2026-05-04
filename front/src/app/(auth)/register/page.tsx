"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, ArrowRight, Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AuthShell from "@/components/ui/AuthShell";
import { useAuth } from "@/hooks/useAuth";

export default function RegisterPage() {
  const { register, errors, clearErrors } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [role, setRole] = useState<"student" | "teacher">("student");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await register({ name, email, password, password_confirmation: passwordConfirmation, role });
    } catch { /* errors set in context */ } finally { setSubmitting(false); }
  }

  return (
    <AuthShell heading="Create an account" subheading="Join LabFlow — start managing assignments today"
      quote={{ text: "Onboarding took minutes, not days. We were up and running before lunch.", author: "James Okafor", role: "CTO, Luminary Labs" }}>
      <form onSubmit={handleSubmit} className="space-y-5">
        {errors.general && (<div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">{errors.general[0]}</div>)}

        <div className="space-y-1.5">
          <Label htmlFor="name" className="text-slate-700 font-medium text-sm">Full name</Label>
          <Input id="name" placeholder="Jane Doe" value={name} onChange={(e) => { setName(e.target.value); clearErrors(); }} className="h-11 bg-slate-50 border-slate-200 focus:bg-white text-black rounded-lg" required />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name[0]}</p>}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="email" className="text-slate-700 font-medium text-sm">Email address</Label>
          <Input type="email" id="email" placeholder="you@example.com" value={email} onChange={(e) => { setEmail(e.target.value); clearErrors(); }} className="h-11 bg-slate-50 border-slate-200 focus:bg-white text-black rounded-lg" required />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email[0]}</p>}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="password" className="text-slate-700 font-medium text-sm">Password</Label>
          <div className="relative">
            <Input type={showPassword ? "text" : "password"} id="password" placeholder="Min. 8 characters" value={password} onChange={(e) => { setPassword(e.target.value); clearErrors(); }} className="h-11 bg-slate-50 border-slate-200 focus:bg-white text-black rounded-lg pr-10" required />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password[0]}</p>}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="password_confirmation" className="text-slate-700 font-medium text-sm">Confirm password</Label>
          <Input type={showPassword ? "text" : "password"} id="password_confirmation" placeholder="Re-enter your password" value={passwordConfirmation} onChange={(e) => { setPasswordConfirmation(e.target.value); clearErrors(); }} className="h-11 bg-slate-50 border-slate-200 text-black focus:bg-white rounded-lg" required />
        </div>

        <div className="space-y-2">
          <Label className="text-slate-700 font-medium text-sm">I am a…</Label>
          <div className="grid grid-cols-2 gap-3">
            <button type="button" onClick={() => setRole("student")} className={`px-4 py-3 rounded-xl border-2 text-sm font-semibold transition-all ${role === "student" ? "border-indigo-600 bg-indigo-50 text-indigo-700 shadow-sm" : "border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300"}`}>🎓 Student</button>
            <button type="button" onClick={() => setRole("teacher")} className={`px-4 py-3 rounded-xl border-2 text-sm font-semibold transition-all ${role === "teacher" ? "border-indigo-600 bg-indigo-50 text-indigo-700 shadow-sm" : "border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300"}`}>📚 Teacher</button>
          </div>
          {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role[0]}</p>}
        </div>

        <Button type="submit" disabled={submitting} className="w-full h-11 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg flex items-center justify-center gap-2 group">
          {submitting ? <Loader2 size={16} className="animate-spin" /> : (<>Create account<ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" /></>)}
        </Button>

        <p className="text-center text-xs text-slate-400 leading-relaxed">
          By creating an account you agree to our <Link href="/terms" className="text-indigo-600 hover:underline">Terms</Link> and <Link href="/privacy" className="text-indigo-600 hover:underline">Privacy Policy</Link>.
        </p>
        <p className="text-center text-sm text-slate-500">
          Already have an account? <Link href="/login" className="text-indigo-600 font-semibold hover:text-indigo-800">Sign in</Link>
        </p>
      </form>
    </AuthShell>
  );
}
import Link from "next/link";
import { ArrowLeft, Send } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AuthShell from "@/components/ui/AuthShell"
export default function ForgotPasswordPage() {
  return (
    <AuthShell
      heading="Reset your password"
      subheading="Enter your email and we'll send you a reset link"
      quote={{
        text: "Support was instant. Even account recovery was smooth and stress-free.",
        author: "Priya Menon",
        role: "Product Lead, Arkive",
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

        <Button className="w-full h-11 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg flex items-center justify-center gap-2 group">
          Send reset link
          <Send size={15} className="group-hover:translate-x-0.5 transition-transform" />
        </Button>

        <Link
          href="/login"
          className="flex items-center justify-center gap-2 text-sm text-slate-500 hover:text-slate-700 transition-colors"
        >
          <ArrowLeft size={14} />
          Back to sign in
        </Link>
      </div>
    </AuthShell>
  );
}
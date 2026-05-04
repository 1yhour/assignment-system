"use client";

import Link from "next/link";
import { ShieldX } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";

export default function UnauthorizedPage() {
  const { role } = useAuth();

  const dashboardHref = role === "admin" ? "/admin" : role === "teacher" ? "/teacher" : "/student";

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4" style={{ fontFamily: "var(--font-geist-sans)" }}>
      <div className="text-center max-w-md">
        <div className="mx-auto mb-6 w-20 h-20 rounded-2xl bg-red-100 flex items-center justify-center">
          <ShieldX size={40} className="text-red-500" />
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Access Denied</h1>
        <p className="text-slate-500 mb-8">You don&apos;t have permission to view this page. Contact your administrator if you believe this is an error.</p>
        <Link href={dashboardHref}>
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg px-8 h-11">
            Go to my dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
}

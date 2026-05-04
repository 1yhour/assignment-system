"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

/**
 * Home page — redirects to the role-appropriate dashboard.
 * Shows a loading spinner while the auth state is hydrating.
 */
export default function HomePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (!user) { router.replace("/login"); return; }
    switch (user.role) {
      case "admin":   router.replace("/admin");   break;
      case "teacher": router.replace("/teacher"); break;
      case "student": router.replace("/student"); break;
      default:        router.replace("/login");   break;
    }
  }, [user, loading, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <Loader2 size={32} className="animate-spin text-indigo-600" />
    </div>
  );
}

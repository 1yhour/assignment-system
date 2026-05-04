"use client";

import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export default function AdminDashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Topbar */}
      <div className="sticky top-0 z-10 bg-white border-b border-slate-200 px-8 py-5 flex items-center justify-between shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-slate-800" style={{ fontFamily: 'var(--font-dm-serif),serif' }}>
            Admin Dashboard
          </h1>
          <p className="text-sm text-slate-500 mt-1">System overview &amp; management</p>
        </div>
        <Button onClick={logout} variant="outline" className="flex items-center gap-2 text-slate-600 hover:text-red-600 border-slate-200">
          <LogOut size={16} /> Sign out
        </Button>
      </div>

      <div className="p-8">
        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-7">
          {[
            { label: "Total Users", value: "—", note: "All roles", color: "indigo" },
            { label: "Active Courses", value: "—", note: "This semester", color: "blue" },
            { label: "Total Submissions", value: "—", note: "All time", color: "green" },
            { label: "Pending Reviews", value: "—", note: "Needs attention", color: "amber" },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{s.label}</p>
              <p className="text-3xl font-bold text-slate-800 mt-1">{s.value}</p>
              <p className="text-xs text-slate-500 mt-1">{s.note}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-800 mb-4">Welcome, {user?.name ?? "Admin"}</h2>
          <p className="text-sm text-slate-500">
            This is the admin control center. You have full access to manage users, courses, and system settings. Feature pages will be added here as the platform grows.
          </p>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export default function StudentDashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Topbar */}
      <div className="sticky top-0 z-10 bg-white border-b border-slate-200 px-4 sm:px-8 py-4 sm:py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-0 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-slate-800" style={{ fontFamily: 'var(--font-dm-serif),serif' }}>
            Welcome, {user?.name ?? "Student"}
          </h1>
          <p className="text-sm text-slate-500 mt-1">Your enrolled labs and assignments</p>
        </div>
        <Button onClick={logout} variant="outline" className="flex items-center gap-2 text-slate-600 hover:text-red-600 border-slate-200">
          <LogOut size={16} /> Sign out
        </Button>
      </div>

      <div className="p-4 sm:p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-7">
          {[
            { label: "Enrolled Courses", value: "—", note: "This semester" },
            { label: "Pending Assignments", value: "—", note: "Due soon" },
            { label: "Average Grade", value: "—", note: "All courses" },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{s.label}</p>
              <p className="text-3xl font-bold text-slate-800 mt-1">{s.value}</p>
              <p className="text-xs text-slate-500 mt-1">{s.note}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-800 mb-4">Getting Started</h2>
          <p className="text-sm text-slate-500">
            Your enrolled courses and assignments will appear here once your teacher adds you. Check back soon!
          </p>
        </div>
      </div>
    </div>
  );
}

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Portal — LabFlow',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden" style={{ fontFamily: 'var(--font-geist-sans)' }}>
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col shrink-0">
        <div className="h-16 flex items-center px-6 border-b border-slate-200">
          <span className="text-lg font-black tracking-tight text-slate-900">LabFlow</span>
          <span className="text-indigo-600 font-black ml-0.5 text-2xl">.</span>
          <span className="ml-2 text-xs font-semibold bg-red-100 text-red-700 px-2 py-0.5 rounded-full">Admin</span>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-1">
          <a href="/admin" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold bg-indigo-50 text-indigo-700">
            <span>📊</span> Dashboard
          </a>
          <a href="/admin" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50">
            <span>👥</span> Users
          </a>
          <a href="/admin" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50">
            <span>📚</span> Courses
          </a>
          <a href="/admin" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50">
            <span>⚙️</span> Settings
          </a>
        </nav>
      </aside>

      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}

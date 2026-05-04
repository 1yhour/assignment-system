import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Portal — LabFlow',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col md:flex-row h-screen bg-slate-50 overflow-hidden" style={{ fontFamily: 'var(--font-geist-sans)' }}>
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white border-b md:border-b-0 md:border-r border-slate-200 flex flex-col md:h-screen sticky top-0 z-50 shrink-0">
        <div className="py-4 md:py-0 md:h-16 flex items-center px-4 md:px-6 border-b border-slate-200 shrink-0">
          <span className="text-lg font-black tracking-tight text-slate-900">LabFlow</span>
          <span className="text-indigo-600 font-black ml-0.5 text-2xl">.</span>
          <span className="ml-2 text-xs font-semibold bg-red-100 text-red-700 px-2 py-0.5 rounded-full">Admin</span>
        </div>
        <nav className="flex-1 p-3 md:px-4 md:py-6 flex md:flex-col overflow-x-auto md:overflow-y-auto space-x-2 md:space-x-0 md:space-y-1 hide-scrollbar shrink-0">
          <a href="/admin" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold bg-indigo-50 text-indigo-700 shrink-0 md:w-full">
            <span>📊</span> Dashboard
          </a>
          <a href="/admin" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 shrink-0 md:w-full">
            <span>👥</span> Users
          </a>
          <a href="/admin" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 shrink-0 md:w-full">
            <span>📚</span> Courses
          </a>
          <a href="/admin" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 shrink-0 md:w-full">
            <span>⚙️</span> Settings
          </a>
        </nav>
      </aside>

      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}

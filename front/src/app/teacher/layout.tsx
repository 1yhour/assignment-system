import type { Metadata } from 'next';
import TeacherSidebar from '@/components/teacher/TeacherSidebar';

export const metadata: Metadata = {
  title: 'Teacher Portal — LabFlow',
};

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col md:flex-row h-screen bg-slate-50 overflow-hidden" style={{ fontFamily: 'var(--font-geist-sans)' }}>
      <TeacherSidebar />
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}

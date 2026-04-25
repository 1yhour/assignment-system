import { TeacherStats } from '@/types/teacher';
import StatCard from '@/components/teacher/StatCard';
import UpcomingDeadlines from '@/components/teacher/UpcomingDeadlines';
import SubmissionRates from '@/components/teacher/SubmissionRates';

// In production: fetch from your Laravel API
async function getTeacherStats(): Promise<TeacherStats> {
  // const res = await fetch('/api/teacher/stats', { cache: 'no-store' });
  // return res.json();
  return {
    activeLabs: 7, pendingReviews: 24,
    gradedThisWeek: 38, lateSubmissions: 5, avgScore: 76,
  };
}

export default async function TeacherDashboard() {
  const stats = await getTeacherStats();

  return (
    <div>
      {/* Topbar */}
      <div className="sticky top-0 z-10 bg-[#0d0f12] border-b border-[#272c3a] px-8 py-5
                      flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white" style={{fontFamily:'var(--font-dm-serif),serif'}}>
            Good morning, Dr. Rivera
          </h1>
          <p className="text-sm text-[#7a80a0] mt-1">
            3 assignments due this week
          </p>
        </div>
        <a href="/teacher/create"
           className="flex items-center gap-2 bg-[#f0b429] text-[#0d0f12] font-bold
                      text-sm px-4 py-2 rounded-lg hover:bg-[#e0a820] transition-colors">
          + New Lab
        </a>
      </div>

      <div className="p-8">
        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-7">
          <StatCard label="Active Labs"        value={stats.activeLabs}      note="Across 3 courses"  accent="gold" />
          <StatCard label="Pending Reviews"    value={stats.pendingReviews}  note="↑ 6 since yesterday" accent="blue" />
          <StatCard label="Graded This Week"   value={stats.gradedThisWeek}  note="Avg 76/100"        accent="green" />
          <StatCard label="Late Submissions"   value={stats.lateSubmissions} note="Needs attention"   accent="red" />
        </div>

        <div className="grid grid-cols-2 gap-5">
          <UpcomingDeadlines />
          <SubmissionRates />
        </div>
      </div>
    </div>
  );
}
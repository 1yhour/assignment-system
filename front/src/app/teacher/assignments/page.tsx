import { LabAssignment } from '@/types/teacher';
import Link from 'next/link';
import { FlaskConical, Clock, Users, BookOpen } from 'lucide-react';

async function getAssignments(): Promise<LabAssignment[]> {
  return [
    {
      id: '1', courseId: 'web301', createdBy: 'teacher1',
      title: 'Lab 5 — REST API with Express',
      description: 'Build a RESTful API using Express.js with CRUD operations.',
      gradingPoints: 100, deadline: '2026-04-28T23:59:00Z',
      isPublished: true, submissionsCount: 18, totalStudents: 24,
      createdAt: '2026-04-20T08:00:00Z',
      course: { id: 'web301', title: 'Web Development', code: 'WEB301', createdBy: 'teacher1' },
    },
    {
      id: '2', courseId: 'db201', createdBy: 'teacher1',
      title: 'Lab 3 — SQL Joins & Aggregation',
      description: 'Practice complex SQL joins, subqueries and window functions.',
      gradingPoints: 80, deadline: '2026-04-30T23:59:00Z',
      isPublished: true, submissionsCount: 9, totalStudents: 20,
      createdAt: '2026-04-18T08:00:00Z',
      course: { id: 'db201', title: 'Database Systems', code: 'DB201', createdBy: 'teacher1' },
    },
    {
      id: '3', courseId: 'ai401', createdBy: 'teacher1',
      title: 'Lab 2 — Linear Regression from Scratch',
      description: 'Implement gradient descent without ML libraries.',
      gradingPoints: 120, deadline: '2026-05-05T23:59:00Z',
      isPublished: false, submissionsCount: 0, totalStudents: 15,
      createdAt: '2026-04-22T08:00:00Z',
      course: { id: 'ai401', title: 'Machine Learning', code: 'AI401', createdBy: 'teacher1' },
    },
  ];
}

function deadlineLabel(iso: string) {
  const d = new Date(iso);
  const diff = Math.ceil((d.getTime() - Date.now()) / 86_400_000);
  if (diff < 0)  return { text: 'Overdue',       color: 'text-red-500' };
  if (diff === 0) return { text: 'Due today',    color: 'text-amber-500' };
  if (diff <= 3)  return { text: `${diff}d left`, color: 'text-amber-500' };
  return { text: `${diff}d left`, color: 'text-emerald-600' };
}

export default async function AssignmentsPage() {
  const labs = await getAssignments();

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Topbar */}
      <div className="sticky top-0 z-10 bg-white border-b border-slate-200 px-8 py-5
                      flex items-center justify-between shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-slate-800" style={{ fontFamily: 'DM Serif Display,serif' }}>
            My Assignments
          </h1>
          <p className="text-sm text-slate-500 mt-1">{labs.length} lab assignments</p>
        </div>
        <Link href="/teacher/create"
              className="flex items-center gap-2 bg-indigo-600 text-white font-bold
                         text-sm px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm">
          + New Lab
        </Link>
      </div>

      <div className="p-8 space-y-4">
        {labs.map(lab => {
          const dl = deadlineLabel(lab.deadline);
          const submitted = lab.submissionsCount ?? 0;
          const total     = lab.totalStudents ?? 0;
          const pct       = total > 0 ? Math.round((submitted / total) * 100) : 0;

          return (
            <div key={lab.id}
                 className="bg-white border border-slate-200 rounded-xl p-5
                            hover:border-indigo-300 hover:shadow-md transition-all">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center flex-shrink-0">
                    <FlaskConical size={18} className="text-indigo-600"/>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-[15px] text-slate-800">{lab.title}</span>
                      <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full
                        ${lab.isPublished
                          ? 'bg-emerald-50 text-emerald-600'
                          : 'bg-slate-100 text-slate-500'}`}>
                        {lab.isPublished ? 'Published' : 'Draft'}
                      </span>
                    </div>
                    <p className="text-[13px] text-slate-500 mt-1 max-w-xl">{lab.description}</p>

                    <div className="flex items-center gap-5 mt-3 text-[12.5px] text-slate-500">
                      <span className="flex items-center gap-1.5">
                        <BookOpen size={13}/> {lab.course?.code}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock size={13}/>
                        <span className={dl.color}>{dl.text}</span>
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Users size={13}/> {submitted}/{total} submitted
                      </span>
                      <span>{lab.gradingPoints} pts</span>
                    </div>

                    {/* Progress bar */}
                    <div className="mt-3 w-64 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-500 rounded-full transition-all"
                           style={{ width: `${pct}%` }}/>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1">{pct}% submission rate</div>
                  </div>
                </div>

                <div className="flex gap-2 flex-shrink-0">
                  <Link href={`/teacher/submissions?lab=${lab.id}`}
                        className="border border-slate-200 text-[12px] font-semibold px-3 py-1.5
                                   rounded-lg hover:border-indigo-400 hover:text-indigo-600 transition-colors text-slate-600">
                    View Submissions
                  </Link>
                  <Link href={`/teacher/create?edit=${lab.id}`}
                        className="border border-slate-200 text-[12px] font-semibold px-3 py-1.5
                                   rounded-lg hover:border-indigo-400 hover:text-indigo-600 transition-colors text-slate-600">
                    Edit
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
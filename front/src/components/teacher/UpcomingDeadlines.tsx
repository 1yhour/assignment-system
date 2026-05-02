import { Clock, FlaskConical } from 'lucide-react';

const DEADLINES = [
  { title: 'Lab 5 — REST API with Express', course: 'WEB301', daysLeft: 4,  submitted: 18, total: 24 },
  { title: 'Lab 3 — SQL Joins & Aggregation', course: 'DB201',  daysLeft: 6,  submitted:  9, total: 20 },
  { title: 'Lab 2 — Linear Regression',       course: 'AI401',  daysLeft: 11, submitted:  0, total: 15 },
];

export default function UpcomingDeadlines() {
  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
      <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
        <span className="font-bold text-sm text-slate-700">Upcoming Deadlines</span>
        <Clock size={14} className="text-slate-400"/>
      </div>
      <div className="divide-y divide-slate-100">
        {DEADLINES.map((d, i) => {
          const pct = Math.round((d.submitted / d.total) * 100);
          const color = d.daysLeft <= 3 ? 'text-red-500' : d.daysLeft <= 7 ? 'text-amber-500' : 'text-emerald-600';
          return (
            <div key={i} className="px-5 py-4">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <FlaskConical size={14} className="text-indigo-500 flex-shrink-0 mt-0.5"/>
                  <div>
                    <div className="text-[13px] font-semibold text-slate-800">{d.title}</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">{d.course}</div>
                  </div>
                </div>
                <span className={`text-[12px] font-bold flex-shrink-0 ${color}`}>
                  {d.daysLeft}d left
                </span>
              </div>
              <div className="mt-3">
                <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                  <span>{d.submitted}/{d.total} submitted</span>
                  <span>{pct}%</span>
                </div>
                <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${pct}%` }}/>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

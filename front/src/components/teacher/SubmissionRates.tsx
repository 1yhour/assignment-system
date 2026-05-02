'use client';

const DATA = [
  { course: 'WEB301', lab: 'Lab 5', submitted: 18, total: 24, onTime: 15, late: 3 },
  { course: 'DB201',  lab: 'Lab 3', submitted:  9, total: 20, onTime:  8, late: 1 },
  { course: 'AI401',  lab: 'Lab 2', submitted:  0, total: 15, onTime:  0, late: 0 },
];

export default function SubmissionRates() {
  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
      <div className="px-5 py-4 border-b border-slate-100">
        <span className="font-bold text-sm text-slate-700">Submission Rates</span>
      </div>
      <div className="p-5 space-y-4">
        {DATA.map((d, i) => {
          const pct     = d.total > 0 ? Math.round((d.submitted / d.total) * 100) : 0;
          const latePct = d.submitted > 0 ? Math.round((d.late / d.submitted) * 100) : 0;
          return (
            <div key={i}>
              <div className="flex justify-between items-center mb-1.5">
                <div>
                  <span className="text-[13px] font-semibold text-slate-800">{d.course}</span>
                  <span className="text-[12px] text-slate-400 ml-2">{d.lab}</span>
                </div>
                <div className="flex items-center gap-3 text-[12px]">
                  <span className="text-emerald-600">{d.submitted} submitted</span>
                  {d.late > 0 && (
                    <span className="text-red-400">{d.late} late</span>
                  )}
                  <span className="text-slate-400">/ {d.total}</span>
                </div>
              </div>
              {/* Stacked bar */}
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden flex">
                {d.submitted > 0 && (
                  <>
                    <div className="h-full bg-indigo-500 transition-all"
                         style={{ width: `${Math.round(((d.submitted - d.late) / d.total) * 100)}%` }}/>
                    {d.late > 0 && (
                      <div className="h-full bg-red-400 transition-all"
                           style={{ width: `${Math.round((d.late / d.total) * 100)}%` }}/>
                    )}
                  </>
                )}
              </div>
              <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                <span>{pct}% submission rate</span>
                {latePct > 0 && <span className="text-red-400">{latePct}% late</span>}
              </div>
            </div>
          );
        })}

        {/* Legend */}
        <div className="flex items-center gap-4 pt-2 text-[11px] text-slate-400">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-sm bg-indigo-500"/>On-time
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-sm bg-red-400"/>Late
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-sm bg-slate-100 border border-slate-200"/>Not submitted
          </div>
        </div>
      </div>
    </div>
  );
}

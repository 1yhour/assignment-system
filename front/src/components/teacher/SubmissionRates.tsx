'use client';

const DATA = [
  { course: 'WEB301', lab: 'Lab 5', submitted: 18, total: 24, onTime: 15, late: 3 },
  { course: 'DB201',  lab: 'Lab 3', submitted:  9, total: 20, onTime:  8, late: 1 },
  { course: 'AI401',  lab: 'Lab 2', submitted:  0, total: 15, onTime:  0, late: 0 },
];

export default function SubmissionRates() {
  return (
    <div className="bg-[#141720] border border-[#272c3a] rounded-xl overflow-hidden">
      <div className="px-5 py-4 border-b border-[#272c3a]">
        <span className="font-bold text-sm">Submission Rates</span>
      </div>
      <div className="p-5 space-y-4">
        {DATA.map((d, i) => {
          const pct     = d.total > 0 ? Math.round((d.submitted / d.total) * 100) : 0;
          const latePct = d.submitted > 0 ? Math.round((d.late / d.submitted) * 100) : 0;
          return (
            <div key={i}>
              <div className="flex justify-between items-center mb-1.5">
                <div>
                  <span className="text-[13px] font-semibold text-white">{d.course}</span>
                  <span className="text-[12px] text-[#7a80a0] ml-2">{d.lab}</span>
                </div>
                <div className="flex items-center gap-3 text-[12px]">
                  <span className="text-[#2ecb7a]">{d.submitted} submitted</span>
                  {d.late > 0 && (
                    <span className="text-[#f06060]">{d.late} late</span>
                  )}
                  <span className="text-[#7a80a0]">/ {d.total}</span>
                </div>
              </div>
              {/* Stacked bar */}
              <div className="h-2 bg-[#272c3a] rounded-full overflow-hidden flex">
                {d.submitted > 0 && (
                  <>
                    <div className="h-full bg-[#2ecb7a] transition-all"
                         style={{ width: `${Math.round(((d.submitted - d.late) / d.total) * 100)}%` }}/>
                    {d.late > 0 && (
                      <div className="h-full bg-[#f06060] transition-all"
                           style={{ width: `${Math.round((d.late / d.total) * 100)}%` }}/>
                    )}
                  </>
                )}
              </div>
              <div className="flex justify-between text-[11px] text-[#7a80a0] mt-1">
                <span>{pct}% submission rate</span>
                {latePct > 0 && <span className="text-[#f06060]">{latePct}% late</span>}
              </div>
            </div>
          );
        })}

        {/* Legend */}
        <div className="flex items-center gap-4 pt-2 text-[11px] text-[#7a80a0]">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-sm bg-[#2ecb7a]"/>On-time
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-sm bg-[#f06060]"/>Late
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-sm bg-[#272c3a]"/>Not submitted
          </div>
        </div>
      </div>
    </div>
  );
}

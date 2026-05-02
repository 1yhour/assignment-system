interface StatCardProps {
  label: string;
  value: number | string;
  note?: string;
  accent: 'indigo' | 'blue' | 'green' | 'red';
}

const accentMap = {
  indigo: { value: 'text-indigo-600', bg: 'bg-indigo-50' },
  blue:   { value: 'text-blue-600',   bg: 'bg-blue-50' },
  green:  { value: 'text-emerald-600', bg: 'bg-emerald-50' },
  red:    { value: 'text-red-500',    bg: 'bg-red-50' },
};

export default function StatCard({ label, value, note, accent }: StatCardProps) {
  const { value: vc, bg } = accentMap[accent];
  return (
    <div className={`${bg} bg-white border border-slate-200 rounded-xl p-5 shadow-sm`}>
      <div className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold">
        {label}
      </div>
      <div className={`${vc} text-[32px] leading-none mt-1.5`}
           style={{fontFamily:'DM Serif Display,serif'}}>
        {value}
      </div>
      {note && <div className="text-[11px] text-slate-400 mt-1.5">{note}</div>}
    </div>
  );
}
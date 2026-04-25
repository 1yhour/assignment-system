interface StatCardProps {
  label: string;
  value: number | string;
  note?: string;
  accent: 'gold' | 'blue' | 'green' | 'red';
}

const accentMap = {
  gold:  { value: 'text-[#f0b429]', bg: 'bg-[#f0b429]/5' },
  blue:  { value: 'text-[#3d8ef0]', bg: 'bg-[#3d8ef0]/5' },
  green: { value: 'text-[#2ecb7a]', bg: 'bg-[#2ecb7a]/5' },
  red:   { value: 'text-[#f06060]', bg: 'bg-[#f06060]/5' },
};

export default function StatCard({ label, value, note, accent }: StatCardProps) {
  const { value: vc, bg } = accentMap[accent];
  return (
    <div className={`${bg} bg-[#141720] border border-[#272c3a] rounded-xl p-5`}>
      <div className="text-[10px] uppercase tracking-widest text-[#7a80a0] font-semibold">
        {label}
      </div>
      <div className={`${vc} text-[32px] leading-none mt-1.5`}
           style={{fontFamily:'DM Serif Display,serif'}}>
        {value}
      </div>
      {note && <div className="text-[11px] text-[#7a80a0] mt-1.5">{note}</div>}
    </div>
  );
}
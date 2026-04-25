'use client';
import { useState } from 'react';
import { Plus, Trash2, GripVertical } from 'lucide-react';

interface Criterion {
  criterion: string;
  maxPoints: number;
}

interface Props {
  criteria: Criterion[];
  onChange: (criteria: Criterion[]) => void;
  total: number;
}

export default function RubricBuilder({ criteria, onChange, total }: Props) {
  const add = () =>
    onChange([...criteria, { criterion: '', maxPoints: 10 }]);

  const remove = (i: number) =>
    onChange(criteria.filter((_, j) => j !== i));

  const update = (i: number, key: keyof Criterion, value: string | number) =>
    onChange(criteria.map((c, j) => j === i ? { ...c, [key]: value } : c));

  const pointsColor =
    total === 100 ? 'text-[#2ecb7a]' :
    total > 100   ? 'text-[#f06060]' : 'text-[#f0b429]';

  return (
    <div className="bg-[#141720] border border-[#272c3a] rounded-xl overflow-hidden">
      <div className="px-5 py-4 border-b border-[#272c3a] flex items-center justify-between">
        <span className="font-bold text-sm">Rubric Builder</span>
        <span className={`font-mono text-[13px] font-bold ${pointsColor}`}>
          {total} / 100 pts
        </span>
      </div>
      <div className="p-5 space-y-2">
        {criteria.map((c, i) => (
          <div key={i} className="flex items-center gap-2">
            <GripVertical size={14} className="text-[#7a80a0] flex-shrink-0 cursor-grab"/>
            <input
              value={c.criterion}
              onChange={e => update(i, 'criterion', e.target.value)}
              placeholder="Criterion name…"
              className="flex-1 bg-[#1c2030] border border-[#272c3a] rounded-lg px-3 py-2
                         text-[12.5px] text-white outline-none focus:border-[#f0b429] transition-colors"
            />
            <input
              type="number" min={0} max={100} value={c.maxPoints}
              onChange={e => update(i, 'maxPoints', +e.target.value)}
              className="w-14 bg-[#1c2030] border border-[#272c3a] rounded-lg px-2 py-2
                         text-[12.5px] text-[#f0b429] font-mono text-center outline-none
                         focus:border-[#f0b429] transition-colors"
            />
            <span className="text-[11px] text-[#7a80a0]">pts</span>
            <button onClick={() => remove(i)}
                    className="text-[#7a80a0] hover:text-[#f06060] transition-colors flex-shrink-0">
              <Trash2 size={13}/>
            </button>
          </div>
        ))}
        <button onClick={add}
                className="w-full mt-2 border border-dashed border-[#272c3a] rounded-lg py-2
                           text-[12px] text-[#7a80a0] hover:border-[#f0b429] hover:text-[#f0b429]
                           transition-all flex items-center justify-center gap-1.5">
          <Plus size={13}/> Add Criterion
        </button>
      </div>

      {total !== 100 && (
        <div className={`mx-5 mb-5 px-3 py-2 rounded-lg text-[12px] font-semibold
          ${total > 100 ? 'bg-[#f06060]/10 text-[#f06060]' : 'bg-[#f0b429]/10 text-[#f0b429]'}`}>
          {total > 100
            ? `Over by ${total - 100} pts — adjust to reach 100`
            : `${100 - total} pts remaining to reach 100`}
        </div>
      )}
    </div>
  );
}
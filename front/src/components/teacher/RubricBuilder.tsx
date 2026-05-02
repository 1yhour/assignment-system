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
    total === 100 ? 'text-emerald-600' :
    total > 100   ? 'text-red-500'     : 'text-amber-500';

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
      <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
        <span className="font-bold text-sm text-slate-700">Rubric Builder</span>
        <span className={`font-mono text-[13px] font-bold ${pointsColor}`}>
          {total} / 100 pts
        </span>
      </div>
      <div className="p-5 space-y-2">
        {criteria.map((c, i) => (
          <div key={i} className="flex items-center gap-2">
            <GripVertical size={14} className="text-slate-300 flex-shrink-0 cursor-grab"/>
            <input
              value={c.criterion}
              onChange={e => update(i, 'criterion', e.target.value)}
              placeholder="Criterion name…"
              className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2
                         text-[12.5px] text-slate-800 outline-none focus:border-indigo-400
                         focus:ring-2 focus:ring-indigo-50 transition-colors placeholder:text-slate-400"
            />
            <input
              type="number" min={0} max={100} value={c.maxPoints}
              onChange={e => update(i, 'maxPoints', +e.target.value)}
              className="w-14 bg-slate-50 border border-slate-200 rounded-lg px-2 py-2
                         text-[12.5px] text-indigo-600 font-mono text-center outline-none
                         focus:border-indigo-400 transition-colors"
            />
            <span className="text-[11px] text-slate-400">pts</span>
            <button onClick={() => remove(i)}
                    className="text-slate-300 hover:text-red-400 transition-colors flex-shrink-0">
              <Trash2 size={13}/>
            </button>
          </div>
        ))}
        <button onClick={add}
                className="w-full mt-2 border border-dashed border-slate-200 rounded-lg py-2
                           text-[12px] text-slate-400 hover:border-indigo-400 hover:text-indigo-600
                           transition-all flex items-center justify-center gap-1.5 bg-white">
          <Plus size={13}/> Add Criterion
        </button>
      </div>

      {total !== 100 && (
        <div className={`mx-5 mb-5 px-3 py-2 rounded-lg text-[12px] font-semibold
          ${total > 100 ? 'bg-red-50 text-red-500' : 'bg-amber-50 text-amber-600'}`}>
          {total > 100
            ? `Over by ${total - 100} pts — adjust to reach 100`
            : `${100 - total} pts remaining to reach 100`}
        </div>
      )}
    </div>
  );
}
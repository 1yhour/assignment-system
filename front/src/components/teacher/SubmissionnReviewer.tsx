'use client';
import { useState } from 'react';
import { Submission, RubricCriterion } from '@/types/teacher';
import {Archive, Check, RefreshCw } from 'lucide-react';

const RUBRIC: RubricCriterion[] = [
  { id:'r1', labId:'', criterion:'Code Quality & Structure',    description:'', maxPoints:30, orderIndex:0 },
  { id:'r2', labId:'', criterion:'Functionality & Correctness', description:'', maxPoints:40, orderIndex:1 },
  { id:'r3', labId:'', criterion:'Documentation & README',      description:'', maxPoints:20, orderIndex:2 },
  { id:'r4', labId:'', criterion:'On-time Submission',          description:'', maxPoints:10, orderIndex:3 },
];

interface Props {
  submission: Submission;
  onGradeSaved: (id: string, score: number) => void;
}

export default function SubmissionReviewer({ submission: s, onGradeSaved }: Props) {
  const [scores, setScores] = useState<Record<string,number>>(
    Object.fromEntries(RUBRIC.map(r => [r.id, s.grade ? Math.round(r.maxPoints * 0.8) : 0]))
  );
  const [feedback, setFeedback] = useState(s.grade?.feedback ?? '');
  const [saving, setSaving] = useState(false);

  const total = Object.values(scores).reduce((a, b) => a + b, 0);

  const save = async () => {
    setSaving(true);
    // await fetch('/api/grades', { method: 'POST', body: JSON.stringify({ submissionId: s.id, scores, feedback }) });
    await new Promise(r => setTimeout(r, 600));
    setSaving(false);
    onGradeSaved(s.id, total);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-[#141720] border border-[#272c3a] rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-[#272c3a] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#3d8ef0] flex items-center justify-center
                           text-[13px] font-bold text-black">
              {s.student?.name.split(' ').map(x=>x[0]).join('') ?? 'S'}
            </div>
            <div>
              <div className="font-bold text-[15px]">{s.student?.name}</div>
              <div className="text-[12px] text-[#7a80a0]">Submitted {s.submittedAt}</div>
            </div>
          </div>
          <div className="flex gap-2">
            {s.isLate && (
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#f06060]/10 text-[#f06060]">Late</span>
            )}
            <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full
              ${s.status==='graded' ? 'bg-[#2ecb7a]/10 text-[#2ecb7a]' : 'bg-[#3d8ef0]/10 text-[#3d8ef0]'}`}>
              {s.status === 'graded' ? 'Graded' : 'Pending'}
            </span>
          </div>
        </div>

        <div className="p-5 space-y-4">
          {/* Student note */}
          {s.studentNotes && (
            <div className="bg-[#3d8ef0]/8 border border-[#3d8ef0]/15 rounded-lg px-4 py-3 text-[13px]">
              <strong className="text-[#3d8ef0]">Student Note: </strong>{s.studentNotes}
            </div>
          )}

          {/* Submission link */}
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-[#7a80a0] font-semibold mb-1.5">
              Submission
            </label>
            <div className="bg-[#1c2030] border border-[#272c3a] rounded-lg px-4 py-2.5
                           flex items-center gap-3">
              {s.type === 'github'
                ? <Archive size={15} className="text-[#f0b429] flex-shrink-0"/>
                : <Archive size={15} className="text-[#f0b429] flex-shrink-0"/>}
              <span className="font-mono text-[12.5px] flex-1 break-all">
                {s.githubUrl ?? s.fileUrl}
              </span>
              <button className="border border-[#272c3a] text-[12px] font-semibold px-3 py-1
                                 rounded-lg hover:border-[#f0b429] hover:text-[#f0b429] transition-colors">
                Open
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Grading */}
      <div className="bg-[#141720] border border-[#272c3a] rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-[#272c3a] font-bold text-sm">
          Grade & Feedback
        </div>
        <div className="p-5 space-y-4">
          {/* Rubric scores */}
          <div className="bg-[#1c2030] border border-[#272c3a] rounded-xl p-4 space-y-3">
            <div className="text-[10px] uppercase tracking-widest text-[#7a80a0] font-semibold mb-3">
              Rubric Scores
            </div>
            {RUBRIC.map(r => (
              <div key={r.id} className="grid items-center gap-3 text-[13px]"
                   style={{gridTemplateColumns:'1fr 64px 52px'}}>
                <span>{r.criterion}</span>
                <input type="number" min={0} max={r.maxPoints} value={scores[r.id]}
                       onChange={e => setScores(p => ({...p, [r.id]: Math.min(r.maxPoints, +e.target.value)}))}
                       className="bg-[#141720] border border-[#272c3a] rounded-lg py-1.5 text-center
                                  font-mono text-[#f0b429] text-[13px] outline-none focus:border-[#f0b429]
                                  transition-colors w-full"/>
                <span className="text-[#7a80a0] text-[12px] font-mono">/ {r.maxPoints}</span>
              </div>
            ))}
            <div className="flex items-center justify-between pt-3 border-t border-[#272c3a]">
              <span className="text-[13px] text-[#7a80a0]">Total Score</span>
              <span className="text-[28px] text-[#2ecb7a]"
                    style={{fontFamily:'DM Serif Display,serif'}}>
                {total}<span className="text-[14px] text-[#7a80a0] font-sans"> / 100</span>
              </span>
            </div>
          </div>

          {/* Written feedback */}
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-[#7a80a0] font-semibold mb-1.5">
              Written Feedback
            </label>
            <textarea value={feedback} onChange={e => setFeedback(e.target.value)} rows={4}
                      className="w-full bg-[#1c2030] border border-[#272c3a] rounded-lg px-3 py-2.5
                                 text-[13px] text-white outline-none focus:border-[#f0b429]
                                 transition-colors resize-y"
                      placeholder="Provide detailed feedback for the student…"/>
          </div>

          <div className="flex justify-end gap-3">
            <button className="border border-[#272c3a] text-[13px] font-semibold px-4 py-2
                               rounded-lg hover:border-[#f0b429] transition-colors flex items-center gap-2">
              <RefreshCw size={13}/> Request Resubmission
            </button>
            <button onClick={save} disabled={saving}
                    className="bg-[#f0b429] text-[#0d0f12] font-bold text-[13px] px-4 py-2
                               rounded-lg flex items-center gap-2 hover:bg-[#e0a820]
                               transition-colors disabled:opacity-50">
              <Check size={14}/>
              {saving ? 'Saving…' : 'Save Grade'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
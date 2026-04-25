'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import RubricBuilder from '@/components/teacher/RubricBuilder';
import FileUploadZone from '@/components/teacher/FileUploadZone';
import { CreateLabFormData } from '@/types/teacher';

export default function CreateLabPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<Partial<CreateLabFormData>>({
    title: '', courseId: '', description: '', objectives: '',
    toolsRequired: '', submissionType: 'both',
    deadline: '', gradingPoints: 100, isPublished: false,
    criteria: [
      { criterion: 'Code Quality & Structure',     maxPoints: 30 },
      { criterion: 'Functionality & Correctness',  maxPoints: 40 },
      { criterion: 'Documentation & README',       maxPoints: 20 },
      { criterion: 'On-time Submission',           maxPoints: 10 },
    ],
  });

  const update = (key: keyof CreateLabFormData, value: unknown) =>
    setForm(prev => ({ ...prev, [key]: value }));

  const handleSubmit = async (publish: boolean) => {
    setSaving(true);
    const payload = { ...form, isPublished: publish };
    // await fetch('/api/labs', { method: 'POST', body: JSON.stringify(payload) });
    console.log('Submitting:', payload);
    setSaving(false);
    router.push('/teacher/assignments');
  };

  const rubricTotal = (form.criteria ?? []).reduce((s, c) => s + c.maxPoints, 0);

  return (
    <div>
      {/* Topbar */}
      <div className="sticky top-0 z-10 bg-[#0d0f12] border-b border-[#272c3a] px-8 py-5
                      flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white" style={{fontFamily:'DM Serif Display,serif'}}>
            Create Lab Assignment
          </h1>
          <p className="text-sm text-[#7a80a0] mt-1">
            Fill in details, upload materials & define rubric
          </p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => handleSubmit(false)}
                  className="border border-[#272c3a] text-white text-sm font-semibold
                             px-4 py-2 rounded-lg hover:border-[#f0b429] transition-colors">
            Save Draft
          </button>
          <button onClick={() => handleSubmit(true)} disabled={saving}
                  className="bg-[#f0b429] text-[#0d0f12] font-bold text-sm
                             px-4 py-2 rounded-lg hover:bg-[#e0a820] transition-colors disabled:opacity-50">
            {saving ? 'Publishing...' : 'Publish'}
          </button>
        </div>
      </div>

      <div className="p-8">
        <div className="grid gap-6" style={{gridTemplateColumns:'1fr 380px'}}>
          {/* LEFT */}
          <div className="space-y-5">
            {/* Details Card */}
            <div className="bg-[#141720] border border-[#272c3a] rounded-xl overflow-hidden">
              <div className="px-5 py-4 border-b border-[#272c3a] font-bold text-sm">Lab Details</div>
              <div className="p-5 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-[#7a80a0] font-semibold mb-1.5">
                      Lab Title
                    </label>
                    <input value={form.title} onChange={e => update('title', e.target.value)}
                           className="w-full bg-[#1c2030] border border-[#272c3a] rounded-lg px-3 py-2.5
                                      text-sm text-white outline-none focus:border-[#f0b429] transition-colors"
                           placeholder="e.g. Lab 5 — REST API with Express"/>
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-[#7a80a0] font-semibold mb-1.5">
                      Course
                    </label>
                    <select value={form.courseId} onChange={e => update('courseId', e.target.value)}
                            className="w-full bg-[#1c2030] border border-[#272c3a] rounded-lg px-3 py-2.5
                                       text-sm text-white outline-none focus:border-[#f0b429] transition-colors">
                      <option value="">Select course…</option>
                      <option value="web301">WEB301 — Web Development</option>
                      <option value="db201">DB201 — Database Systems</option>
                      <option value="ai401">AI401 — Machine Learning</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-[#7a80a0] font-semibold mb-1.5">
                    Description
                  </label>
                  <textarea value={form.description} onChange={e => update('description', e.target.value)}
                            rows={3}
                            className="w-full bg-[#1c2030] border border-[#272c3a] rounded-lg px-3 py-2.5
                                       text-sm text-white outline-none focus:border-[#f0b429] transition-colors resize-y"
                            placeholder="What will students build or explore in this lab?"/>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-[#7a80a0] font-semibold mb-1.5">
                    Objectives
                  </label>
                  <textarea value={form.objectives} onChange={e => update('objectives', e.target.value)}
                            rows={3}
                            className="w-full bg-[#1c2030] border border-[#272c3a] rounded-lg px-3 py-2.5
                                       text-sm text-white outline-none focus:border-[#f0b429] transition-colors resize-y"
                            placeholder="Learning outcomes — one per line"/>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-[#7a80a0] font-semibold mb-1.5">
                      Required Tools
                    </label>
                    <input value={form.toolsRequired} onChange={e => update('toolsRequired', e.target.value)}
                           className="w-full bg-[#1c2030] border border-[#272c3a] rounded-lg px-3 py-2.5
                                      text-sm text-white outline-none focus:border-[#f0b429] transition-colors"
                           placeholder="Node.js, Postman, Docker…"/>
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-[#7a80a0] font-semibold mb-1.5">
                      Submission Type
                    </label>
                    <select value={form.submissionType} onChange={e => update('submissionType', e.target.value)}
                            className="w-full bg-[#1c2030] border border-[#272c3a] rounded-lg px-3 py-2.5
                                       text-sm text-white outline-none focus:border-[#f0b429] transition-colors">
                      <option value="file">File Upload (ZIP/PDF)</option>
                      <option value="github">GitHub Repository</option>
                      <option value="both">Both Allowed</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-[#7a80a0] font-semibold mb-1.5">
                      Deadline
                    </label>
                    <input type="datetime-local" value={form.deadline}
                           onChange={e => update('deadline', e.target.value)}
                           className="w-full bg-[#1c2030] border border-[#272c3a] rounded-lg px-3 py-2.5
                                      text-sm text-white outline-none focus:border-[#f0b429] transition-colors"/>
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-[#7a80a0] font-semibold mb-1.5">
                      Total Points
                    </label>
                    <input type="number" value={form.gradingPoints}
                           onChange={e => update('gradingPoints', +e.target.value)}
                           className="w-full bg-[#1c2030] border border-[#272c3a] rounded-lg px-3 py-2.5
                                      text-sm text-white outline-none focus:border-[#f0b429] transition-colors"/>
                  </div>
                </div>
              </div>
            </div>

            {/* Upload Zone */}
            <FileUploadZone />
          </div>

          {/* RIGHT: Rubric */}
          <div className="sticky top-20">
            <RubricBuilder
              criteria={form.criteria ?? []}
              onChange={c => update('criteria', c)}
              total={rubricTotal}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
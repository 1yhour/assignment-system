'use client';
import { useState, useRef, DragEvent } from 'react';
import { UploadCloud, FileText, Archive, FileCode, X } from 'lucide-react';

function getIcon(name: string) {
  if (name.endsWith('.pdf'))                        return FileText;
  if (name.endsWith('.zip') || name.endsWith('.rar')) return Archive;
  return FileCode;
}

export default function FileUploadZone() {
  const [files, setFiles] = useState<File[]>([]);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const addFiles = (incoming: FileList | null) => {
    if (!incoming) return;
    const newFiles = [...incoming].filter(f => !files.some(e => e.name === f.name));
    setFiles(prev => [...prev, ...newFiles]);
  };

  const onDrop = (e: DragEvent) => {
    e.preventDefault(); setDragging(false);
    addFiles(e.dataTransfer.files);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
      <div className="px-5 py-4 border-b border-slate-100 font-bold text-sm text-slate-700">
        Materials &amp; Attachments
      </div>
      <div className="p-5">
        <div onDragOver={e => { e.preventDefault(); setDragging(true); }}
             onDragLeave={() => setDragging(false)}
             onDrop={onDrop}
             onClick={() => inputRef.current?.click()}
             className={`border-2 border-dashed rounded-xl py-9 text-center cursor-pointer transition-all
               ${dragging || files.length > 0
                 ? 'border-emerald-400 bg-emerald-50'
                 : 'border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/30'}`}>
          <UploadCloud size={36} className="mx-auto mb-3 text-slate-400"/>
          <p className="text-[13px] text-slate-500">
            Drag &amp; drop or <span className="text-indigo-600 font-semibold">browse files</span>
          </p>
          <p className="text-[11px] text-slate-400 mt-1">
            PDF instructions, starter code, datasets — any format
          </p>
          <input ref={inputRef} type="file" multiple className="hidden"
                 onChange={e => addFiles(e.target.files)}/>
        </div>

        {files.length > 0 && (
          <div className="mt-3 space-y-2">
            {files.map((f, i) => {
              const Icon = getIcon(f.name);
              return (
                <div key={i} className="bg-slate-50 border border-slate-200 rounded-lg
                                       px-3 py-2 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[12.5px]">
                    <Icon size={14} className="text-indigo-500 flex-shrink-0"/>
                    <span className="text-slate-700">{f.name}</span>
                    <span className="text-slate-400 text-[11px]">
                      {(f.size / 1024).toFixed(0)} KB
                    </span>
                  </div>
                  <button onClick={e => { e.stopPropagation(); setFiles(files.filter((_,j)=>j!==i)); }}
                          className="text-slate-300 hover:text-red-400 transition-colors">
                    <X size={13}/>
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
import React, { useState } from 'react';
import { X, Zap, Play, CheckCircle2 } from 'lucide-react';
import { Board } from '../../types/trello';

interface ButlerModalProps {
  isOpen: boolean;
  onClose: () => void;
  board: Board;
  onRunSortByDueDate: () => void;
  onRunMoveCompletedToDone: () => void;
}

export const ButlerModal: React.FC<ButlerModalProps> = ({
  isOpen,
  onClose,
  board,
  onRunSortByDueDate,
  onRunMoveCompletedToDone,
}) => {
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleAction = (fn: () => void, text: string) => {
    fn();
    setSuccessMsg(`⚡ Butler executed: ${text}`);
    setTimeout(() => {
      setSuccessMsg(null);
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 animate-in fade-in duration-100">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg p-6 text-slate-800 space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-amber-100 text-amber-800">
              <Zap className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900">Butler Automation</h3>
              <p className="text-xs text-slate-500">Board-level one-click commands & rules</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        {successMsg && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-in fade-in duration-150">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        <div className="space-y-3">
          <div className="p-3.5 bg-slate-50 hover:bg-slate-100/80 rounded-xl border border-slate-200 flex items-center justify-between transition-colors">
            <div>
              <h4 className="font-bold text-xs text-slate-900">Sort cards by Due Date</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Automatically arranges cards in every list chronologically by deadline.
              </p>
            </div>
            <button
              onClick={() => handleAction(onRunSortByDueDate, 'Sorted all cards by due date')}
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg flex items-center gap-1.5 shrink-0 transition-colors cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Run</span>
            </button>
          </div>

          <div className="p-3.5 bg-slate-50 hover:bg-slate-100/80 rounded-xl border border-slate-200 flex items-center justify-between transition-colors">
            <div>
              <h4 className="font-bold text-xs text-slate-900">Move all completed cards to "Done 🎉"</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Sweeps all cards with finished checklists or completed due dates into Done.
              </p>
            </div>
            <button
              onClick={() => handleAction(onRunMoveCompletedToDone, 'Moved all completed cards to Done')}
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg flex items-center gap-1.5 shrink-0 transition-colors cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Run</span>
            </button>
          </div>
        </div>

        <div className="pt-2 text-[11px] text-slate-400 text-center">
          Powered by Atlassian Butler Automation Engine · 250 runs available
        </div>
      </div>
    </div>
  );
};

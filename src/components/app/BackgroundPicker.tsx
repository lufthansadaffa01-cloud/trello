import React from 'react';
import { BACKGROUNDS } from '../../data/initialData';
import { Board } from '../../types/trello';
import { X, Check } from 'lucide-react';

interface BackgroundPickerProps {
  isOpen: boolean;
  onClose: () => void;
  currentBg: Board['background'];
  onSelectBackground: (bg: Board['background']) => void;
}

export const BackgroundPicker: React.FC<BackgroundPickerProps> = ({
  isOpen,
  onClose,
  currentBg,
  onSelectBackground,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4 animate-in fade-in duration-100">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-sm p-4 text-slate-800">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
          <h3 className="font-bold text-sm text-slate-900">Change Board Background</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {BACKGROUNDS.map((bg) => {
            const isSelected = currentBg.value === bg.value;
            return (
              <button
                key={bg.id}
                onClick={() => {
                  onSelectBackground({
                    type: bg.type,
                    value: bg.value,
                    textColor: bg.textColor,
                  });
                  onClose();
                }}
                className="h-20 rounded-lg p-2 flex flex-col justify-between text-left relative overflow-hidden transition-transform hover:scale-[1.02] shadow-2xs border border-black/10 cursor-pointer"
                style={{ background: bg.value }}
              >
                <span className="text-white text-xs font-bold drop-shadow-sm">
                  {bg.name}
                </span>
                {isSelected && (
                  <span className="self-end bg-black/40 text-white rounded-full p-1">
                    <Check className="w-3.5 h-3.5" />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

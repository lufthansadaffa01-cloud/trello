import React from 'react';
import { FilterState, Label, Member } from '../../types/trello';
import { X, Search, Check, RotateCcw } from 'lucide-react';

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filterState: FilterState;
  onUpdateFilter: (updates: Partial<FilterState>) => void;
  onResetFilter: () => void;
  availableLabels: Label[];
  availableMembers: Member[];
}

export const FilterDrawer: React.FC<FilterDrawerProps> = ({
  isOpen,
  onClose,
  filterState,
  onUpdateFilter,
  onResetFilter,
  availableLabels,
  availableMembers,
}) => {
  if (!isOpen) return null;

  const toggleLabel = (id: string) => {
    const exists = filterState.selectedLabelIds.includes(id);
    const updated = exists
      ? filterState.selectedLabelIds.filter((lId) => lId !== id)
      : [...filterState.selectedLabelIds, id];
    onUpdateFilter({ selectedLabelIds: updated });
  };

  const toggleMember = (id: string) => {
    const exists = filterState.selectedMemberIds.includes(id);
    const updated = exists
      ? filterState.selectedMemberIds.filter((mId) => mId !== id)
      : [...filterState.selectedMemberIds, id];
    onUpdateFilter({ selectedMemberIds: updated });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex justify-end animate-in fade-in duration-150">
      <div className="w-80 bg-white h-full shadow-2xl p-5 flex flex-col justify-between overflow-y-auto">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-bold text-sm text-slate-900">Filter Cards</h3>
            <button onClick={onClose} className="p-1 rounded text-slate-400 hover:text-slate-700">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Keyword Search */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Keywords
            </label>
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search by title, description..."
                value={filterState.search}
                onChange={(e) => onUpdateFilter({ search: e.target.value })}
                className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Members */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Members
            </label>
            <div className="space-y-1">
              {availableMembers.map((m) => {
                const isSelected = filterState.selectedMemberIds.includes(m.id);
                return (
                  <button
                    key={m.id}
                    onClick={() => toggleMember(m.id)}
                    className="w-full flex items-center justify-between p-1.5 rounded-lg hover:bg-slate-50 text-xs transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="w-5 h-5 rounded-full text-white font-bold text-[9px] flex items-center justify-center overflow-hidden"
                        style={{ backgroundColor: m.color }}
                      >
                        {m.avatar ? <img src={m.avatar} alt={m.name} className="w-full h-full object-cover" /> : m.initials}
                      </span>
                      <span className="font-medium text-slate-800">{m.name}</span>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-blue-600" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Labels */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Labels
            </label>
            <div className="space-y-1.5">
              {availableLabels.map((lbl) => {
                const isSelected = filterState.selectedLabelIds.includes(lbl.id);
                return (
                  <button
                    key={lbl.id}
                    onClick={() => toggleLabel(lbl.id)}
                    className="w-full flex items-center justify-between p-2 rounded-lg bg-slate-50 hover:bg-slate-100 text-xs font-bold text-slate-800 transition-colors"
                  >
                    <span>{lbl.text}</span>
                    {isSelected && <Check className="w-4 h-4 text-purple-600" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Due Date Filter */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Due Date
            </label>
            <div className="space-y-1 text-xs">
              {[
                { id: 'all', label: 'All cards' },
                { id: 'due-soon', label: 'Due in the next 3 days' },
                { id: 'overdue', label: 'Overdue' },
                { id: 'completed', label: 'Marked as completed' },
              ].map((opt) => (
                <label
                  key={opt.id}
                  className="flex items-center gap-2 p-1.5 rounded hover:bg-slate-50 cursor-pointer text-slate-700"
                >
                  <input
                    type="radio"
                    name="dueFilter"
                    checked={filterState.dueFilter === opt.id}
                    onChange={() => onUpdateFilter({ dueFilter: opt.id as any })}
                    className="text-blue-600 focus:ring-0"
                  />
                  <span>{opt.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Footer reset */}
        <div className="pt-4 border-t border-slate-100">
          <button
            onClick={onResetFilter}
            className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset filters</span>
          </button>
        </div>
      </div>
    </div>
  );
};

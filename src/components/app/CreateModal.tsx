import React, { useState } from 'react';
import { Board } from '../../types/trello';
import { X, CreditCard, ListPlus } from 'lucide-react';

interface CreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  board: Board;
  onAddCard: (listId: string, title: string) => void;
  onAddList: (title: string) => void;
}

export const CreateModal: React.FC<CreateModalProps> = ({
  isOpen,
  onClose,
  board,
  onAddCard,
  onAddList,
}) => {
  const [tab, setTab] = useState<'card' | 'list'>('card');
  const [title, setTitle] = useState('');
  const [targetListId, setTargetListId] = useState(board.lists[0]?.id || '');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    if (tab === 'card') {
      onAddCard(targetListId || board.lists[0]?.id, title.trim());
    } else {
      onAddList(title.trim());
    }
    setTitle('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4 animate-in fade-in duration-100">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-md p-5 text-slate-800">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
          <h3 className="font-bold text-sm text-slate-900">Create</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab switch: Card vs List */}
        <div className="flex gap-2 p-1 bg-slate-100 rounded-lg mb-4">
          <button
            onClick={() => setTab('card')}
            className={`flex-1 py-1.5 text-xs font-bold rounded-md flex items-center justify-center gap-1.5 transition-all ${
              tab === 'card' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <CreditCard className="w-3.5 h-3.5" />
            <span>Card</span>
          </button>
          <button
            onClick={() => setTab('list')}
            className={`flex-1 py-1.5 text-xs font-bold rounded-md flex items-center justify-center gap-1.5 transition-all ${
              tab === 'list' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ListPlus className="w-3.5 h-3.5" />
            <span>List</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
              {tab === 'card' ? 'Card Title' : 'List Title'}
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={tab === 'card' ? 'e.g. Upgrade dependency versions' : 'e.g. Blocked & Awaiting Input'}
              autoFocus
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {tab === 'card' && board.lists.length > 0 && (
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
                Add to List
              </label>
              <select
                value={targetListId}
                onChange={(e) => setTargetListId(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 outline-none"
              >
                {board.lists.map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.title}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-bold bg-[#0065FF] hover:bg-[#0747A6] text-white rounded-lg shadow-sm"
            >
              Create {tab === 'card' ? 'Card' : 'List'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

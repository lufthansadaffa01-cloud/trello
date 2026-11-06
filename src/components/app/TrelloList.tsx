import React, { useState } from 'react';
import { List, Card } from '../../types/trello';
import { TrelloCard } from './TrelloCard';
import { Plus, MoreHorizontal, X, Archive, ArrowRightLeft } from 'lucide-react';

interface TrelloListProps {
  list: List;
  cards: Card[];
  onAddCard: (listId: string, title: string) => void;
  onOpenCardModal: (cardId: string) => void;
  onArchiveList: (listId: string) => void;
  onRenameList: (listId: string, newTitle: string) => void;
  onCardDrop: (e: React.DragEvent, targetListId: string, targetIndex: number) => void;
}

export const TrelloList: React.FC<TrelloListProps> = ({
  list,
  cards,
  onAddCard,
  onOpenCardModal,
  onArchiveList,
  onRenameList,
  onCardDrop,
}) => {
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [newCardTitle, setNewCardTitle] = useState('');
  const [editingTitle, setEditingTitle] = useState(false);
  const [titleValue, setTitleValue] = useState(list.title);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleAddSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (newCardTitle.trim()) {
      onAddCard(list.id, newCardTitle.trim());
      setNewCardTitle('');
      // keep composer open for rapid entry
    }
  };

  const handleTitleSubmit = () => {
    if (titleValue.trim()) {
      onRenameList(list.id, titleValue.trim());
    } else {
      setTitleValue(list.title);
    }
    setEditingTitle(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    onCardDrop(e, list.id, cards.length);
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`w-72 shrink-0 bg-[#F1F2F4] rounded-xl flex flex-col max-h-full border transition-all ${
        isDragOver ? 'border-blue-500 bg-blue-50/40 ring-2 ring-blue-400/30' : 'border-slate-200/80 shadow-xs'
      }`}
    >
      {/* List Header */}
      <div className="p-3 pb-2 flex items-center justify-between relative">
        {editingTitle ? (
          <input
            type="text"
            value={titleValue}
            onChange={(e) => setTitleValue(e.target.value)}
            onBlur={handleTitleSubmit}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleTitleSubmit();
              if (e.key === 'Escape') {
                setTitleValue(list.title);
                setEditingTitle(false);
              }
            }}
            autoFocus
            className="w-full px-2 py-0.5 text-sm font-bold text-slate-800 bg-white border border-blue-500 rounded outline-none"
          />
        ) : (
          <h3
            onClick={() => setEditingTitle(true)}
            className="text-sm font-bold text-slate-800 px-1 py-0.5 rounded hover:bg-slate-200/80 cursor-pointer flex-1 truncate"
            title="Click to rename list"
          >
            {list.title}
          </h3>
        )}

        <div className="flex items-center gap-1">
          <span className="text-[11px] font-bold text-slate-400 bg-slate-200/80 px-1.5 py-0.5 rounded">
            {cards.length}
          </span>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-1 rounded text-slate-500 hover:text-slate-800 hover:bg-slate-200 transition-colors"
            title="List actions"
          >
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>

        {/* List Actions Menu */}
        {menuOpen && (
          <div className="absolute top-10 right-2 w-52 bg-white rounded-xl shadow-xl border border-slate-200 p-2 z-40 text-xs animate-in fade-in duration-100">
            <div className="flex items-center justify-between pb-1.5 border-b border-slate-100 mb-1 px-1 font-bold text-slate-700">
              <span>List Actions</span>
              <button onClick={() => setMenuOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            <button
              onClick={() => {
                setIsAddingCard(true);
                setMenuOpen(false);
              }}
              className="w-full text-left p-2 rounded hover:bg-slate-50 text-slate-700 font-medium flex items-center gap-2"
            >
              <Plus className="w-3.5 h-3.5 text-slate-500" />
              <span>Add card...</span>
            </button>
            <button
              onClick={() => {
                onArchiveList(list.id);
                setMenuOpen(false);
              }}
              className="w-full text-left p-2 rounded hover:bg-red-50 text-red-600 font-medium flex items-center gap-2"
            >
              <Archive className="w-3.5 h-3.5" />
              <span>Archive this list</span>
            </button>
          </div>
        )}
      </div>

      {/* Cards Scrollable Area */}
      <div className="px-2.5 py-1 space-y-2 overflow-y-auto flex-1 min-h-[40px] max-h-[calc(100vh-230px)] no-scrollbar">
        {cards.map((card, index) => (
          <div
            key={card.id}
            onDragOver={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            onDrop={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onCardDrop(e, list.id, index);
            }}
          >
            <TrelloCard
              card={card}
              onClick={() => onOpenCardModal(card.id)}
              onDragStart={(e) => {
                e.dataTransfer.setData('text/plain', card.id);
                e.dataTransfer.effectAllowed = 'move';
              }}
            />
          </div>
        ))}
      </div>

      {/* Card Composer or Add Card Button */}
      <div className="p-2.5 pt-1">
        {isAddingCard ? (
          <form onSubmit={handleAddSubmit} className="space-y-2">
            <textarea
              value={newCardTitle}
              onChange={(e) => setNewCardTitle(e.target.value)}
              placeholder="Enter a title for this card..."
              autoFocus
              rows={2}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleAddSubmit();
                }
                if (e.key === 'Escape') {
                  setIsAddingCard(false);
                  setNewCardTitle('');
                }
              }}
              className="w-full p-2.5 bg-white border border-blue-500 rounded-lg text-xs text-slate-900 placeholder:text-slate-400 outline-none shadow-xs resize-none"
            />
            <div className="flex items-center gap-2">
              <button
                type="submit"
                className="px-3 py-1.5 bg-[#0065FF] hover:bg-[#0747A6] text-white text-xs font-semibold rounded-md shadow-xs transition-colors cursor-pointer"
              >
                Add card
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsAddingCard(false);
                  setNewCardTitle('');
                }}
                className="p-1.5 text-slate-500 hover:text-slate-800 rounded hover:bg-slate-200 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </form>
        ) : (
          <button
            onClick={() => setIsAddingCard(true)}
            className="w-full py-1.5 px-2 rounded-lg text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-200/80 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add a card</span>
          </button>
        )}
      </div>
    </div>
  );
};

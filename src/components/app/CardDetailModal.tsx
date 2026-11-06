import React, { useState } from 'react';
import { Card, Board, Member, Label, Checklist } from '../../types/trello';
import { MEMBERS, LABELS } from '../../data/initialData';
import { calculateProgress } from '../../utils/trelloLogic';
import {
  X,
  CreditCard,
  AlignLeft,
  CheckSquare,
  Clock,
  MessageSquare,
  Paperclip,
  Users,
  Tag,
  Palette,
  Trash2,
  Check,
  Plus,
  ArrowRight,
  Eye,
} from 'lucide-react';

interface CardDetailModalProps {
  card: Card;
  board: Board;
  currentMember: Member;
  onClose: () => void;
  onUpdateCard: (updates: Partial<Card>) => void;
  onDeleteCard: (cardId: string) => void;
  onToggleChecklist: (checklistId: string, itemId: string) => void;
  onAddChecklistItem: (checklistId: string, text: string) => void;
  onDeleteChecklistItem: (checklistId: string, itemId: string) => void;
  onAddChecklist: (title: string) => void;
  onDeleteChecklist: (checklistId: string) => void;
  onAddComment: (text: string) => void;
  onMoveCard: (targetListId: string) => void;
}

const COVER_COLORS = [
  '#0052cc',
  '#00875a',
  '#ff5630',
  '#6554c0',
  '#ffab00',
  '#00b8d9',
  '#344563',
  '#e56910',
];

export const CardDetailModal: React.FC<CardDetailModalProps> = ({
  card,
  board,
  currentMember,
  onClose,
  onUpdateCard,
  onDeleteCard,
  onToggleChecklist,
  onAddChecklistItem,
  onDeleteChecklistItem,
  onAddChecklist,
  onDeleteChecklist,
  onAddComment,
  onMoveCard,
}) => {
  const [editingTitle, setEditingTitle] = useState(false);
  const [titleValue, setTitleValue] = useState(card.title);

  const [editingDesc, setEditingDesc] = useState(false);
  const [descValue, setDescValue] = useState(card.description || '');

  const [commentText, setCommentText] = useState('');
  const [activeChecklistInput, setActiveChecklistInput] = useState<string | null>(null);
  const [newItemText, setNewItemText] = useState('');

  const [newChecklistTitle, setNewChecklistTitle] = useState('');
  const [showAddChecklistModal, setShowAddChecklistModal] = useState(false);

  const [showLabelsDropdown, setShowLabelsDropdown] = useState(false);
  const [showMembersDropdown, setShowMembersDropdown] = useState(false);
  const [showCoverDropdown, setShowCoverDropdown] = useState(false);

  const currentList = board.lists.find((l) => l.id === card.listId);
  const progress = calculateProgress(card);

  const handleTitleSubmit = () => {
    if (titleValue.trim()) {
      onUpdateCard({ title: titleValue.trim() });
    }
    setEditingTitle(false);
  };

  const handleDescSubmit = () => {
    onUpdateCard({ description: descValue });
    setEditingDesc(false);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentText.trim()) {
      onAddComment(commentText.trim());
      setCommentText('');
    }
  };

  const handleAddItem = (checklistId: string) => {
    if (newItemText.trim()) {
      onAddChecklistItem(checklistId, newItemText.trim());
      setNewItemText('');
    }
  };

  const handleAddChecklistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddChecklist(newChecklistTitle.trim() || 'Checklist');
    setNewChecklistTitle('');
    setShowAddChecklistModal(false);
  };

  const toggleLabel = (label: Label) => {
    const exists = card.labels.some((l) => l.id === label.id);
    const updated = exists
      ? card.labels.filter((l) => l.id !== label.id)
      : [...card.labels, label];
    onUpdateCard({ labels: updated });
  };

  const toggleMember = (member: Member) => {
    const exists = card.members.some((m) => m.id === member.id);
    const updated = exists
      ? card.members.filter((m) => m.id !== member.id)
      : [...card.members, member];
    onUpdateCard({ members: updated });
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="bg-[#F4F5F7] rounded-xl shadow-2xl border border-slate-200 w-full max-w-3xl overflow-hidden text-slate-800 my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cover banner */}
        {card.coverColor && (
          <div
            className="h-28 w-full relative transition-all flex items-end p-4 justify-between"
            style={{ backgroundColor: card.coverColor }}
          >
            <button
              onClick={() => onUpdateCard({ coverColor: undefined })}
              className="bg-black/40 hover:bg-black/60 text-white text-xs font-medium px-2.5 py-1 rounded transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Palette className="w-3.5 h-3.5" /> Remove cover
            </button>
          </div>
        )}

        <div className="p-4 sm:p-6 space-y-6">
          {/* Header row: title and close */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3 flex-1">
              <CreditCard className="w-5 h-5 text-slate-600 mt-1 shrink-0" />
              <div className="flex-1">
                {editingTitle ? (
                  <input
                    type="text"
                    value={titleValue}
                    onChange={(e) => setTitleValue(e.target.value)}
                    onBlur={handleTitleSubmit}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleTitleSubmit();
                      if (e.key === 'Escape') setEditingTitle(false);
                    }}
                    autoFocus
                    className="w-full text-lg sm:text-xl font-bold text-slate-900 bg-white border border-blue-500 rounded p-1 outline-none"
                  />
                ) : (
                  <h2
                    onClick={() => setEditingTitle(true)}
                    className="text-lg sm:text-xl font-bold text-slate-900 hover:bg-slate-200/60 p-1 -ml-1 rounded cursor-pointer leading-snug"
                    title="Click to rename"
                  >
                    {card.title}
                  </h2>
                )}
                <div className="text-xs text-slate-500 mt-0.5">
                  in list{' '}
                  <select
                    value={card.listId}
                    onChange={(e) => onMoveCard(e.target.value)}
                    className="font-semibold text-slate-700 underline bg-transparent cursor-pointer outline-none"
                  >
                    {board.lists.map((l) => (
                      <option key={l.id} value={l.id}>
                        {l.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-500 hover:text-slate-900 rounded-full hover:bg-slate-200 transition-colors cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Grid Layout: Main Content (8 cols) & Sidebar Actions (4 cols) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Left Content Column */}
            <div className="md:col-span-8 space-y-6">
              {/* Badges: Members, Labels, Due Date */}
              <div className="flex flex-wrap items-start gap-4">
                {/* Members */}
                {card.members.length > 0 && (
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                      Members
                    </span>
                    <div className="flex items-center gap-1">
                      {card.members.map((m) => (
                        <div
                          key={m.id}
                          className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs text-white ring-1 ring-slate-300 overflow-hidden"
                          style={{ backgroundColor: m.color }}
                          title={m.name}
                        >
                          {m.avatar ? (
                            <img src={m.avatar} alt={m.name} className="w-full h-full object-cover" />
                          ) : (
                            m.initials
                          )}
                        </div>
                      ))}
                      <button
                        onClick={() => setShowMembersDropdown(!showMembersDropdown)}
                        className="w-7 h-7 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-700 flex items-center justify-center text-xs transition-colors"
                        title="Add member"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Labels */}
                {card.labels.length > 0 && (
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                      Labels
                    </span>
                    <div className="flex flex-wrap items-center gap-1.5">
                      {card.labels.map((lbl) => (
                        <span
                          key={lbl.id}
                          onClick={() => setShowLabelsDropdown(true)}
                          className="px-2.5 py-1 rounded text-xs font-bold bg-purple-100 text-purple-900 border border-purple-200 cursor-pointer hover:opacity-80"
                        >
                          {lbl.text}
                        </span>
                      ))}
                      <button
                        onClick={() => setShowLabelsDropdown(!showLabelsDropdown)}
                        className="w-6 h-6 rounded bg-slate-200 hover:bg-slate-300 text-slate-700 flex items-center justify-center text-xs transition-colors"
                        title="Edit labels"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Due Date */}
                {card.dueDate && (
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                      Due Date
                    </span>
                    <div className="flex items-center gap-2 bg-slate-200/70 px-2.5 py-1 rounded-md text-xs font-semibold">
                      <input
                        type="checkbox"
                        checked={card.dueCompleted || false}
                        onChange={(e) => onUpdateCard({ dueCompleted: e.target.checked })}
                        className="rounded text-emerald-600 focus:ring-0 cursor-pointer"
                        id="modal-due-toggle"
                      />
                      <label htmlFor="modal-due-toggle" className="cursor-pointer">
                        {new Date(card.dueDate).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </label>
                      {card.dueCompleted && (
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-bold">
                          Completed
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Description Section */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-800">
                    <AlignLeft className="w-4 h-4 text-slate-600" />
                    <span>Description</span>
                  </div>
                  {!editingDesc && (
                    <button
                      onClick={() => setEditingDesc(true)}
                      className="px-2.5 py-1 bg-slate-200 hover:bg-slate-300 text-xs font-semibold text-slate-700 rounded transition-colors cursor-pointer"
                    >
                      {card.description ? 'Edit' : 'Add description'}
                    </button>
                  )}
                </div>

                {editingDesc ? (
                  <div className="space-y-2">
                    <textarea
                      value={descValue}
                      onChange={(e) => setDescValue(e.target.value)}
                      placeholder="Add a more detailed description..."
                      rows={4}
                      autoFocus
                      className="w-full p-3 bg-white border border-blue-500 rounded-lg text-xs sm:text-sm text-slate-900 outline-none shadow-xs"
                    />
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleDescSubmit}
                        className="px-3.5 py-1.5 bg-[#0065FF] hover:bg-[#0747A6] text-white text-xs font-semibold rounded-md shadow-xs transition-colors cursor-pointer"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => {
                          setDescValue(card.description || '');
                          setEditingDesc(false);
                        }}
                        className="px-3.5 py-1.5 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-md transition-colors cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    onClick={() => setEditingDesc(true)}
                    className="p-3 bg-white rounded-lg border border-slate-200/80 text-xs sm:text-sm text-slate-700 min-h-[50px] cursor-pointer hover:border-slate-300 whitespace-pre-wrap leading-relaxed"
                  >
                    {card.description || (
                      <span className="text-slate-400 italic">
                        Add a more detailed description...
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Checklists */}
              {card.checklists.map((checklist) => {
                const total = checklist.items.length;
                const completed = checklist.items.filter((i) => i.completed).length;
                const pct = total === 0 ? 0 : Math.round((completed / total) * 100);

                return (
                  <div key={checklist.id} className="space-y-3 pt-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm font-bold text-slate-800">
                        <CheckSquare className="w-4 h-4 text-emerald-600" />
                        <span>{checklist.title}</span>
                      </div>
                      <button
                        onClick={() => onDeleteChecklist(checklist.id)}
                        className="px-2 py-0.5 text-xs text-slate-500 hover:text-red-600 hover:bg-slate-200 rounded transition-colors"
                      >
                        Delete
                      </button>
                    </div>

                    {/* Progress Bar */}
                    <div className="flex items-center gap-3">
                      <span className="text-[11px] font-bold text-slate-500 w-8">{pct}%</span>
                      <div className="flex-1 bg-slate-200 h-2 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all duration-300 ${
                            pct === 100 ? 'bg-emerald-500' : 'bg-blue-600'
                          }`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>

                    {/* Items */}
                    <div className="space-y-2">
                      {checklist.items.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-start justify-between gap-3 p-1.5 rounded hover:bg-white transition-colors group"
                        >
                          <label className="flex items-start gap-2.5 flex-1 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={item.completed}
                              onChange={() => onToggleChecklist(checklist.id, item.id)}
                              className="mt-0.5 rounded text-blue-600 focus:ring-0 cursor-pointer"
                            />
                            <span
                              className={`text-xs sm:text-sm text-slate-800 leading-snug ${
                                item.completed ? 'line-through text-slate-400' : ''
                              }`}
                            >
                              {item.text}
                            </span>
                          </label>
                          <button
                            onClick={() => onDeleteChecklistItem(checklist.id, item.id)}
                            className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-600 p-1 transition-opacity"
                            title="Delete item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* Add Item form */}
                    {activeChecklistInput === checklist.id ? (
                      <div className="space-y-2 pt-1">
                        <input
                          type="text"
                          value={newItemText}
                          onChange={(e) => setNewItemText(e.target.value)}
                          placeholder="Add an item..."
                          autoFocus
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') handleAddItem(checklist.id);
                            if (e.key === 'Escape') setActiveChecklistInput(null);
                          }}
                          className="w-full p-2 bg-white border border-blue-500 rounded text-xs text-slate-900 outline-none"
                        />
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleAddItem(checklist.id)}
                            className="px-3 py-1 bg-[#0065FF] hover:bg-[#0747A6] text-white text-xs font-semibold rounded shadow-xs"
                          >
                            Add item
                          </button>
                          <button
                            onClick={() => setActiveChecklistInput(null)}
                            className="p-1 text-slate-500 hover:text-slate-800"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => setActiveChecklistInput(checklist.id)}
                        className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-xs font-semibold text-slate-700 rounded transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add an item
                      </button>
                    )}
                  </div>
                );
              })}

              {/* Activity & Comments */}
              <div className="space-y-3 pt-4 border-t border-slate-200">
                <div className="flex items-center gap-2 text-sm font-bold text-slate-800">
                  <MessageSquare className="w-4 h-4 text-slate-600" />
                  <span>Activity & Comments</span>
                </div>

                {/* Add Comment input */}
                <form onSubmit={handleCommentSubmit} className="flex gap-2.5">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs text-white shrink-0 mt-0.5 overflow-hidden"
                    style={{ backgroundColor: currentMember.color }}
                  >
                    {currentMember.avatar ? (
                      <img src={currentMember.avatar} alt={currentMember.name} className="w-full h-full object-cover" />
                    ) : (
                      currentMember.initials
                    )}
                  </div>
                  <div className="flex-1 space-y-2">
                    <input
                      type="text"
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      placeholder="Write a comment..."
                      className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 outline-none focus:ring-2 focus:ring-blue-500 shadow-2xs"
                    />
                    {commentText.trim() && (
                      <button
                        type="submit"
                        className="px-3 py-1.5 bg-[#0065FF] hover:bg-[#0747A6] text-white text-xs font-semibold rounded-md shadow-xs cursor-pointer"
                      >
                        Save comment
                      </button>
                    )}
                  </div>
                </form>

                {/* Comments List */}
                <div className="space-y-3 pt-2">
                  {card.comments.map((comment) => (
                    <div key={comment.id} className="flex gap-2.5 text-xs">
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center font-bold text-[10px] text-white shrink-0 mt-0.5 overflow-hidden"
                        style={{ backgroundColor: comment.author.color }}
                      >
                        {comment.author.avatar ? (
                          <img src={comment.author.avatar} alt={comment.author.name} className="w-full h-full object-cover" />
                        ) : (
                          comment.author.initials
                        )}
                      </div>
                      <div className="flex-1 bg-white p-2.5 rounded-lg border border-slate-200/80 shadow-2xs">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-slate-800">{comment.author.name}</span>
                          <span className="text-[10px] text-slate-400">
                            {new Date(comment.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                        <p className="text-slate-700 leading-relaxed">{comment.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Sidebar: Actions */}
            <div className="md:col-span-4 space-y-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-2">
                  Add to card
                </span>
                <div className="space-y-1.5">
                  {/* Members Picker */}
                  <div className="relative">
                    <button
                      onClick={() => setShowMembersDropdown(!showMembersDropdown)}
                      className="w-full px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-semibold rounded flex items-center gap-2 transition-colors cursor-pointer"
                    >
                      <Users className="w-4 h-4 text-slate-600" />
                      <span>Members</span>
                    </button>

                    {showMembersDropdown && (
                      <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-lg shadow-xl border border-slate-200 p-2 z-50 text-xs">
                        <div className="font-bold text-slate-800 pb-1 border-b mb-1">Select Members</div>
                        {MEMBERS.map((m) => {
                          const isAssigned = card.members.some((cm) => cm.id === m.id);
                          return (
                            <button
                              key={m.id}
                              onClick={() => toggleMember(m)}
                              className="w-full flex items-center justify-between p-1.5 rounded hover:bg-slate-50 text-left"
                            >
                              <div className="flex items-center gap-2">
                                <span className="w-5 h-5 rounded-full bg-blue-600 text-white font-bold text-[9px] flex items-center justify-center">
                                  {m.initials}
                                </span>
                                <span className="text-slate-800 font-medium">{m.name}</span>
                              </div>
                              {isAssigned && <Check className="w-4 h-4 text-emerald-600" />}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* Labels Picker */}
                  <div className="relative">
                    <button
                      onClick={() => setShowLabelsDropdown(!showLabelsDropdown)}
                      className="w-full px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-semibold rounded flex items-center gap-2 transition-colors cursor-pointer"
                    >
                      <Tag className="w-4 h-4 text-slate-600" />
                      <span>Labels</span>
                    </button>

                    {showLabelsDropdown && (
                      <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-lg shadow-xl border border-slate-200 p-2 z-50 text-xs">
                        <div className="font-bold text-slate-800 pb-1 border-b mb-1">Select Labels</div>
                        {LABELS.map((lbl) => {
                          const isSelected = card.labels.some((l) => l.id === lbl.id);
                          return (
                            <button
                              key={lbl.id}
                              onClick={() => toggleLabel(lbl)}
                              className="w-full flex items-center justify-between p-1.5 rounded hover:bg-slate-50 text-left"
                            >
                              <span className="font-semibold text-slate-800">{lbl.text}</span>
                              {isSelected && <Check className="w-4 h-4 text-purple-600" />}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* Checklist Button */}
                  <button
                    onClick={() => setShowAddChecklistModal(true)}
                    className="w-full px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-semibold rounded flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <CheckSquare className="w-4 h-4 text-slate-600" />
                    <span>Checklist</span>
                  </button>

                  {/* Cover Color Picker */}
                  <div className="relative">
                    <button
                      onClick={() => setShowCoverDropdown(!showCoverDropdown)}
                      className="w-full px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-semibold rounded flex items-center gap-2 transition-colors cursor-pointer"
                    >
                      <Palette className="w-4 h-4 text-slate-600" />
                      <span>Cover</span>
                    </button>

                    {showCoverDropdown && (
                      <div className="absolute top-full left-0 mt-1 w-60 bg-white rounded-lg shadow-xl border border-slate-200 p-2 z-50">
                        <div className="font-bold text-xs text-slate-800 pb-1.5 border-b mb-2">Card Cover Color</div>
                        <div className="grid grid-cols-4 gap-2">
                          {COVER_COLORS.map((c) => (
                            <button
                              key={c}
                              onClick={() => {
                                onUpdateCard({ coverColor: c });
                                setShowCoverDropdown(false);
                              }}
                              className="h-8 rounded cursor-pointer hover:scale-105 transition-transform"
                              style={{ backgroundColor: c }}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-2">
                  Actions
                </span>
                <div className="space-y-1.5">
                  <button
                    onClick={() => onDeleteCard(card.id)}
                    className="w-full px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 text-xs font-semibold rounded flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                    <span>Delete Card</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Inline Add Checklist modal prompt */}
        {showAddChecklistModal && (
          <div className="fixed inset-0 z-60 bg-black/40 flex items-center justify-center p-4">
            <form
              onSubmit={handleAddChecklistSubmit}
              className="bg-white rounded-xl shadow-xl p-4 w-80 space-y-3"
            >
              <h4 className="font-bold text-sm text-slate-900">Add Checklist</h4>
              <input
                type="text"
                value={newChecklistTitle}
                onChange={(e) => setNewChecklistTitle(e.target.value)}
                placeholder="Checklist title..."
                autoFocus
                className="w-full p-2 border border-blue-500 rounded text-xs outline-none"
              />
              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddChecklistModal(false)}
                  className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-1.5 text-xs font-semibold bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

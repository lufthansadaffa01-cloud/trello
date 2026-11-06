import React, { useState } from 'react';
import {
  Star,
  Lock,
  Users,
  Layout,
  Table,
  Calendar,
  Filter,
  Share2,
  Zap,
  Palette,
  Sliders,
  MoreHorizontal,
  Check,
} from 'lucide-react';
import { Board, ActiveView, FilterState } from '../../types/trello';

interface BoardHeaderProps {
  board: Board;
  activeView: ActiveView;
  onChangeView: (view: ActiveView) => void;
  onUpdateTitle: (title: string) => void;
  onToggleStar: () => void;
  onOpenFilter: () => void;
  onOpenBackgroundPicker: () => void;
  onOpenButler: () => void;
  filterState: FilterState;
}

export const BoardHeader: React.FC<BoardHeaderProps> = ({
  board,
  activeView,
  onChangeView,
  onUpdateTitle,
  onToggleStar,
  onOpenFilter,
  onOpenBackgroundPicker,
  onOpenButler,
  filterState,
}) => {
  const [editingTitle, setEditingTitle] = useState(false);
  const [titleValue, setTitleValue] = useState(board.title);
  const [shareCopied, setShareCopied] = useState(false);

  const activeFilterCount =
    (filterState.search.trim() ? 1 : 0) +
    filterState.selectedLabelIds.length +
    filterState.selectedMemberIds.length +
    (filterState.dueFilter !== 'all' ? 1 : 0);

  const handleTitleSubmit = () => {
    if (titleValue.trim()) {
      onUpdateTitle(titleValue.trim());
    } else {
      setTitleValue(board.title);
    }
    setEditingTitle(false);
  };

  const handleShareClick = () => {
    setShareCopied(true);
    navigator.clipboard?.writeText(window.location.href);
    setTimeout(() => setShareCopied(false), 2000);
  };

  return (
    <div className="h-13 bg-black/20 backdrop-blur-md px-4 flex items-center justify-between text-white border-b border-white/10 select-none overflow-x-auto no-scrollbar gap-3 z-20">
      {/* Left side: Board Title, Star, Visibility, Views */}
      <div className="flex items-center gap-2 shrink-0">
        {/* Board Title (Editable) */}
        {editingTitle ? (
          <input
            type="text"
            value={titleValue}
            onChange={(e) => setTitleValue(e.target.value)}
            onBlur={handleTitleSubmit}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleTitleSubmit();
              if (e.key === 'Escape') {
                setTitleValue(board.title);
                setEditingTitle(false);
              }
            }}
            autoFocus
            className="px-2.5 py-1 text-base font-bold bg-white text-slate-900 rounded-md outline-none ring-2 ring-blue-500 max-w-[280px]"
          />
        ) : (
          <button
            onClick={() => setEditingTitle(true)}
            className="px-2.5 py-1 text-base font-bold text-white hover:bg-white/20 rounded-md transition-colors cursor-pointer"
            title="Click to rename board"
          >
            {board.title}
          </button>
        )}

        {/* Star Button */}
        <button
          onClick={onToggleStar}
          className={`p-1.5 rounded-md hover:bg-white/20 transition-colors ${
            board.isStarred ? 'text-amber-300' : 'text-white/70 hover:text-white'
          }`}
          title={board.isStarred ? 'Starred board' : 'Star this board'}
        >
          <Star className={`w-4 h-4 ${board.isStarred ? 'fill-amber-300' : ''}`} />
        </button>

        {/* Separator */}
        <div className="w-[1px] h-5 bg-white/20 mx-1" />

        {/* Workspace Visibility Pill */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white/10 hover:bg-white/20 rounded-md text-xs font-medium cursor-pointer text-white/90">
          <Users className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Workspace Visible</span>
        </div>

        {/* View Switcher Tabs (Board, Table, Calendar) */}
        <div className="flex items-center bg-black/25 p-0.5 rounded-lg border border-white/10 ml-1">
          <button
            onClick={() => onChangeView('board')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
              activeView === 'board'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-white/80 hover:text-white hover:bg-white/10'
            }`}
          >
            <Layout className="w-3.5 h-3.5" />
            <span>Board</span>
          </button>

          <button
            onClick={() => onChangeView('table')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
              activeView === 'table'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-white/80 hover:text-white hover:bg-white/10'
            }`}
          >
            <Table className="w-3.5 h-3.5" />
            <span>Table</span>
          </button>

          <button
            onClick={() => onChangeView('calendar')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
              activeView === 'calendar'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-white/80 hover:text-white hover:bg-white/10'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Calendar</span>
          </button>
        </div>
      </div>

      {/* Right side: Butler, Power-Ups, Filter, Share, Background */}
      <div className="flex items-center gap-2 shrink-0">
        {/* Butler Automation */}
        <button
          onClick={onOpenButler}
          className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white/10 hover:bg-white/20 rounded-md text-xs font-medium text-white transition-colors cursor-pointer"
          title="Butler Automation"
        >
          <Zap className="w-3.5 h-3.5 text-amber-300" />
          <span className="hidden md:inline">Automation</span>
        </button>

        {/* Filter Cards */}
        <button
          onClick={onOpenFilter}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
            activeFilterCount > 0
              ? 'bg-white text-blue-700 font-bold shadow-xs'
              : 'bg-white/10 hover:bg-white/20 text-white'
          }`}
          title="Filter cards"
        >
          <Filter className="w-3.5 h-3.5" />
          <span>Filters</span>
          {activeFilterCount > 0 && (
            <span className="w-4 h-4 rounded-full bg-blue-600 text-white text-[10px] flex items-center justify-center font-bold">
              {activeFilterCount}
            </span>
          )}
        </button>

        {/* Background Customizer */}
        <button
          onClick={onOpenBackgroundPicker}
          className="p-1.5 bg-white/10 hover:bg-white/20 rounded-md text-white transition-colors cursor-pointer"
          title="Change board background theme"
        >
          <Palette className="w-4 h-4" />
        </button>

        {/* Share Button */}
        <button
          onClick={handleShareClick}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-white text-slate-900 hover:bg-slate-100 rounded-md text-xs font-bold transition-all shadow-xs cursor-pointer"
        >
          {shareCopied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>Link Copied!</span>
            </>
          ) : (
            <>
              <Share2 className="w-3.5 h-3.5 text-slate-700" />
              <span>Share</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

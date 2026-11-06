import React, { useState } from 'react';
import { TrelloLogo } from '../common/TrelloLogo';
import {
  Grid,
  ChevronDown,
  Search,
  Bell,
  HelpCircle,
  Plus,
  Globe,
  Star,
  Check,
  X,
} from 'lucide-react';
import { Board, Member } from '../../types/trello';

interface AppHeaderProps {
  board: Board;
  currentMember: Member;
  onSwitchToWebsite: () => void;
  onOpenCardModal: (cardId: string) => void;
  onCreateCard: () => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  board,
  currentMember,
  onSwitchToWebsite,
  onOpenCardModal,
  onCreateCard,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [workspaceMenuOpen, setWorkspaceMenuOpen] = useState(false);

  const matchedCards = searchQuery.trim()
    ? Object.values(board.cards).filter(
        (c) =>
          c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.description?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <header className="h-12 bg-[#091E42] text-white px-3 flex items-center justify-between border-b border-white/10 select-none z-30 relative text-xs">
      {/* Left side brand & navigation */}
      <div className="flex items-center gap-1 sm:gap-2">
        {/* Atlassian App Switcher */}
        <button
          className="p-1.5 rounded hover:bg-white/10 text-white/80 hover:text-white transition-colors"
          title="Atlassian Apps"
        >
          <Grid className="w-4 h-4" />
        </button>

        {/* Trello Logo */}
        <button
          onClick={onSwitchToWebsite}
          className="flex items-center gap-1.5 px-2 py-1 rounded hover:bg-white/10 transition-colors cursor-pointer mr-1"
          title="Trello Home"
        >
          <TrelloLogo variant="white" size="sm" />
        </button>

        {/* Workspace Dropdown */}
        <div className="relative hidden md:block">
          <button
            onClick={() => setWorkspaceMenuOpen(!workspaceMenuOpen)}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded hover:bg-white/10 font-semibold text-white/90 transition-colors"
          >
            <span>Workspaces</span>
            <ChevronDown className="w-3.5 h-3.5 text-white/70" />
          </button>

          {workspaceMenuOpen && (
            <div className="absolute top-full left-0 mt-1 w-64 bg-white text-slate-800 rounded-lg shadow-xl border border-slate-200 p-2 z-50 animate-in fade-in duration-100">
              <div className="text-[10px] uppercase font-bold text-slate-400 px-2 py-1">Current Workspace</div>
              <div className="p-2 rounded bg-blue-50 text-blue-900 font-semibold flex items-center justify-between">
                <span>{board.workspaceName}</span>
                <Check className="w-3.5 h-3.5 text-blue-600" />
              </div>
              <div className="text-[10px] uppercase font-bold text-slate-400 px-2 pt-3 pb-1">Your Workspaces</div>
              <div className="p-2 rounded hover:bg-slate-100 text-slate-700 cursor-pointer">
                Product Engineering Core
              </div>
              <div className="p-2 rounded hover:bg-slate-100 text-slate-700 cursor-pointer">
                Marketing & Creative 2026
              </div>
            </div>
          )}
        </div>

        {/* Recent */}
        <button className="hidden lg:flex items-center gap-1 px-2.5 py-1.5 rounded hover:bg-white/10 font-medium text-white/80 transition-colors">
          <span>Recent</span>
          <ChevronDown className="w-3.5 h-3.5 text-white/70" />
        </button>

        {/* Starred */}
        <button className="hidden lg:flex items-center gap-1 px-2.5 py-1.5 rounded hover:bg-white/10 font-medium text-white/80 transition-colors">
          <span>Starred</span>
          <ChevronDown className="w-3.5 h-3.5 text-white/70" />
        </button>

        {/* Create Button */}
        <button
          onClick={onCreateCard}
          className="flex items-center gap-1 px-2.5 py-1.5 rounded bg-blue-600 hover:bg-blue-500 font-semibold text-white shadow-xs transition-colors ml-1 cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Create</span>
        </button>
      </div>

      {/* Center / Right side search and actions */}
      <div className="flex items-center gap-2">
        {/* Search Input */}
        <div className="relative">
          <div className="flex items-center bg-white/20 hover:bg-white/30 focus-within:bg-white focus-within:text-slate-900 rounded-md px-2.5 py-1 transition-all w-32 sm:w-48 md:w-60">
            <Search className="w-3.5 h-3.5 text-white/70 group-focus-within:text-slate-500 shrink-0 mr-1.5" />
            <input
              type="text"
              placeholder="Search cards..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
              className="w-full bg-transparent border-none outline-none text-xs text-white focus:text-slate-900 placeholder:text-white/60 focus:placeholder:text-slate-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-white/70 hover:text-white"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Instant Search Popup */}
          {searchFocused && searchQuery.trim() && (
            <div className="absolute top-full right-0 mt-1 w-80 bg-white text-slate-800 rounded-lg shadow-2xl border border-slate-200 p-2 z-50">
              <div className="text-[10px] font-bold uppercase text-slate-400 px-2 py-1">
                Matching Cards ({matchedCards.length})
              </div>
              {matchedCards.length === 0 ? (
                <div className="p-3 text-xs text-slate-500 text-center">
                  No cards found matching "{searchQuery}"
                </div>
              ) : (
                <div className="max-h-60 overflow-y-auto space-y-1">
                  {matchedCards.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => onOpenCardModal(c.id)}
                      className="w-full p-2 text-left rounded hover:bg-blue-50 text-xs font-medium text-slate-800 flex flex-col transition-colors cursor-pointer"
                    >
                      <span>{c.title}</span>
                      <span className="text-[10px] text-slate-500">
                        in {board.lists.find((l) => l.id === c.listId)?.title}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Switcher to Official Website */}
        <button
          onClick={onSwitchToWebsite}
          className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-white/10 hover:bg-white/20 text-white rounded font-medium transition-colors cursor-pointer"
          title="Return to Trello Official Website"
        >
          <Globe className="w-3.5 h-3.5 text-blue-300" />
          <span>Official Site</span>
        </button>

        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="p-1.5 rounded-full hover:bg-white/10 text-white/80 hover:text-white relative transition-colors"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500 ring-2 ring-[#091E42]" />
          </button>

          {notificationsOpen && (
            <div className="absolute top-full right-0 mt-1 w-80 bg-white text-slate-800 rounded-xl shadow-2xl border border-slate-200 p-3 z-50 animate-in fade-in duration-100">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-2">
                <span className="font-bold text-xs text-slate-900">Notifications</span>
                <span className="text-[10px] text-blue-600 font-semibold cursor-pointer">Mark all as read</span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="p-2 bg-blue-50/60 rounded-lg border border-blue-100">
                  <div className="font-semibold text-slate-900">Alex Rivera commented on</div>
                  <div className="text-blue-700 font-medium truncate">Interactive Board, Table & Calendar switcher</div>
                  <div className="text-[10px] text-slate-400 mt-1">10 minutes ago</div>
                </div>
                <div className="p-2 hover:bg-slate-50 rounded-lg">
                  <div className="font-semibold text-slate-900">Sarah Connor assigned you to</div>
                  <div className="text-slate-700 font-medium truncate">Design anatomy breakdown for Card Modal</div>
                  <div className="text-[10px] text-slate-400 mt-1">2 hours ago</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Member Profile Avatar */}
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs text-white ring-2 ring-white/30 cursor-pointer overflow-hidden"
          style={{ backgroundColor: currentMember.color }}
          title={`${currentMember.name} (${currentMember.initials})`}
        >
          {currentMember.avatar ? (
            <img src={currentMember.avatar} alt={currentMember.name} className="w-full h-full object-cover" />
          ) : (
            currentMember.initials
          )}
        </div>
      </div>
    </header>
  );
};

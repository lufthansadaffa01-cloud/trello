import React, { useState } from 'react';
import { CheckSquare, Clock, Paperclip, MessageSquare, Tag, Users, ShieldCheck, Sparkles } from 'lucide-react';

export const CardsFeature: React.FC = () => {
  const [highlightedFeature, setHighlightedFeature] = useState<'checklists' | 'dates' | 'labels' | 'members' | 'attachments'>('checklists');

  return (
    <section id="cards" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <p className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-2">
            CARD ANATOMY
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#091E42] tracking-tight">
            Cards contain everything you need
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            Trello cards are your portal to more organized work—where every single part of your task can be managed, tracked, and shared with teammates.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Interactive Feature Selector Buttons */}
          <div className="lg:col-span-5 space-y-3">
            <button
              onClick={() => setHighlightedFeature('checklists')}
              className={`w-full p-4 rounded-xl text-left border transition-all cursor-pointer ${
                highlightedFeature === 'checklists'
                  ? 'bg-white border-blue-500 shadow-md ring-2 ring-blue-500/20'
                  : 'bg-white/70 border-slate-200 hover:bg-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-emerald-100 text-emerald-700">
                  <CheckSquare className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Subtasks & Checklists</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Break complex tasks down with dynamic percentage meters.</p>
                </div>
              </div>
            </button>

            <button
              onClick={() => setHighlightedFeature('dates')}
              className={`w-full p-4 rounded-xl text-left border transition-all cursor-pointer ${
                highlightedFeature === 'dates'
                  ? 'bg-white border-blue-500 shadow-md ring-2 ring-blue-500/20'
                  : 'bg-white/70 border-slate-200 hover:bg-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-amber-100 text-amber-700">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Due Dates & Reminders</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Visual badges alert teams before items go overdue.</p>
                </div>
              </div>
            </button>

            <button
              onClick={() => setHighlightedFeature('labels')}
              className={`w-full p-4 rounded-xl text-left border transition-all cursor-pointer ${
                highlightedFeature === 'labels'
                  ? 'bg-white border-blue-500 shadow-md ring-2 ring-blue-500/20'
                  : 'bg-white/70 border-slate-200 hover:bg-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-100 text-purple-700">
                  <Tag className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Categorized Color Labels</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Filter by priorities, workstreams, and departments.</p>
                </div>
              </div>
            </button>

            <button
              onClick={() => setHighlightedFeature('members')}
              className={`w-full p-4 rounded-xl text-left border transition-all cursor-pointer ${
                highlightedFeature === 'members'
                  ? 'bg-white border-blue-500 shadow-md ring-2 ring-blue-500/20'
                  : 'bg-white/70 border-slate-200 hover:bg-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-100 text-blue-700">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Assignees & Collaboration</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Assign accountability with avatars and in-card discussion.</p>
                </div>
              </div>
            </button>
          </div>

          {/* Interactive Card Exploded Graphic */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xl relative overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 -mx-6 -mt-6 sm:-mx-8 sm:-mt-8 h-20 mb-6 flex items-center px-6 text-white font-medium text-xs">
              <span className="flex items-center gap-1.5"><Sparkles className="w-4 h-4" /> Card Cover: Brand Design System</span>
            </div>

            <div className="space-y-4">
              {/* Title & List tag */}
              <div>
                <h3 className="text-xl font-bold text-slate-900">Overhaul Navigation Bar & Mobile Drawer</h3>
                <p className="text-xs text-slate-500 mt-1">in list <span className="font-semibold text-slate-700 underline">In Progress</span></p>
              </div>

              {/* Members & Labels row */}
              <div className="flex flex-wrap items-center gap-4 pt-1">
                <div className={`p-2 rounded-lg transition-all ${highlightedFeature === 'members' ? 'bg-blue-50 ring-2 ring-blue-400' : ''}`}>
                  <span className="text-[10px] font-bold uppercase text-slate-500 block mb-1">Members</span>
                  <div className="flex -space-x-1.5">
                    <span className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center ring-2 ring-white">ML</span>
                    <span className="w-7 h-7 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center ring-2 ring-white">AR</span>
                  </div>
                </div>

                <div className={`p-2 rounded-lg transition-all ${highlightedFeature === 'labels' ? 'bg-purple-50 ring-2 ring-purple-400' : ''}`}>
                  <span className="text-[10px] font-bold uppercase text-slate-500 block mb-1">Labels</span>
                  <div className="flex gap-1.5">
                    <span className="px-2 py-1 text-xs font-semibold rounded bg-purple-100 text-purple-800">Design System</span>
                    <span className="px-2 py-1 text-xs font-semibold rounded bg-red-100 text-red-800">High Priority</span>
                  </div>
                </div>

                <div className={`p-2 rounded-lg transition-all ${highlightedFeature === 'dates' ? 'bg-amber-50 ring-2 ring-amber-400' : ''}`}>
                  <span className="text-[10px] font-bold uppercase text-slate-500 block mb-1">Due Date</span>
                  <div className="flex items-center gap-1.5 text-xs font-semibold px-2 py-1 rounded bg-amber-100 text-amber-900">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Nov 12 at 5:00 PM</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="pt-2">
                <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5 mb-1.5">
                  Description
                </span>
                <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100 leading-relaxed">
                  Implement responsive drawer menu with accessible touch targets, keyboard navigation trap, and smooth framer motion transitions.
                </p>
              </div>

              {/* Checklist Highlight */}
              <div className={`p-3.5 rounded-xl transition-all border ${highlightedFeature === 'checklists' ? 'bg-emerald-50/50 border-emerald-300 ring-2 ring-emerald-400/40' : 'bg-slate-50/50 border-slate-200'}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <CheckSquare className="w-4 h-4 text-emerald-600" /> Deliverables Checklist
                  </span>
                  <span className="text-xs font-semibold text-emerald-700">67%</span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden mb-3">
                  <div className="bg-emerald-500 h-full w-2/3 transition-all duration-300" />
                </div>
                <div className="space-y-1.5 text-xs">
                  <div className="flex items-center gap-2 text-slate-700 line-through opacity-70">
                    <input type="checkbox" checked readOnly className="rounded text-emerald-600" />
                    <span>Export design assets from Figma</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700 line-through opacity-70">
                    <input type="checkbox" checked readOnly className="rounded text-emerald-600" />
                    <span>Integrate Tailwind breakpoints</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-900 font-medium">
                    <input type="checkbox" readOnly className="rounded text-emerald-600" />
                    <span>Conduct mobile accessibility QA audit</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

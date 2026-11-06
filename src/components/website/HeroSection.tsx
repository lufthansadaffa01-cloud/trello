import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Sparkles, MessageSquare, Paperclip, Clock, Plus } from 'lucide-react';

interface HeroSectionProps {
  onOpenApp: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenApp }) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Mini interactive hero board state so users can play directly in the hero
  const [demoCards, setDemoCards] = useState([
    {
      id: 'hc-1',
      list: 'todo',
      title: 'Draft Q4 Product Launch announcement',
      tag: 'Marketing',
      tagColor: 'bg-emerald-100 text-emerald-800',
      done: false,
      hasChecklist: true,
      checklistCount: '2/3',
      due: 'Tomorrow',
    },
    {
      id: 'hc-2',
      list: 'doing',
      title: 'Review design tokens & dark mode',
      tag: 'Design',
      tagColor: 'bg-purple-100 text-purple-800',
      done: false,
      hasChecklist: false,
      due: 'Nov 10',
    },
    {
      id: 'hc-3',
      list: 'done',
      title: 'Integrate Slack & Jira notifications',
      tag: 'Dev',
      tagColor: 'bg-blue-100 text-blue-800',
      done: true,
      hasChecklist: true,
      checklistCount: '4/4',
      due: 'Completed',
    },
  ]);

  const handleHeroSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setTimeout(() => {
        onOpenApp();
      }, 700);
    } else {
      onOpenApp();
    }
  };

  const moveDemoCard = (cardId: string, targetList: 'todo' | 'doing' | 'done') => {
    setDemoCards((prev) =>
      prev.map((c) =>
        c.id === cardId ? { ...c, list: targetList, done: targetList === 'done' } : c
      )
    );
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#EAE6FF] via-[#F4F5F7] to-white pt-16 pb-20 lg:pt-24 lg:pb-28">
      {/* Subtle decorative glow */}
      <div className="absolute top-0 right-0 -mr-40 -mt-40 w-96 h-96 rounded-full bg-blue-200/40 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-0 -ml-40 w-80 h-80 rounded-full bg-purple-200/40 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline & CTA */}
          <div className="lg:col-span-6 text-center lg:text-left space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/80 border border-purple-200/60 rounded-full text-xs font-semibold text-purple-900 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-purple-600" />
              <span>What's new: Advanced Trello Views & Automation</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#091E42] tracking-tight leading-[1.12]">
              Trello brings all your tasks, teammates, and tools together
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Keep everything in the same place—even if your team isn’t. Collaborate, manage projects, and reach new productivity peaks with intuitive visual boards.
            </p>

            {/* Email Signup Form */}
            <form onSubmit={handleHeroSubmit} className="pt-2 flex flex-col sm:flex-row gap-3 max-w-lg mx-auto lg:mx-0">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your work email"
                className="flex-1 px-4 py-3.5 bg-white border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0065FF] focus:border-transparent shadow-xs text-sm"
              />
              <button
                type="submit"
                className="px-6 py-3.5 text-sm font-semibold text-white bg-[#0065FF] hover:bg-[#0747A6] rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer whitespace-nowrap"
              >
                {submitted ? 'Starting Trello...' : "Sign up – it's free!"}
              </button>
            </form>

            <div className="flex items-center justify-center lg:justify-start gap-4 text-xs text-slate-500 pt-1">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Free forever
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> No credit card required
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Instant setup
              </span>
            </div>
          </div>

          {/* Right Column: Interactive Hero Live Kanban Preview */}
          <div className="lg:col-span-6">
            <div className="bg-[#026AA7] p-4 sm:p-5 rounded-2xl shadow-2xl border border-blue-400/30 text-white relative">
              {/* Header inside simulated board */}
              <div className="flex items-center justify-between pb-4 border-b border-white/20 mb-4">
                <div className="flex items-center gap-2.5">
                  <span className="w-3 h-3 rounded-full bg-red-400" />
                  <span className="w-3 h-3 rounded-full bg-yellow-400" />
                  <span className="w-3 h-3 rounded-full bg-green-400" />
                  <span className="ml-2 font-semibold text-sm tracking-wide text-white">
                    Product Roadmap & Sprint 42
                  </span>
                </div>
                <button
                  onClick={onOpenApp}
                  className="text-xs bg-white/20 hover:bg-white/30 text-white font-medium px-2.5 py-1 rounded-md transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span>Open Full Board</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              {/* 3 mini columns */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Column 1: To Do */}
                <div className="bg-[#EBECF0] rounded-xl p-2.5 text-slate-900 shadow-sm flex flex-col min-h-[220px]">
                  <div className="flex items-center justify-between px-1 mb-2">
                    <span className="text-xs font-bold text-slate-700 tracking-wide uppercase">To Do</span>
                    <span className="text-xs bg-slate-200 text-slate-600 font-semibold px-1.5 py-0.5 rounded">
                      {demoCards.filter((c) => c.list === 'todo').length}
                    </span>
                  </div>

                  <div className="space-y-2 flex-1">
                    {demoCards
                      .filter((c) => c.list === 'todo')
                      .map((card) => (
                        <div
                          key={card.id}
                          className="bg-white p-2.5 rounded-lg shadow-xs hover:shadow-md transition-all border border-slate-200/80 cursor-pointer"
                          onClick={() => moveDemoCard(card.id, 'doing')}
                          title="Click to move to Doing"
                        >
                          <span className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded ${card.tagColor} mb-1.5`}>
                            {card.tag}
                          </span>
                          <p className="text-xs font-semibold text-slate-800 leading-snug">{card.title}</p>
                          <div className="flex items-center justify-between text-[10px] text-slate-500 mt-2.5 pt-1.5 border-t border-slate-100">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3 text-slate-400" /> {card.due}
                            </span>
                            {card.hasChecklist && (
                              <span className="flex items-center gap-1 font-medium text-emerald-700">
                                <CheckCircle2 className="w-3 h-3" /> {card.checklistCount}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                  </div>

                  <button
                    onClick={onOpenApp}
                    className="mt-2 w-full py-1 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-200/80 rounded flex items-center justify-center gap-1 transition-colors"
                  >
                    <Plus className="w-3 h-3" /> Add a card
                  </button>
                </div>

                {/* Column 2: Doing */}
                <div className="bg-[#EBECF0] rounded-xl p-2.5 text-slate-900 shadow-sm flex flex-col min-h-[220px]">
                  <div className="flex items-center justify-between px-1 mb-2">
                    <span className="text-xs font-bold text-slate-700 tracking-wide uppercase">Doing</span>
                    <span className="text-xs bg-slate-200 text-slate-600 font-semibold px-1.5 py-0.5 rounded">
                      {demoCards.filter((c) => c.list === 'doing').length}
                    </span>
                  </div>

                  <div className="space-y-2 flex-1">
                    {demoCards
                      .filter((c) => c.list === 'doing')
                      .map((card) => (
                        <div
                          key={card.id}
                          className="bg-white p-2.5 rounded-lg shadow-xs hover:shadow-md transition-all border border-slate-200/80 cursor-pointer"
                          onClick={() => moveDemoCard(card.id, 'done')}
                          title="Click to move to Done"
                        >
                          <span className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded ${card.tagColor} mb-1.5`}>
                            {card.tag}
                          </span>
                          <p className="text-xs font-semibold text-slate-800 leading-snug">{card.title}</p>
                          <div className="flex items-center justify-between text-[10px] text-slate-500 mt-2.5 pt-1.5 border-t border-slate-100">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3 text-slate-400" /> {card.due}
                            </span>
                            <span className="text-blue-600 font-medium">In progress</span>
                          </div>
                        </div>
                      ))}
                  </div>

                  <button
                    onClick={onOpenApp}
                    className="mt-2 w-full py-1 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-200/80 rounded flex items-center justify-center gap-1 transition-colors"
                  >
                    <Plus className="w-3 h-3" /> Add a card
                  </button>
                </div>

                {/* Column 3: Done */}
                <div className="bg-[#EBECF0] rounded-xl p-2.5 text-slate-900 shadow-sm flex flex-col min-h-[220px]">
                  <div className="flex items-center justify-between px-1 mb-2">
                    <span className="text-xs font-bold text-slate-700 tracking-wide uppercase">Done</span>
                    <span className="text-xs bg-emerald-100 text-emerald-800 font-semibold px-1.5 py-0.5 rounded">
                      {demoCards.filter((c) => c.list === 'done').length}
                    </span>
                  </div>

                  <div className="space-y-2 flex-1">
                    {demoCards
                      .filter((c) => c.list === 'done')
                      .map((card) => (
                        <div
                          key={card.id}
                          className="bg-white p-2.5 rounded-lg shadow-xs hover:shadow-md transition-all border border-slate-200/80 cursor-pointer opacity-90"
                          onClick={() => moveDemoCard(card.id, 'todo')}
                          title="Click to move back to To Do"
                        >
                          <span className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded ${card.tagColor} mb-1.5`}>
                            {card.tag}
                          </span>
                          <p className="text-xs font-semibold text-slate-800 line-through leading-snug">{card.title}</p>
                          <div className="flex items-center justify-between text-[10px] text-emerald-700 font-medium mt-2.5 pt-1.5 border-t border-slate-100">
                            <span className="flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" /> Completed
                            </span>
                            <span>{card.checklistCount}</span>
                          </div>
                        </div>
                      ))}
                  </div>

                  <div className="mt-2 p-1 text-center text-[11px] text-slate-500 font-medium">
                    ✨ Click any card above to move it!
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Social Proof Logos Bar */}
        <div className="mt-16 pt-10 border-t border-slate-200/70 text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-6">
            Join over 2,000,000 teams worldwide who rely on Trello every day
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14 opacity-60 grayscale hover:grayscale-0 transition-all">
            <span className="text-base sm:text-lg font-black tracking-tight text-slate-700">VISA</span>
            <span className="text-base sm:text-lg font-black tracking-widest text-slate-700">ZOOM</span>
            <span className="text-base sm:text-lg font-bold tracking-tight text-slate-700">Fender</span>
            <span className="text-base sm:text-lg font-medium tracking-tight text-slate-700">SQUARESPACE</span>
            <span className="text-base sm:text-lg font-extrabold tracking-normal text-slate-700">JOHN DEERE</span>
            <span className="text-base sm:text-lg font-semibold tracking-tighter text-slate-700">coinbase</span>
          </div>
        </div>
      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { Sliders, CheckCircle2, ExternalLink, ArrowRight } from 'lucide-react';

interface PowerUpsSectionProps {
  onOpenApp: () => void;
}

export const PowerUpsSection: React.FC<PowerUpsSectionProps> = ({ onOpenApp }) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'communication' | 'dev' | 'design'>('all');

  const powerUps = [
    {
      id: 'slack',
      name: 'Slack',
      category: 'communication',
      author: 'Slack',
      desc: 'Send cards directly to Slack channels and update status from conversations.',
      icon: '💬',
      badge: 'Most Popular',
    },
    {
      id: 'jira',
      name: 'Jira Software',
      category: 'dev',
      author: 'Atlassian',
      desc: 'Connect Jira issues to Trello cards and track sprint status across teams.',
      icon: '🔷',
      badge: 'Atlassian Core',
    },
    {
      id: 'drive',
      name: 'Google Drive',
      category: 'communication',
      author: 'Google',
      desc: 'Attach files and folders right to cards with real-time metadata and thumbnail previews.',
      icon: '📁',
      badge: 'Essential',
    },
    {
      id: 'github',
      name: 'GitHub',
      category: 'dev',
      author: 'GitHub',
      desc: 'Attach pull requests, commits, and issues directly to cards with status badges.',
      icon: '🐙',
      badge: 'Developer',
    },
    {
      id: 'figma',
      name: 'Figma',
      category: 'design',
      author: 'Figma',
      desc: 'Embed live interactive Figma files and prototypes directly on cards.',
      icon: '🎨',
      badge: 'Design',
    },
    {
      id: 'miro',
      name: 'Miro',
      category: 'design',
      author: 'Miro',
      desc: 'Attach whiteboard frames and collaborate visually within card discussions.',
      icon: '💡',
      badge: 'Whiteboard',
    },
  ];

  const filtered = powerUps.filter(
    (p) => selectedCategory === 'all' || p.category === selectedCategory
  );

  return (
    <section id="powerups" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-2">
            INTEGRATIONS & ECOSYSTEM
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#091E42] tracking-tight">
            Connect the apps your team already uses
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            Unleash the full power of your team's stack. With over 200+ Power-Ups, connect Jira, Slack, Google Drive, and GitHub right into your workflow.
          </p>
        </div>

        {/* Filter categories */}
        <div className="flex items-center justify-center gap-2 mb-10 overflow-x-auto pb-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
              selectedCategory === 'all'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
            }`}
          >
            All Power-Ups
          </button>
          <button
            onClick={() => setSelectedCategory('communication')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
              selectedCategory === 'communication'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
            }`}
          >
            Communication & Docs
          </button>
          <button
            onClick={() => setSelectedCategory('dev')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
              selectedCategory === 'dev'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
            }`}
          >
            Developer & IT
          </button>
          <button
            onClick={() => setSelectedCategory('design')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
              selectedCategory === 'design'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
            }`}
          >
            Design & Whiteboarding
          </button>
        </div>

        {/* Power-Up Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-2xl shadow-2xs">
                    {item.icon}
                  </div>
                  <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
                    {item.badge}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900">{item.name}</h3>
                <p className="text-xs text-slate-500 mt-1 mb-3">By {item.author}</p>
                <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-medium text-emerald-600 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Instant Connect
                </span>
                <button
                  onClick={onOpenApp}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
                >
                  Enable in Board <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

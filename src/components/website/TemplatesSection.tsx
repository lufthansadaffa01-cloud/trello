import React from 'react';
import { TEMPLATES } from '../../data/initialData';
import { ArrowRight, Copy, Users } from 'lucide-react';

interface TemplatesSectionProps {
  onSelectTemplate: (templateId: string) => void;
}

export const TemplatesSection: React.FC<TemplatesSectionProps> = ({ onSelectTemplate }) => {
  return (
    <section id="templates" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-2">
              PROVEN WORKFLOWS
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#091E42] tracking-tight">
              Get started with pre-built templates
            </h2>
            <p className="mt-3 text-base text-slate-600 max-w-xl">
              No need to start from scratch. Adopt industry-standard setups created by top engineering, design, and product teams.
            </p>
          </div>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEMPLATES.map((tpl) => (
            <div
              key={tpl.id}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Header banner */}
                <div
                  className="h-20 p-4 flex items-end text-white font-bold text-sm relative"
                  style={{ backgroundColor: tpl.color }}
                >
                  <span className="text-[10px] uppercase font-bold tracking-wider bg-black/30 px-2 py-0.5 rounded backdrop-blur-xs">
                    {tpl.category}
                  </span>
                </div>

                <div className="p-5">
                  <h3 className="font-bold text-slate-900 text-base group-hover:text-blue-600 transition-colors">
                    {tpl.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 mb-3">By {tpl.author}</p>
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">
                    {tpl.description}
                  </p>

                  {/* List preview tags */}
                  <div className="flex flex-wrap gap-1 text-[10px] text-slate-500 font-medium">
                    {tpl.lists.slice(0, 3).map((l, i) => (
                      <span key={i} className="bg-slate-100 px-2 py-0.5 rounded">
                        {l}
                      </span>
                    ))}
                    {tpl.lists.length > 3 && (
                      <span className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-400">
                        +{tpl.lists.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0">
                <button
                  onClick={() => onSelectTemplate(tpl.id)}
                  className="w-full py-2.5 px-4 bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-800 text-xs font-semibold rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Use this template</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

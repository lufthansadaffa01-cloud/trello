import React, { useState } from 'react';
import { Zap, Play, CheckCircle2, ArrowRight, Bell, Calendar, RefreshCw } from 'lucide-react';

export const AutomationSection: React.FC = () => {
  const [trigger, setTrigger] = useState('card_moved_done');
  const [actionSlack, setActionSlack] = useState(true);
  const [actionDueDate, setActionDueDate] = useState(true);
  const [actionConfetti, setActionConfetti] = useState(true);
  const [testResult, setTestResult] = useState<string | null>(null);

  const handleTestRule = () => {
    setTestResult('Running Butler automation rule...');
    setTimeout(() => {
      const actions = [];
      if (actionDueDate) actions.push('marked due date as complete');
      if (actionSlack) actions.push('posted message to #engineering channel');
      if (actionConfetti) actions.push('celebrated achievement');
      setTestResult(`⚡ Rule executed successfully! Completed: ${actions.join(', ')}.`);
    }, 600);
  };

  return (
    <section id="automation" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-800 border border-amber-200/80 rounded-full text-xs font-semibold">
              <Zap className="w-3.5 h-3.5 text-amber-600" />
              <span>Butler Automation</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#091E42] tracking-tight">
              Work smarter with no-code automation
            </h2>

            <p className="text-slate-600 text-base leading-relaxed">
              Let the robots do the tedious work. Butler uses natural language commands to automate routine tasks, create custom board buttons, and sync with your tools—with zero coding required.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <div className="p-1.5 bg-blue-50 text-blue-600 rounded-md shrink-0 mt-0.5">
                  <Play className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800">Rule-based triggers</h4>
                  <p className="text-xs text-slate-500">React instantly when cards are moved, labels are changed, or due dates approach.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-1.5 bg-purple-50 text-purple-600 rounded-md shrink-0 mt-0.5">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800">Scheduled calendar commands</h4>
                  <p className="text-xs text-slate-500">Generate recurring sprint checklists, reset boards, and archive stale tasks every week.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Automation Builder Sandbox */}
          <div className="lg:col-span-7 bg-gradient-to-br from-slate-900 to-slate-800 text-white p-6 sm:p-8 rounded-2xl shadow-xl border border-slate-700">
            <div className="flex items-center justify-between pb-4 border-b border-slate-700/80 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                  <Zap className="w-4 h-4" />
                </div>
                <span className="font-semibold text-sm text-slate-200">Interactive Butler Rule Builder</span>
              </div>
              <span className="text-[11px] bg-slate-800 px-2.5 py-1 rounded-full text-slate-400 font-mono">
                No code required
              </span>
            </div>

            {/* Trigger Selector */}
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                  When this happens (Trigger):
                </label>
                <select
                  value={trigger}
                  onChange={(e) => setTrigger(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="card_moved_done">When a card is moved to list "Done 🎉"</option>
                  <option value="checklist_complete">When all items in a checklist are marked complete</option>
                  <option value="due_date_tomorrow">When a due date is within 24 hours</option>
                </select>
              </div>

              {/* Action Checkboxes */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                  Do these actions automatically:
                </label>
                <div className="space-y-2.5 bg-slate-800/60 p-3.5 rounded-lg border border-slate-700/70">
                  <label className="flex items-center gap-3 text-sm text-slate-300 cursor-pointer hover:text-white">
                    <input
                      type="checkbox"
                      checked={actionDueDate}
                      onChange={(e) => setActionDueDate(e.target.checked)}
                      className="rounded bg-slate-700 border-slate-600 text-blue-500 focus:ring-0"
                    />
                    <span>Mark the card's due date as complete</span>
                  </label>

                  <label className="flex items-center gap-3 text-sm text-slate-300 cursor-pointer hover:text-white">
                    <input
                      type="checkbox"
                      checked={actionSlack}
                      onChange={(e) => setActionSlack(e.target.checked)}
                      className="rounded bg-slate-700 border-slate-600 text-blue-500 focus:ring-0"
                    />
                    <span>Notify teammates in #sprint-announcements on Slack</span>
                  </label>

                  <label className="flex items-center gap-3 text-sm text-slate-300 cursor-pointer hover:text-white">
                    <input
                      type="checkbox"
                      checked={actionConfetti}
                      onChange={(e) => setActionConfetti(e.target.checked)}
                      className="rounded bg-slate-700 border-slate-600 text-blue-500 focus:ring-0"
                    />
                    <span>Log completion timestamp and update velocity chart</span>
                  </label>
                </div>
              </div>

              {/* Test Button & Output */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
                <button
                  onClick={handleTestRule}
                  className="w-full sm:w-auto px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm rounded-lg flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>Test this rule now</span>
                </button>

                {testResult && (
                  <p className="text-xs text-amber-300 bg-amber-950/40 border border-amber-800/50 p-2 rounded-lg flex-1">
                    {testResult}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { Layout, Calendar, Table, Clock, BarChart3, ArrowRight, Check, CheckCircle2 } from 'lucide-react';

interface ViewsShowcaseProps {
  onOpenAppWithView: (view: 'board' | 'table' | 'calendar') => void;
}

export const ViewsShowcase: React.FC<ViewsShowcaseProps> = ({ onOpenAppWithView }) => {
  const [activeTab, setActiveTab] = useState<'board' | 'timeline' | 'table' | 'calendar' | 'dashboard'>('board');

  return (
    <section id="views" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-2">
            TRELLO IN ACTION
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#091E42] tracking-tight">
            A powerhouse for productive teams
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            Work isn’t one-size-fits-all. Keep projects moving forward by viewing your team’s work from every angle: Kanban boards, spreadsheets, timelines, or calendars.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto gap-2 pb-4 mb-8 no-scrollbar">
          <button
            onClick={() => setActiveTab('board')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'board'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Layout className="w-4 h-4" /> Board
          </button>

          <button
            onClick={() => setActiveTab('timeline')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'timeline'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Clock className="w-4 h-4" /> Timeline
          </button>

          <button
            onClick={() => setActiveTab('table')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'table'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Table className="w-4 h-4" /> Table
          </button>

          <button
            onClick={() => setActiveTab('calendar')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'calendar'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Calendar className="w-4 h-4" /> Calendar
          </button>

          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'dashboard'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <BarChart3 className="w-4 h-4" /> Dashboard
          </button>
        </div>

        {/* Tab Showcase Card */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left description */}
            <div className="lg:col-span-5 space-y-5">
              {activeTab === 'board' && (
                <>
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Visual Workflow</span>
                  <h3 className="text-2xl font-bold text-slate-900">Hit the ground running with boards</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Trello boards keep tasks organized and work moving forward. In a glance, see everything from “things to do” to “aww yeah, we did it!”
                  </p>
                  <ul className="space-y-2.5 text-sm text-slate-700">
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Drag-and-drop cards effortlessly</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Color-coded labels and member avatars</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Checklists with instant progress tracking</li>
                  </ul>
                  <button
                    onClick={() => onOpenAppWithView('board')}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg shadow-sm transition-all"
                  >
                    Open Live Board View <ArrowRight className="w-4 h-4" />
                  </button>
                </>
              )}

              {activeTab === 'timeline' && (
                <>
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Schedule & Roadmap</span>
                  <h3 className="text-2xl font-bold text-slate-900">Stay on top of deadlines with Timeline</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Plan ahead, spot potential bottlenecks, and see how all the moving pieces fit together over time with Gantt-style planning.
                  </p>
                  <ul className="space-y-2.5 text-sm text-slate-700">
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Drag date bars to adjust project milestones</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Group by member, list, or label tag</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Spot workload overlaps before crunch time</li>
                  </ul>
                  <button
                    onClick={() => onOpenAppWithView('board')}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg shadow-sm transition-all"
                  >
                    Explore Workspace <ArrowRight className="w-4 h-4" />
                  </button>
                </>
              )}

              {activeTab === 'table' && (
                <>
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Spreadsheet Power</span>
                  <h3 className="text-2xl font-bold text-slate-900">Connect work across teams with Table</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    View work in a clean spreadsheet list. Sort by due date, filter by assignee, and bulk edit deliverables in seconds.
                  </p>
                  <ul className="space-y-2.5 text-sm text-slate-700">
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Dense multi-column view with instant sort</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Multi-board roll-up reporting</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Quick inline status editing</li>
                  </ul>
                  <button
                    onClick={() => onOpenAppWithView('table')}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg shadow-sm transition-all"
                  >
                    Open Live Table View <ArrowRight className="w-4 h-4" />
                  </button>
                </>
              )}

              {activeTab === 'calendar' && (
                <>
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Calendar Sync</span>
                  <h3 className="text-2xl font-bold text-slate-900">Never miss a beat with Calendar</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Whether managing a quarterly launch or weekly editorial calendar, Calendar view gives you clear day-by-day visibility.
                  </p>
                  <ul className="space-y-2.5 text-sm text-slate-700">
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Drag cards between days to reschedule</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Sync with Google Calendar & Outlook iCal</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Overdue indicator badges</li>
                  </ul>
                  <button
                    onClick={() => onOpenAppWithView('calendar')}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg shadow-sm transition-all"
                  >
                    Open Live Calendar View <ArrowRight className="w-4 h-4" />
                  </button>
                </>
              )}

              {activeTab === 'dashboard' && (
                <>
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Real-time Analytics</span>
                  <h3 className="text-2xl font-bold text-slate-900">Actionable insights with Dashboard</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Communicate team velocity, track cards per member, monitor due date health, and export charts for stakeholder presentations.
                  </p>
                  <ul className="space-y-2.5 text-sm text-slate-700">
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Cards per list velocity bar chart</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Member workload distribution</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-600" /> Real-time status breakdown pie chart</li>
                  </ul>
                  <button
                    onClick={() => onOpenAppWithView('board')}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg shadow-sm transition-all"
                  >
                    Explore Dashboard Metrics <ArrowRight className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>

            {/* Right Interactive Preview Display */}
            <div className="lg:col-span-7 bg-white p-5 rounded-xl border border-slate-200 shadow-sm overflow-hidden min-h-[300px]">
              {activeTab === 'board' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-500 pb-2 border-b border-slate-100">
                    <span className="font-semibold text-slate-800">Sprint Board: Interactive Snapshot</span>
                    <span className="text-emerald-600 font-medium">Synced with workspace</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                      <div className="text-xs font-bold text-slate-700 mb-2">To Do (4)</div>
                      <div className="p-2.5 bg-white rounded border border-slate-200 shadow-2xs mb-2">
                        <div className="w-8 h-1.5 bg-purple-500 rounded mb-1" />
                        <div className="text-xs font-medium text-slate-800">Mobile Navigation UX</div>
                      </div>
                      <div className="p-2.5 bg-white rounded border border-slate-200 shadow-2xs">
                        <div className="w-8 h-1.5 bg-blue-500 rounded mb-1" />
                        <div className="text-xs font-medium text-slate-800">Design token export</div>
                      </div>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                      <div className="text-xs font-bold text-slate-700 mb-2">Done (12)</div>
                      <div className="p-2.5 bg-white rounded border border-slate-200 shadow-2xs mb-2 opacity-80">
                        <div className="w-8 h-1.5 bg-emerald-500 rounded mb-1" />
                        <div className="text-xs font-medium text-slate-700 line-through">Security audit v2</div>
                      </div>
                      <div className="p-2.5 bg-white rounded border border-slate-200 shadow-2xs opacity-80">
                        <div className="w-8 h-1.5 bg-purple-500 rounded mb-1" />
                        <div className="text-xs font-medium text-slate-700 line-through">Atlassian brand lockup</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'timeline' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-500 pb-2 border-b border-slate-100">
                    <span className="font-semibold text-slate-800">Sprint Timeline: Nov 2026</span>
                    <span className="text-blue-600 font-medium">3 Weeks active</span>
                  </div>
                  <div className="space-y-2 pt-2">
                    <div className="flex items-center text-xs">
                      <span className="w-24 font-medium text-slate-600 shrink-0">Design Lead</span>
                      <div className="flex-1 bg-slate-100 h-7 rounded relative overflow-hidden">
                        <div className="absolute left-4 w-32 bg-purple-500 text-white text-[11px] font-medium h-full flex items-center px-2 rounded">
                          UI System Sprint
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center text-xs">
                      <span className="w-24 font-medium text-slate-600 shrink-0">Frontend Dev</span>
                      <div className="flex-1 bg-slate-100 h-7 rounded relative overflow-hidden">
                        <div className="absolute left-20 w-44 bg-blue-600 text-white text-[11px] font-medium h-full flex items-center px-2 rounded">
                          Views Implementation
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center text-xs">
                      <span className="w-24 font-medium text-slate-600 shrink-0">Product QA</span>
                      <div className="flex-1 bg-slate-100 h-7 rounded relative overflow-hidden">
                        <div className="absolute left-48 w-28 bg-emerald-600 text-white text-[11px] font-medium h-full flex items-center px-2 rounded">
                          Launch Gate QA
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'table' && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-500 pb-2 border-b border-slate-100">
                    <span className="font-semibold text-slate-800">Card Registry (Spreadsheet)</span>
                    <span className="text-slate-500">10 Cards across 5 Lists</span>
                  </div>
                  <div className="overflow-x-auto text-xs">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b border-slate-200 text-slate-500">
                          <th className="py-1.5 px-2">Card</th>
                          <th className="py-1.5 px-2">List</th>
                          <th className="py-1.5 px-2">Labels</th>
                          <th className="py-1.5 px-2">Due Date</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        <tr>
                          <td className="py-2 px-2 font-medium text-slate-800">Design anatomy breakdown</td>
                          <td className="py-2 px-2 text-slate-600">To Do</td>
                          <td className="py-2 px-2"><span className="px-1.5 py-0.5 rounded bg-purple-100 text-purple-800 text-[10px]">Design</span></td>
                          <td className="py-2 px-2 text-slate-600">Nov 12</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-2 font-medium text-slate-800">Board, Table & Calendar Switcher</td>
                          <td className="py-2 px-2 text-slate-600">In Progress</td>
                          <td className="py-2 px-2"><span className="px-1.5 py-0.5 rounded bg-blue-100 text-blue-800 text-[10px]">Engineering</span></td>
                          <td className="py-2 px-2 text-slate-600">Nov 08</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-2 font-medium text-slate-800">Atlassian brand lockup</td>
                          <td className="py-2 px-2 text-slate-600">Done 🎉</td>
                          <td className="py-2 px-2"><span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px]">Marketing</span></td>
                          <td className="py-2 px-2 text-emerald-600 font-medium flex items-center gap-1 mt-1"><CheckCircle2 className="w-3 h-3" /> Nov 05</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === 'calendar' && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-500 pb-2 border-b border-slate-100">
                    <span className="font-semibold text-slate-800">November 2026</span>
                    <span className="text-blue-600 font-medium">Month View</span>
                  </div>
                  <div className="grid grid-cols-7 gap-1 text-[11px] text-center font-medium text-slate-500 mb-1">
                    <div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div><div>Sun</div>
                  </div>
                  <div className="grid grid-cols-7 gap-1.5 text-xs">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((d) => (
                      <div key={d} className="p-1 min-h-[50px] border border-slate-100 rounded bg-slate-50 text-[10px] text-left">
                        <span className="text-slate-400 font-semibold">{d}</span>
                        {d === 5 && (
                          <div className="mt-1 bg-emerald-100 text-emerald-800 p-0.5 rounded font-medium truncate">
                            Brand lockup
                          </div>
                        )}
                        {d === 8 && (
                          <div className="mt-1 bg-blue-100 text-blue-800 p-0.5 rounded font-medium truncate">
                            Views switch
                          </div>
                        )}
                        {d === 12 && (
                          <div className="mt-1 bg-purple-100 text-purple-800 p-0.5 rounded font-medium truncate">
                            Card Modal
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'dashboard' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs text-slate-500 pb-2 border-b border-slate-100">
                    <span className="font-semibold text-slate-800">Team Health Metrics</span>
                    <span className="text-emerald-600 font-medium">89% Velocity</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                      <div className="text-xs text-slate-500 mb-1">Cards By Status</div>
                      <div className="space-y-1.5 text-xs">
                        <div className="flex justify-between font-medium">
                          <span>Done (12)</span><span className="text-emerald-600">60%</span>
                        </div>
                        <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                          <div className="bg-emerald-500 h-full w-3/5" />
                        </div>
                        <div className="flex justify-between font-medium pt-1">
                          <span>In Progress (5)</span><span className="text-blue-600">25%</span>
                        </div>
                        <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                          <div className="bg-blue-500 h-full w-1/4" />
                        </div>
                      </div>
                    </div>

                    <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex flex-col justify-between">
                      <div className="text-xs text-slate-500">Upcoming Deadlines</div>
                      <div className="text-2xl font-black text-slate-900">4 <span className="text-xs font-normal text-slate-500">due this week</span></div>
                      <div className="text-[11px] text-emerald-600 font-medium">0 Overdue cards 🎉</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

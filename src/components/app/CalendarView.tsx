import React, { useState } from 'react';
import { Board, Card } from '../../types/trello';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';

interface CalendarViewProps {
  board: Board;
  filteredCards: Card[];
  onOpenCardModal: (cardId: string) => void;
}

export const CalendarView: React.FC<CalendarViewProps> = ({
  board,
  filteredCards,
  onOpenCardModal,
}) => {
  const [currentMonth, setCurrentMonth] = useState(10); // November (0-indexed)
  const year = 2026;

  const daysInMonth = 30; // November has 30 days
  const startDayOfWeek = 6; // Nov 1 2026 was Sunday (0=Sun, 1=Mon, ..., 6=Sat)

  // Group cards by day of month (1-30)
  const cardsByDay: Record<number, Card[]> = {};
  filteredCards.forEach((card) => {
    if (card.dueDate) {
      const d = new Date(card.dueDate);
      if (d.getMonth() === currentMonth) {
        const dayNum = d.getDate();
        if (!cardsByDay[dayNum]) cardsByDay[dayNum] = [];
        cardsByDay[dayNum].push(card);
      }
    }
  });

  return (
    <div className="flex-1 bg-white/95 backdrop-blur-md m-4 rounded-xl shadow-lg border border-slate-200 overflow-hidden flex flex-col">
      {/* Month Navigation */}
      <div className="p-4 border-b border-slate-200 flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-slate-900">November 2026</h2>
          <p className="text-xs text-slate-500">Scheduled card milestones</p>
        </div>
        <div className="flex items-center gap-1">
          <button className="p-1.5 rounded hover:bg-slate-100 text-slate-600">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-xs font-semibold px-2">Today</span>
          <button className="p-1.5 rounded hover:bg-slate-100 text-slate-600">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Weekday Headers */}
      <div className="grid grid-cols-7 text-center py-2 bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-600 uppercase tracking-wider">
        <div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div>
      </div>

      {/* Month Days Grid */}
      <div className="grid grid-cols-7 flex-1 auto-rows-fr divide-x divide-y divide-slate-100 text-xs">
        {/* Empty cells before start of month */}
        {Array.from({ length: startDayOfWeek }).map((_, i) => (
          <div key={`empty-${i}`} className="bg-slate-50/50 p-2 min-h-[90px]" />
        ))}

        {/* Days of November */}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const dayCards = cardsByDay[day] || [];
          const isToday = day === 6;

          return (
            <div
              key={`day-${day}`}
              className={`p-2 min-h-[90px] flex flex-col transition-colors hover:bg-blue-50/30 ${
                isToday ? 'bg-blue-50/50' : 'bg-white'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                    isToday
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-700'
                  }`}
                >
                  {day}
                </span>
                {dayCards.length > 0 && (
                  <span className="text-[10px] text-slate-400 font-medium">
                    {dayCards.length}
                  </span>
                )}
              </div>

              {/* Cards inside this day */}
              <div className="space-y-1 overflow-y-auto flex-1 no-scrollbar">
                {dayCards.map((card) => (
                  <div
                    key={card.id}
                    onClick={() => onOpenCardModal(card.id)}
                    className="p-1 px-1.5 rounded bg-blue-100 hover:bg-blue-200 text-blue-900 text-[11px] font-semibold truncate cursor-pointer shadow-2xs transition-colors flex items-center gap-1"
                  >
                    {card.dueCompleted && <Check className="w-3 h-3 text-emerald-700 shrink-0" />}
                    <span className="truncate">{card.title}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

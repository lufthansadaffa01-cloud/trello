import React from 'react';
import { Card } from '../../types/trello';
import { calculateProgress } from '../../utils/trelloLogic';
import {
  AlignLeft,
  CheckSquare,
  Clock,
  MessageSquare,
  Paperclip,
  Check,
} from 'lucide-react';

interface TrelloCardProps {
  card: Card;
  onClick: () => void;
  onDragStart: (e: React.DragEvent, cardId: string) => void;
}

const LABEL_COLORS: Record<string, { bg: string; text: string }> = {
  purple: { bg: 'bg-[#F3E8FF] border-[#D8B4FE]', text: 'text-[#6B21A8]' },
  blue: { bg: 'bg-[#E0F2FE] border-[#7DD3FC]', text: 'text-[#0369A1]' },
  green: { bg: 'bg-[#DCFCE7] border-[#86EFAC]', text: 'text-[#15803D]' },
  red: { bg: 'bg-[#FEE2E2] border-[#FCA5A5]', text: 'text-[#B91C1C]' },
  yellow: { bg: 'bg-[#FEF9C3] border-[#FDE047]', text: 'text-[#854D0E]' },
  orange: { bg: 'bg-[#FFEDD5] border-[#FDBA74]', text: 'text-[#C2410C]' },
  sky: { bg: 'bg-[#E0F2FE] border-[#38BDF8]', text: 'text-[#0284C7]' },
  lime: { bg: 'bg-[#ECFCCB] border-[#BEF264]', text: 'text-[#4D7C0F]' },
  pink: { bg: 'bg-[#FCE7F3] border-[#F472B6]', text: 'text-[#BE185D]' },
  black: { bg: 'bg-slate-200 border-slate-300', text: 'text-slate-800' },
};

export const TrelloCard: React.FC<TrelloCardProps> = ({
  card,
  onClick,
  onDragStart,
}) => {
  const progress = calculateProgress(card);

  // Due date formatting and state
  const isOverdue =
    card.dueDate &&
    !card.dueCompleted &&
    new Date(card.dueDate).getTime() < Date.now();

  const formattedDueDate = card.dueDate
    ? new Date(card.dueDate).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      })
    : null;

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, card.id)}
      onClick={onClick}
      className="group bg-white rounded-lg shadow-2xs hover:shadow-md border border-slate-200/80 hover:border-slate-300 transition-all cursor-pointer overflow-hidden select-none"
    >
      {/* Cover Color Banner */}
      {card.coverColor && (
        <div
          className="h-8 w-full transition-opacity group-hover:opacity-90"
          style={{ backgroundColor: card.coverColor }}
        />
      )}

      <div className="p-2.5 space-y-2">
        {/* Labels */}
        {card.labels.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {card.labels.map((label) => {
              const colorStyle = LABEL_COLORS[label.color] || LABEL_COLORS.blue;
              return (
                <span
                  key={label.id}
                  className={`text-[10px] font-bold px-2 py-0.5 rounded border ${colorStyle.bg} ${colorStyle.text}`}
                >
                  {label.text}
                </span>
              );
            })}
          </div>
        )}

        {/* Card Title */}
        <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-snug group-hover:text-blue-700 transition-colors">
          {card.title}
        </p>

        {/* Badges footer row: due date, checklist, comments, members */}
        <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 gap-2">
          <div className="flex items-center flex-wrap gap-2.5">
            {/* Due date badge */}
            {card.dueDate && (
              <span
                className={`flex items-center gap-1 px-1.5 py-0.5 rounded font-medium text-[10px] ${
                  card.dueCompleted
                    ? 'bg-emerald-100 text-emerald-800'
                    : isOverdue
                    ? 'bg-red-100 text-red-800'
                    : 'bg-slate-100 text-slate-700'
                }`}
                title={card.dueCompleted ? 'Completed due date' : `Due ${formattedDueDate}`}
              >
                {card.dueCompleted ? (
                  <Check className="w-3 h-3 text-emerald-700" />
                ) : (
                  <Clock className="w-3 h-3" />
                )}
                <span>{formattedDueDate}</span>
              </span>
            )}

            {/* Description indicator */}
            {card.description && (
              <span title="This card has a description">
                <AlignLeft className="w-3.5 h-3.5 text-slate-400" />
              </span>
            )}

            {/* Checklists progress badge */}
            {progress.total > 0 && (
              <span
                className={`flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium ${
                  progress.completed === progress.total
                    ? 'bg-emerald-100 text-emerald-800 font-bold'
                    : 'text-slate-600 bg-slate-100'
                }`}
                title={`Checklist: ${progress.completed}/${progress.total} completed`}
              >
                <CheckSquare className="w-3 h-3" />
                <span>
                  {progress.completed}/{progress.total}
                </span>
              </span>
            )}

            {/* Comments count */}
            {card.comments.length > 0 && (
              <span className="flex items-center gap-1" title={`${card.comments.length} comments`}>
                <MessageSquare className="w-3 h-3 text-slate-400" />
                <span>{card.comments.length}</span>
              </span>
            )}

            {/* Attachments count */}
            {card.attachments.length > 0 && (
              <span className="flex items-center gap-1" title={`${card.attachments.length} attachments`}>
                <Paperclip className="w-3 h-3 text-slate-400" />
                <span>{card.attachments.length}</span>
              </span>
            )}
          </div>

          {/* Member avatars */}
          {card.members.length > 0 && (
            <div className="flex -space-x-1.5 shrink-0">
              {card.members.map((m) => (
                <div
                  key={m.id}
                  className="w-5 h-5 rounded-full flex items-center justify-center font-bold text-[9px] text-white ring-1 ring-white overflow-hidden"
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

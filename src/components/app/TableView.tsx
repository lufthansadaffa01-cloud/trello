import React from 'react';
import { Board, Card } from '../../types/trello';
import { Check, Clock, CheckSquare, Plus } from 'lucide-react';

interface TableViewProps {
  board: Board;
  filteredCards: Card[];
  onOpenCardModal: (cardId: string) => void;
  onAddCard: (listId: string, title: string) => void;
}

export const TableView: React.FC<TableViewProps> = ({
  board,
  filteredCards,
  onOpenCardModal,
  onAddCard,
}) => {
  return (
    <div className="flex-1 bg-white/95 backdrop-blur-md m-4 rounded-xl shadow-lg border border-slate-200 overflow-hidden flex flex-col">
      <div className="p-4 border-b border-slate-200 flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-slate-900">Table View</h2>
          <p className="text-xs text-slate-500">
            Spreadsheet layout: {filteredCards.length} cards across {board.lists.length} lists
          </p>
        </div>
      </div>

      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 text-slate-600 font-bold uppercase tracking-wider border-b border-slate-200">
            <tr>
              <th className="py-3 px-4">Card Title</th>
              <th className="py-3 px-4">List</th>
              <th className="py-3 px-4">Labels</th>
              <th className="py-3 px-4">Members</th>
              <th className="py-3 px-4">Due Date</th>
              <th className="py-3 px-4">Checklist</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredCards.map((card) => {
              const list = board.lists.find((l) => l.id === card.listId);
              const allItems = card.checklists.flatMap((c) => c.items);
              const completedCount = allItems.filter((i) => i.completed).length;

              return (
                <tr
                  key={card.id}
                  onClick={() => onOpenCardModal(card.id)}
                  className="hover:bg-blue-50/50 cursor-pointer transition-colors"
                >
                  <td className="py-3 px-4 font-semibold text-slate-900">
                    <div className="flex items-center gap-2">
                      {card.coverColor && (
                        <span
                          className="w-2.5 h-2.5 rounded-full shrink-0"
                          style={{ backgroundColor: card.coverColor }}
                        />
                      )}
                      <span>{card.title}</span>
                    </div>
                  </td>

                  <td className="py-3 px-4 text-slate-700 font-medium">
                    <span className="px-2 py-0.5 bg-slate-100 rounded text-slate-800">
                      {list?.title}
                    </span>
                  </td>

                  <td className="py-3 px-4">
                    <div className="flex flex-wrap gap-1">
                      {card.labels.map((l) => (
                        <span
                          key={l.id}
                          className="px-2 py-0.5 bg-purple-50 text-purple-700 border border-purple-200 rounded font-semibold text-[10px]"
                        >
                          {l.text}
                        </span>
                      ))}
                    </div>
                  </td>

                  <td className="py-3 px-4">
                    <div className="flex -space-x-1">
                      {card.members.map((m) => (
                        <div
                          key={m.id}
                          className="w-6 h-6 rounded-full flex items-center justify-center font-bold text-[9px] text-white ring-1 ring-white overflow-hidden"
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
                  </td>

                  <td className="py-3 px-4">
                    {card.dueDate ? (
                      <span
                        className={`flex items-center gap-1 font-medium ${
                          card.dueCompleted ? 'text-emerald-700' : 'text-slate-700'
                        }`}
                      >
                        {card.dueCompleted ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                        )}
                        <span>
                          {new Date(card.dueDate).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                          })}
                        </span>
                      </span>
                    ) : (
                      <span className="text-slate-300">-</span>
                    )}
                  </td>

                  <td className="py-3 px-4">
                    {allItems.length > 0 ? (
                      <span className="flex items-center gap-1 text-slate-700 font-medium">
                        <CheckSquare className="w-3.5 h-3.5 text-slate-400" />
                        <span>
                          {completedCount}/{allItems.length}
                        </span>
                      </span>
                    ) : (
                      <span className="text-slate-300">-</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

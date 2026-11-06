import React, { useState, useEffect } from 'react';
import { Board, ActiveView, AppMode, FilterState, Card } from './types/trello';
import { INITIAL_BOARD, MEMBERS, LABELS, TEMPLATES } from './data/initialData';
import {
  moveCard,
  addCard,
  updateCard,
  deleteCard,
  addList,
  archiveList,
  toggleChecklistItem,
  addChecklistItem,
  deleteChecklistItem,
  addChecklistToCard,
  addCommentToCard,
  filterCards,
} from './utils/trelloLogic';

// Website sections
import { WebsiteHeader } from './components/website/WebsiteHeader';
import { HeroSection } from './components/website/HeroSection';
import { ViewsShowcase } from './components/website/ViewsShowcase';
import { CardsFeature } from './components/website/CardsFeature';
import { AutomationSection } from './components/website/AutomationSection';
import { PowerUpsSection } from './components/website/PowerUpsSection';
import { TemplatesSection } from './components/website/TemplatesSection';
import { PricingSection } from './components/website/PricingSection';
import { WebsiteFooter } from './components/website/WebsiteFooter';

// App Workspace
import { AppHeader } from './components/app/AppHeader';
import { BoardHeader } from './components/app/BoardHeader';
import { TrelloList } from './components/app/TrelloList';
import { CardDetailModal } from './components/app/CardDetailModal';
import { TableView } from './components/app/TableView';
import { CalendarView } from './components/app/CalendarView';
import { FilterDrawer } from './components/app/FilterDrawer';
import { BackgroundPicker } from './components/app/BackgroundPicker';
import { ButlerModal } from './components/app/ButlerModal';
import { CreateModal } from './components/app/CreateModal';
import { Plus } from 'lucide-react';

export default function App() {
  // Support ?autostart=1 or ?app=1 to directly test the board workspace
  const [mode, setMode] = useState<AppMode>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('autostart') === '1' || params.get('app') === '1') {
        return 'app';
      }
    }
    return 'website';
  });

  const [board, setBoard] = useState<Board>(INITIAL_BOARD);
  const [activeView, setActiveView] = useState<ActiveView>('board');
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);

  // Filter state
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterState, setFilterState] = useState<FilterState>({
    search: '',
    selectedLabelIds: [],
    selectedMemberIds: [],
    dueFilter: 'all',
  });

  // Modal states
  const [isBackgroundPickerOpen, setIsBackgroundPickerOpen] = useState(false);
  const [isButlerOpen, setIsButlerOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  // New list composer inline in board
  const [isAddingList, setIsAddingList] = useState(false);
  const [newListTitle, setNewListTitle] = useState('');

  const currentMember = MEMBERS[0]; // Maya Lin

  // Scroll to section smoothly
  const handleNavigateSection = (sectionId: string) => {
    if (mode !== 'website') {
      setMode('website');
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Switch to specific view in app
  const handleOpenAppWithView = (view: ActiveView) => {
    setActiveView(view);
    setMode('app');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Card DnD drop handler
  const handleCardDrop = (
    e: React.DragEvent,
    targetListId: string,
    targetIndex: number
  ) => {
    const cardId = e.dataTransfer.getData('text/plain');
    if (!cardId) return;

    const sourceCard = board.cards[cardId];
    if (!sourceCard) return;

    setBoard((prev) => moveCard(prev, cardId, sourceCard.listId, targetListId, targetIndex));
  };

  // Add Card
  const handleAddCard = (listId: string, title: string) => {
    setBoard((prev) => addCard(prev, listId, title));
  };

  // Update Card
  const handleUpdateCard = (cardId: string, updates: Partial<Card>) => {
    setBoard((prev) => updateCard(prev, cardId, updates));
  };

  // Delete Card
  const handleDeleteCard = (cardId: string) => {
    setBoard((prev) => deleteCard(prev, cardId));
    if (selectedCardId === cardId) setSelectedCardId(null);
  };

  // Add List
  const handleAddList = (title: string) => {
    setBoard((prev) => addList(prev, title));
    setNewListTitle('');
    setIsAddingList(false);
  };

  // Rename List
  const handleRenameList = (listId: string, newTitle: string) => {
    setBoard((prev) => ({
      ...prev,
      lists: prev.lists.map((l) => (l.id === listId ? { ...l, title: newTitle } : l)),
    }));
  };

  // Archive List
  const handleArchiveList = (listId: string) => {
    setBoard((prev) => archiveList(prev, listId));
  };

  // Checklist actions
  const handleToggleChecklist = (checklistId: string, itemId: string) => {
    if (!selectedCardId) return;
    const currentCard = board.cards[selectedCardId];
    if (!currentCard) return;

    const updated = toggleChecklistItem(currentCard, checklistId, itemId);
    setBoard((prev) => updateCard(prev, selectedCardId, updated));
  };

  const handleAddChecklistItem = (checklistId: string, text: string) => {
    if (!selectedCardId) return;
    const currentCard = board.cards[selectedCardId];
    if (!currentCard) return;

    const updated = addChecklistItem(currentCard, checklistId, text);
    setBoard((prev) => updateCard(prev, selectedCardId, updated));
  };

  const handleDeleteChecklistItem = (checklistId: string, itemId: string) => {
    if (!selectedCardId) return;
    const currentCard = board.cards[selectedCardId];
    if (!currentCard) return;

    const updated = deleteChecklistItem(currentCard, checklistId, itemId);
    setBoard((prev) => updateCard(prev, selectedCardId, updated));
  };

  const handleAddChecklist = (title: string) => {
    if (!selectedCardId) return;
    const currentCard = board.cards[selectedCardId];
    if (!currentCard) return;

    const updated = addChecklistToCard(currentCard, title);
    setBoard((prev) => updateCard(prev, selectedCardId, updated));
  };

  const handleDeleteChecklist = (checklistId: string) => {
    if (!selectedCardId) return;
    const currentCard = board.cards[selectedCardId];
    if (!currentCard) return;

    const updated = {
      ...currentCard,
      checklists: currentCard.checklists.filter((c) => c.id !== checklistId),
    };
    setBoard((prev) => updateCard(prev, selectedCardId, updated));
  };

  // Comment action
  const handleAddComment = (text: string) => {
    if (!selectedCardId) return;
    const currentCard = board.cards[selectedCardId];
    if (!currentCard) return;

    const updated = addCommentToCard(currentCard, text, currentMember);
    setBoard((prev) => updateCard(prev, selectedCardId, updated));
  };

  // Move card directly to another list from modal
  const handleMoveCard = (targetListId: string) => {
    if (!selectedCardId) return;
    const currentCard = board.cards[selectedCardId];
    if (!currentCard) return;

    const targetList = board.lists.find((l) => l.id === targetListId);
    if (!targetList) return;

    setBoard((prev) =>
      moveCard(prev, selectedCardId, currentCard.listId, targetListId, targetList.cardIds.length)
    );
  };

  // Butler: Sort all cards in all lists by due date
  const handleRunSortByDueDate = () => {
    setBoard((prev) => {
      const newLists = prev.lists.map((list) => {
        const sortedCardIds = [...list.cardIds].sort((aId, bId) => {
          const cardA = prev.cards[aId];
          const cardB = prev.cards[bId];
          if (!cardA?.dueDate) return 1;
          if (!cardB?.dueDate) return -1;
          return new Date(cardA.dueDate).getTime() - new Date(cardB.dueDate).getTime();
        });
        return { ...list, cardIds: sortedCardIds };
      });
      return { ...prev, lists: newLists };
    });
  };

  // Butler: Move all completed cards to "Done 🎉"
  const handleRunMoveCompletedToDone = () => {
    const doneList = board.lists.find((l) => l.title.includes('Done'));
    if (!doneList) return;

    let updatedBoard = { ...board };
    Object.values(board.cards).forEach((card) => {
      const allItems = card.checklists.flatMap((c) => c.items);
      const isChecklistDone = allItems.length > 0 && allItems.every((i) => i.completed);
      const isDueDone = Boolean(card.dueCompleted);

      if ((isChecklistDone || isDueDone) && card.listId !== doneList.id) {
        updatedBoard = moveCard(
          updatedBoard,
          card.id,
          card.listId,
          doneList.id,
          updatedBoard.lists.find((l) => l.id === doneList.id)?.cardIds.length || 0
        );
      }
    });

    setBoard(updatedBoard);
  };

  // Load a chosen template
  const handleSelectTemplate = (templateId: string) => {
    const tpl = TEMPLATES.find((t) => t.id === templateId);
    if (!tpl) return;

    const newLists = tpl.lists.map((title, idx) => ({
      id: `tpl_list_${idx}_${Date.now()}`,
      title,
      cardIds: idx === 0 ? ['tpl_card_1', 'tpl_card_2'] : idx === 1 ? ['tpl_card_3'] : [],
    }));

    const sampleCards: Record<string, Card> = {
      tpl_card_1: {
        id: 'tpl_card_1',
        title: `Welcome to ${tpl.title}`,
        description: `This board was created from the official ${tpl.title} template. Customize lists, add cards, and invite your team!`,
        listId: newLists[0].id,
        labels: [LABELS[0]],
        members: [MEMBERS[0]],
        checklists: [],
        comments: [],
        attachments: [],
        createdAt: new Date().toISOString(),
      },
      tpl_card_2: {
        id: 'tpl_card_2',
        title: 'Define sprint scope & milestones',
        description: 'Detail acceptance criteria and align with stakeholders.',
        listId: newLists[0].id,
        labels: [LABELS[1]],
        members: [MEMBERS[1]],
        checklists: [],
        comments: [],
        attachments: [],
        createdAt: new Date().toISOString(),
      },
      tpl_card_3: {
        id: 'tpl_card_3',
        title: 'Sprint kickoff meeting & estimation',
        description: 'Review story points with team members.',
        listId: newLists[1].id,
        labels: [LABELS[2]],
        members: [MEMBERS[2]],
        checklists: [],
        comments: [],
        attachments: [],
        createdAt: new Date().toISOString(),
      },
    };

    setBoard({
      id: `board_${Date.now()}`,
      title: tpl.title,
      workspaceName: 'Atlassian Product Core',
      isStarred: true,
      background: {
        type: 'color',
        value: tpl.color,
        textColor: 'white',
      },
      lists: newLists,
      cards: sampleCards,
    });

    setMode('app');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filtered cards list for search/filtering
  const allCardsList = Object.values(board.cards);
  const activeFilteredCards = filterCards(allCardsList, filterState);
  const filteredCardIds = new Set(activeFilteredCards.map((c) => c.id));

  const selectedCard = selectedCardId ? board.cards[selectedCardId] : null;

  return (
    <div className="min-h-screen flex flex-col font-sans antialiased text-slate-900 bg-slate-50 selection:bg-blue-200">
      {/* MODE 1: Official Trello Website */}
      {mode === 'website' ? (
        <div className="flex-1 flex flex-col">
          <WebsiteHeader
            onOpenApp={() => {
              setMode('app');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateSection={handleNavigateSection}
          />

          <main className="flex-1">
            <HeroSection
              onOpenApp={() => {
                setMode('app');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            <ViewsShowcase onOpenAppWithView={handleOpenAppWithView} />

            <CardsFeature />

            <AutomationSection />

            <PowerUpsSection
              onOpenApp={() => {
                setMode('app');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            <TemplatesSection onSelectTemplate={handleSelectTemplate} />

            <PricingSection
              onOpenApp={() => {
                setMode('app');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </main>

          <WebsiteFooter
            onOpenApp={() => {
              setMode('app');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateSection={handleNavigateSection}
          />
        </div>
      ) : (
        /* MODE 2: Full Interactive Trello Board Workspace */
        <div
          className="flex-1 flex flex-col h-screen overflow-hidden transition-all duration-300 relative"
          style={{ background: board.background.value }}
        >
          {/* Top Application Header */}
          <AppHeader
            board={board}
            currentMember={currentMember}
            onSwitchToWebsite={() => {
              setMode('website');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenCardModal={(cardId) => setSelectedCardId(cardId)}
            onCreateCard={() => setIsCreateOpen(true)}
          />

          {/* Board Subheader */}
          <BoardHeader
            board={board}
            activeView={activeView}
            onChangeView={(v) => setActiveView(v)}
            onUpdateTitle={(title) => setBoard((prev) => ({ ...prev, title }))}
            onToggleStar={() => setBoard((prev) => ({ ...prev, isStarred: !prev.isStarred }))}
            onOpenFilter={() => setIsFilterOpen(true)}
            onOpenBackgroundPicker={() => setIsBackgroundPickerOpen(true)}
            onOpenButler={() => setIsButlerOpen(true)}
            filterState={filterState}
          />

          {/* Main Board Surface */}
          {activeView === 'board' && (
            <div className="flex-1 p-4 overflow-x-auto flex items-start gap-4 no-scrollbar">
              {board.lists.map((list) => {
                const listCards = list.cardIds
                  .map((id) => board.cards[id])
                  .filter((c): c is Card => Boolean(c) && filteredCardIds.has(c.id));

                return (
                  <TrelloList
                    key={list.id}
                    list={list}
                    cards={listCards}
                    onAddCard={handleAddCard}
                    onOpenCardModal={(cardId) => setSelectedCardId(cardId)}
                    onArchiveList={handleArchiveList}
                    onRenameList={handleRenameList}
                    onCardDrop={handleCardDrop}
                  />
                );
              })}

              {/* Add another list button/composer */}
              <div className="w-72 shrink-0">
                {isAddingList ? (
                  <div className="bg-[#F1F2F4] p-3 rounded-xl border border-slate-300 shadow-sm space-y-2">
                    <input
                      type="text"
                      value={newListTitle}
                      onChange={(e) => setNewListTitle(e.target.value)}
                      placeholder="Enter list title..."
                      autoFocus
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleAddList(newListTitle);
                        if (e.key === 'Escape') setIsAddingList(false);
                      }}
                      className="w-full px-2.5 py-1.5 bg-white border border-blue-500 rounded text-xs font-semibold text-slate-800 outline-none"
                    />
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleAddList(newListTitle)}
                        className="px-3.5 py-1.5 bg-[#0065FF] hover:bg-[#0747A6] text-white text-xs font-semibold rounded-md shadow-xs cursor-pointer"
                      >
                        Add list
                      </button>
                      <button
                        onClick={() => setIsAddingList(false)}
                        className="px-2 py-1.5 text-xs text-slate-600 hover:text-slate-900"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setIsAddingList(true)}
                    className="w-full py-2.5 px-3 rounded-xl bg-white/20 hover:bg-white/30 text-white font-semibold text-xs flex items-center gap-2 backdrop-blur-xs transition-colors cursor-pointer border border-white/10"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add another list</span>
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Table View */}
          {activeView === 'table' && (
            <TableView
              board={board}
              filteredCards={activeFilteredCards}
              onOpenCardModal={(cardId) => setSelectedCardId(cardId)}
              onAddCard={handleAddCard}
            />
          )}

          {/* Calendar View */}
          {activeView === 'calendar' && (
            <CalendarView
              board={board}
              filteredCards={activeFilteredCards}
              onOpenCardModal={(cardId) => setSelectedCardId(cardId)}
            />
          )}

          {/* Modals */}
          {selectedCard && (
            <CardDetailModal
              card={selectedCard}
              board={board}
              currentMember={currentMember}
              onClose={() => setSelectedCardId(null)}
              onUpdateCard={(updates) => handleUpdateCard(selectedCard.id, updates)}
              onDeleteCard={handleDeleteCard}
              onToggleChecklist={handleToggleChecklist}
              onAddChecklistItem={handleAddChecklistItem}
              onDeleteChecklistItem={handleDeleteChecklistItem}
              onAddChecklist={handleAddChecklist}
              onDeleteChecklist={handleDeleteChecklist}
              onAddComment={handleAddComment}
              onMoveCard={handleMoveCard}
            />
          )}

          <FilterDrawer
            isOpen={isFilterOpen}
            onClose={() => setIsFilterOpen(false)}
            filterState={filterState}
            onUpdateFilter={(updates) =>
              setFilterState((prev) => ({ ...prev, ...updates }))
            }
            onResetFilter={() =>
              setFilterState({
                search: '',
                selectedLabelIds: [],
                selectedMemberIds: [],
                dueFilter: 'all',
              })
            }
            availableLabels={LABELS}
            availableMembers={MEMBERS}
          />

          <BackgroundPicker
            isOpen={isBackgroundPickerOpen}
            onClose={() => setIsBackgroundPickerOpen(false)}
            currentBg={board.background}
            onSelectBackground={(bg) =>
              setBoard((prev) => ({ ...prev, background: bg }))
            }
          />

          <ButlerModal
            isOpen={isButlerOpen}
            onClose={() => setIsButlerOpen(false)}
            board={board}
            onRunSortByDueDate={handleRunSortByDueDate}
            onRunMoveCompletedToDone={handleRunMoveCompletedToDone}
          />

          <CreateModal
            isOpen={isCreateOpen}
            onClose={() => setIsCreateOpen(false)}
            board={board}
            onAddCard={handleAddCard}
            onAddList={handleAddList}
          />
        </div>
      )}
    </div>
  );
}

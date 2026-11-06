import { Board, Card, Checklist, ChecklistItem, Comment, FilterState } from '../types/trello';

export function calculateProgress(card: Card): { total: number; completed: number; percentage: number } {
  const allItems = card.checklists.flatMap((cl) => cl.items);
  if (allItems.length === 0) {
    return { total: 0, completed: 0, percentage: 0 };
  }
  const completed = allItems.filter((i) => i.completed).length;
  const percentage = Math.round((completed / allItems.length) * 100);
  return { total: allItems.length, completed, percentage };
}

export function moveCard(
  board: Board,
  cardId: string,
  sourceListId: string,
  targetListId: string,
  targetIndex: number
): Board {
  const card = board.cards[cardId];
  if (!card) return board;

  const newLists = board.lists.map((list) => {
    if (list.id === sourceListId && sourceListId === targetListId) {
      // Reordering within the same list
      const filtered = list.cardIds.filter((id) => id !== cardId);
      const updatedCardIds = [...filtered];
      const safeIndex = Math.max(0, Math.min(targetIndex, updatedCardIds.length));
      updatedCardIds.splice(safeIndex, 0, cardId);
      return { ...list, cardIds: updatedCardIds };
    }

    if (list.id === sourceListId) {
      // Remove from source list
      return {
        ...list,
        cardIds: list.cardIds.filter((id) => id !== cardId),
      };
    }

    if (list.id === targetListId) {
      // Add to target list
      const updatedCardIds = [...list.cardIds];
      const safeIndex = Math.max(0, Math.min(targetIndex, updatedCardIds.length));
      updatedCardIds.splice(safeIndex, 0, cardId);
      return {
        ...list,
        cardIds: updatedCardIds,
      };
    }

    return list;
  });

  const updatedCard: Card = {
    ...card,
    listId: targetListId,
  };

  return {
    ...board,
    lists: newLists,
    cards: {
      ...board.cards,
      [cardId]: updatedCard,
    },
  };
}

export function addCard(board: Board, listId: string, title: string): Board {
  const cleanTitle = title.trim();
  if (!cleanTitle) return board;

  const newCardId = `c_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const newCard: Card = {
    id: newCardId,
    title: cleanTitle,
    listId,
    labels: [],
    members: [],
    checklists: [],
    comments: [],
    attachments: [],
    createdAt: new Date().toISOString(),
  };

  const updatedLists = board.lists.map((l) =>
    l.id === listId ? { ...l, cardIds: [...l.cardIds, newCardId] } : l
  );

  return {
    ...board,
    lists: updatedLists,
    cards: {
      ...board.cards,
      [newCardId]: newCard,
    },
  };
}

export function updateCard(board: Board, cardId: string, updates: Partial<Card>): Board {
  const currentCard = board.cards[cardId];
  if (!currentCard) return board;

  return {
    ...board,
    cards: {
      ...board.cards,
      [cardId]: {
        ...currentCard,
        ...updates,
      },
    },
  };
}

export function deleteCard(board: Board, cardId: string): Board {
  const card = board.cards[cardId];
  if (!card) return board;

  const newCards = { ...board.cards };
  delete newCards[cardId];

  const newLists = board.lists.map((l) => ({
    ...l,
    cardIds: l.cardIds.filter((id) => id !== cardId),
  }));

  return {
    ...board,
    lists: newLists,
    cards: newCards,
  };
}

export function addList(board: Board, title: string): Board {
  const cleanTitle = title.trim();
  if (!cleanTitle) return board;

  const newListId = `list_${Date.now()}`;
  return {
    ...board,
    lists: [
      ...board.lists,
      {
        id: newListId,
        title: cleanTitle,
        cardIds: [],
      },
    ],
  };
}

export function archiveList(board: Board, listId: string): Board {
  const listToRemove = board.lists.find((l) => l.id === listId);
  if (!listToRemove) return board;

  const newCards = { ...board.cards };
  listToRemove.cardIds.forEach((id) => {
    delete newCards[id];
  });

  return {
    ...board,
    lists: board.lists.filter((l) => l.id !== listId),
    cards: newCards,
  };
}

export function toggleChecklistItem(
  card: Card,
  checklistId: string,
  itemId: string
): Card {
  const updatedChecklists = card.checklists.map((cl) => {
    if (cl.id !== checklistId) return cl;
    return {
      ...cl,
      items: cl.items.map((item) =>
        item.id === itemId ? { ...item, completed: !item.completed } : item
      ),
    };
  });

  return {
    ...card,
    checklists: updatedChecklists,
  };
}

export function addChecklistItem(
  card: Card,
  checklistId: string,
  itemText: string
): Card {
  const cleanText = itemText.trim();
  if (!cleanText) return card;

  const newItem: ChecklistItem = {
    id: `item_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    text: cleanText,
    completed: false,
  };

  const updatedChecklists = card.checklists.map((cl) => {
    if (cl.id !== checklistId) return cl;
    return {
      ...cl,
      items: [...cl.items, newItem],
    };
  });

  return {
    ...card,
    checklists: updatedChecklists,
  };
}

export function deleteChecklistItem(
  card: Card,
  checklistId: string,
  itemId: string
): Card {
  const updatedChecklists = card.checklists.map((cl) => {
    if (cl.id !== checklistId) return cl;
    return {
      ...cl,
      items: cl.items.filter((item) => item.id !== itemId),
    };
  });

  return {
    ...card,
    checklists: updatedChecklists,
  };
}

export function addChecklistToCard(card: Card, title: string): Card {
  const cleanTitle = title.trim() || 'Checklist';
  const newChecklist: Checklist = {
    id: `cl_${Date.now()}`,
    title: cleanTitle,
    items: [],
  };

  return {
    ...card,
    checklists: [...card.checklists, newChecklist],
  };
}

export function addCommentToCard(card: Card, text: string, author: Card['members'][0]): Card {
  const cleanText = text.trim();
  if (!cleanText) return card;

  const newComment: Comment = {
    id: `comm_${Date.now()}`,
    author,
    text: cleanText,
    createdAt: new Date().toISOString(),
  };

  return {
    ...card,
    comments: [newComment, ...card.comments],
  };
}

export function filterCards(
  cards: Card[],
  filter: FilterState
): Card[] {
  return cards.filter((card) => {
    if (filter.search.trim()) {
      const q = filter.search.toLowerCase().trim();
      const matchTitle = card.title.toLowerCase().includes(q);
      const matchDesc = card.description?.toLowerCase().includes(q) ?? false;
      const matchLabels = card.labels.some((l) => l.text.toLowerCase().includes(q));
      if (!matchTitle && !matchDesc && !matchLabels) return false;
    }

    if (filter.selectedLabelIds.length > 0) {
      const hasSelectedLabel = card.labels.some((l) =>
        filter.selectedLabelIds.includes(l.id)
      );
      if (!hasSelectedLabel) return false;
    }

    if (filter.selectedMemberIds.length > 0) {
      const hasSelectedMember = card.members.some((m) =>
        filter.selectedMemberIds.includes(m.id)
      );
      if (!hasSelectedMember) return false;
    }

    if (filter.dueFilter === 'due-soon') {
      if (!card.dueDate || card.dueCompleted) return false;
      const dueDate = new Date(card.dueDate).getTime();
      const now = Date.now();
      const diffDays = (dueDate - now) / (1000 * 60 * 60 * 24);
      if (diffDays < 0 || diffDays > 3) return false;
    } else if (filter.dueFilter === 'overdue') {
      if (!card.dueDate || card.dueCompleted) return false;
      const dueDate = new Date(card.dueDate).getTime();
      if (dueDate >= Date.now()) return false;
    } else if (filter.dueFilter === 'completed') {
      if (!card.dueCompleted) return false;
    }

    return true;
  });
}

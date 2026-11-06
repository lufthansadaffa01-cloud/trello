import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateProgress,
  moveCard,
  addCard,
  updateCard,
  deleteCard,
  addList,
  archiveList,
  toggleChecklistItem,
  addChecklistItem,
  deleteChecklistItem,
  filterCards,
} from './trelloLogic';
import { Board, Card } from '../types/trello';

const createMockBoard = (): Board => ({
  id: 'board-1',
  title: 'Test Board',
  workspaceName: 'Engineering Workspace',
  isStarred: false,
  background: { type: 'color', value: '#0079BF', textColor: 'white' },
  lists: [
    { id: 'list-1', title: 'To Do', cardIds: ['card-1', 'card-2'] },
    { id: 'list-2', title: 'Done', cardIds: ['card-3'] },
  ],
  cards: {
    'card-1': {
      id: 'card-1',
      title: 'Design landing page hero',
      listId: 'list-1',
      labels: [{ id: 'l-1', text: 'Design', color: 'purple' }],
      members: [{ id: 'm-1', name: 'Alice', avatar: '', initials: 'AL', color: '#0052CC' }],
      checklists: [
        {
          id: 'cl-1',
          title: 'Tasks',
          items: [
            { id: 'i-1', text: 'Sketch mockups', completed: true },
            { id: 'i-2', text: 'Gather feedback', completed: false },
          ],
        },
      ],
      comments: [],
      attachments: [],
      createdAt: new Date().toISOString(),
    },
    'card-2': {
      id: 'card-2',
      title: 'Setup Vite and Tailwind',
      listId: 'list-1',
      labels: [{ id: 'l-2', text: 'Dev', color: 'blue' }],
      members: [],
      checklists: [],
      comments: [],
      attachments: [],
      createdAt: new Date().toISOString(),
    },
    'card-3': {
      id: 'card-3',
      title: 'Initialize repository',
      listId: 'list-2',
      labels: [],
      members: [],
      checklists: [],
      comments: [],
      attachments: [],
      createdAt: new Date().toISOString(),
    },
  },
});

test('calculateProgress calculates accurate percentage for checklists', () => {
  const board = createMockBoard();
  const card = board.cards['card-1'];
  const progress = calculateProgress(card);

  assert.equal(progress.total, 2);
  assert.equal(progress.completed, 1);
  assert.equal(progress.percentage, 50);

  const cardNoChecklist = board.cards['card-2'];
  const zeroProgress = calculateProgress(cardNoChecklist);
  assert.equal(zeroProgress.percentage, 0);
  assert.equal(zeroProgress.total, 0);
});

test('moveCard moves card from one list to another at specific index', () => {
  const board = createMockBoard();
  const updated = moveCard(board, 'card-1', 'list-1', 'list-2', 0);

  // Check card-1 is now in list-2 at index 0
  const list2 = updated.lists.find((l) => l.id === 'list-2')!;
  assert.equal(list2.cardIds[0], 'card-1');
  assert.equal(list2.cardIds[1], 'card-3');
  assert.equal(list2.cardIds.length, 2);

  // Check card-1 is removed from list-1
  const list1 = updated.lists.find((l) => l.id === 'list-1')!;
  assert.deepEqual(list1.cardIds, ['card-2']);

  // Check card entity listId was updated
  assert.equal(updated.cards['card-1'].listId, 'list-2');
});

test('moveCard reorders within the same list', () => {
  const board = createMockBoard();
  const updated = moveCard(board, 'card-1', 'list-1', 'list-1', 1);

  const list1 = updated.lists.find((l) => l.id === 'list-1')!;
  assert.deepEqual(list1.cardIds, ['card-2', 'card-1']);
});

test('addCard creates a new card and appends to target list', () => {
  const board = createMockBoard();
  const updated = addCard(board, 'list-1', 'Write documentation');

  const list1 = updated.lists.find((l) => l.id === 'list-1')!;
  assert.equal(list1.cardIds.length, 3);
  const newCardId = list1.cardIds[2];
  assert.ok(updated.cards[newCardId]);
  assert.equal(updated.cards[newCardId].title, 'Write documentation');
});

test('updateCard updates card attributes', () => {
  const board = createMockBoard();
  const updated = updateCard(board, 'card-1', {
    description: 'Detailed hero specs',
    dueCompleted: true,
  });

  assert.equal(updated.cards['card-1'].description, 'Detailed hero specs');
  assert.equal(updated.cards['card-1'].dueCompleted, true);
});

test('deleteCard removes card from board and list', () => {
  const board = createMockBoard();
  const updated = deleteCard(board, 'card-2');

  assert.equal(updated.cards['card-2'], undefined);
  const list1 = updated.lists.find((l) => l.id === 'list-1')!;
  assert.deepEqual(list1.cardIds, ['card-1']);
});

test('toggleChecklistItem flips completion state', () => {
  const board = createMockBoard();
  const card = board.cards['card-1'];
  const updatedCard = toggleChecklistItem(card, 'cl-1', 'i-1');
  assert.equal(updatedCard.checklists[0].items[0].completed, false);

  const toggledAgain = toggleChecklistItem(updatedCard, 'cl-1', 'i-1');
  assert.equal(toggledAgain.checklists[0].items[0].completed, true);
});

test('filterCards filters by keyword and label', () => {
  const board = createMockBoard();
  const allCards = Object.values(board.cards);

  const filteredBySearch = filterCards(allCards, {
    search: 'Vite',
    selectedLabelIds: [],
    selectedMemberIds: [],
    dueFilter: 'all',
  });
  assert.equal(filteredBySearch.length, 1);
  assert.equal(filteredBySearch[0].id, 'card-2');

  const filteredByLabel = filterCards(allCards, {
    search: '',
    selectedLabelIds: ['l-1'],
    selectedMemberIds: [],
    dueFilter: 'all',
  });
  assert.equal(filteredByLabel.length, 1);
  assert.equal(filteredByLabel[0].id, 'card-1');
});

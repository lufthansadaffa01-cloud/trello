export interface Member {
  id: string;
  name: string;
  avatar: string;
  initials: string;
  color: string;
}

export interface Label {
  id: string;
  text: string;
  color: 'green' | 'yellow' | 'orange' | 'red' | 'purple' | 'blue' | 'sky' | 'lime' | 'pink' | 'black';
}

export interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
}

export interface Checklist {
  id: string;
  title: string;
  items: ChecklistItem[];
}

export interface Comment {
  id: string;
  author: Member;
  text: string;
  createdAt: string;
}

export interface Attachment {
  id: string;
  name: string;
  url: string;
  type: 'image' | 'link' | 'file';
  addedAt: string;
}

export interface Card {
  id: string;
  title: string;
  description?: string;
  listId: string;
  labels: Label[];
  members: Member[];
  dueDate?: string;
  dueCompleted?: boolean;
  checklists: Checklist[];
  comments: Comment[];
  attachments: Attachment[];
  coverColor?: string;
  coverImage?: string;
  createdAt: string;
}

export interface List {
  id: string;
  title: string;
  cardIds: string[];
}

export interface Board {
  id: string;
  title: string;
  workspaceName: string;
  isStarred: boolean;
  background: {
    type: 'color' | 'gradient';
    value: string;
    textColor: 'white' | 'dark';
  };
  lists: List[];
  cards: Record<string, Card>;
}

export type ActiveView = 'board' | 'table' | 'calendar';
export type AppMode = 'website' | 'app';

export interface FilterState {
  search: string;
  selectedLabelIds: string[];
  selectedMemberIds: string[];
  dueFilter: 'all' | 'due-soon' | 'overdue' | 'completed';
}

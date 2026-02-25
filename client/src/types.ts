export type QaItem = {
  id: string;
  question: string;
  answer: string;
  createdAt?: string;
};

export type QuestionsContextReducerActions =
  | { type: "setItems"; data: QaItem[] }
  | { type: "addItem"; data: QaItem };

export type QuestionsContextType = {
  items: QaItem[];
  loading: boolean;
  fetchQuestions: () => Promise<void>;
  addItem: (item: QaItem) => void;
  setItems: (items: QaItem[]) => void;
};

export type ChildrenElementProp = {
  children: React.ReactElement;
};
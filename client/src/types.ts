export type QaItem = {
  id: string;
  question: string;
  answer: string;
  createdAt?: string;
};

export type QuestionsContextReducerActions =
  | { type: "setItems"; data: QaItem[] }
  | { type: "addItem"; data: QaItem };

export type AskQuestionResult = {
  error?: string;
};

export type QuestionsContextType = {
  items: QaItem[];
  loading: boolean;
  fetchQuestions: () => Promise<void>;
  askQuestion: (question: string) => Promise<AskQuestionResult>;
  dispatch: React.Dispatch<QuestionsContextReducerActions>;
};

export type ChildrenElementProp = {
  children: React.ReactElement;
};
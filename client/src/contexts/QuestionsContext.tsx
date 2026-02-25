// client/src/contexts/QuestionsContext.tsx
import { createContext, useEffect, useReducer, useState } from "react";
import type {
  QaItem,
  AskQuestionResult,
  ChildrenElementProp,
  QuestionsContextReducerActions,
  QuestionsContextType,
} from "../types";

const reducer = (state: QaItem[], action: QuestionsContextReducerActions): QaItem[] => {
  switch (action.type) {
    case "setItems":
      return action.data;
    case "addItem":
      return [action.data, ...state];
    default:
      console.error("Unknown reducer action");
      return state;
  }
};

const QuestionsContext = createContext<QuestionsContextType | undefined>(undefined);

const QuestionsProvider = ({ children }: ChildrenElementProp) => {
  const [items, dispatch] = useReducer(reducer, []);
  const [loading, setLoading] = useState(true);

  const fetchQuestions = async (): Promise<void> => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5501/api/questions");
      const json = await res.json();

      if (!res.ok) {
        console.error("Failed to fetch questions:", json?.error);
        dispatch({ type: "setItems", data: [] });
        return;
      }

      dispatch({ type: "setItems", data: json?.data || [] });
    } catch (err) {
      console.error("Failed to fetch questions:", err);
      dispatch({ type: "setItems", data: [] });
    } finally {
      setLoading(false);
    }
  };

  const askQuestion = async (question: string): Promise<AskQuestionResult> => {
    try {
      const res = await fetch("http://localhost:5501/api/answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });

      const data = await res.json();

      if (!res.ok || !data?.data?.answer) {
        return { error: data?.error || "Failed to get answer." };
      }

      await fetchQuestions();
      return {};
    } catch (error) {
      console.error("Error asking question:", error);
      return { error: "Something went wrong. Please try again." };
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <QuestionsContext.Provider
      value={{
        items,
        loading,
        fetchQuestions,
        askQuestion,
        dispatch,
      }}
    >
      {children}
    </QuestionsContext.Provider>
  );
};

export { QuestionsProvider };
export default QuestionsContext;
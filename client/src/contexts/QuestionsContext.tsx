import { createContext, useEffect, useReducer, useState } from "react";
import type {
  QaItem,
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

  const setItems = (data: QaItem[]) => dispatch({ type: "setItems", data });
  const addItem = (item: QaItem) => dispatch({ type: "addItem", data: item });

  const fetchQuestions = async (): Promise<void> => {
    setLoading(true);

    try {
      dispatch({ type: "setItems", data: [] });
    } catch (err) {
      console.error("Failed to fetch questions:", err);
    } finally {
      setLoading(false);
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
        addItem,
        setItems,
      }}
    >
      {children}
    </QuestionsContext.Provider>
  );
};

export { QuestionsProvider };
export default QuestionsContext;
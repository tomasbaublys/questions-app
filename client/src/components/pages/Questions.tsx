import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import QuestionsContext from "../../contexts/QuestionsContext";
import type { QuestionsContextType } from "../../types";
import QuestionForm from "../UI/molecules/QuestionForm";
import ThemeToggle from "../UI/molecules/ThemeToggle";
import CurrentQuestion from "../UI/organisms/CurrentQuestion";
import QuestionsHistory from "../UI/organisms/QuestionsHistory";

const Page = styled.div`
  min-height: 100vh;
  background: var(--bg);
  display: flex;
  justify-content: center;
  padding: 20px 16px;
  font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif;
  color: var(--text);
`;

const Card = styled.div`
  width: 100%;
  max-width: 520px;
  background: var(--card);
  border-radius: 14px;
  padding: 20px 30px;
  box-shadow: var(--shadow);
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 10px;
  margin: 0 0 14px;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 28px;
  line-height: 1.05;
  font-weight: 800;
  color: var(--title);
`;

const Message = styled.div`
  padding: 12px 2px;
  color: var(--title);
  font-size: 12.5px;
  line-height: 1.55;
`;

const Questions = () => {
  const { items, loading, askQuestion } = useContext(QuestionsContext) as QuestionsContextType;
  const [question, setQuestion] = useState("");
  const [openId, setOpenId] = useState<string>("");

  const [isDark, setIsDark] = useState(() => localStorage.getItem("theme") === "dark");

  useEffect(() => {
    document.documentElement.dataset.theme = isDark ? "dark" : "";
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  const onSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    await askQuestion(question);
    setQuestion("");
    setOpenId("");
  };

  return (
    <Page>
      <Card>
        <HeaderRow>
          <Title>Ask Your Question</Title>
          <ThemeToggle isDark={isDark} onToggle={() => setIsDark(!isDark)} />
        </HeaderRow>

        <QuestionForm value={question} onChange={setQuestion} onSubmit={onSubmit} />

        {loading ? (
          <Message>Loading...</Message>
        ) : items.length === 0 ? (
          <Message>No questions yet</Message>
        ) : (
          <>
            <CurrentQuestion item={items[0]} />
            <QuestionsHistory items={items} openId={openId} setOpenId={setOpenId} />
          </>
        )}
      </Card>
    </Page>
  );
};

export default Questions;
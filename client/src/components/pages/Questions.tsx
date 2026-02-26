import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import QuestionsContext from "../../contexts/QuestionsContext";
import type { QuestionsContextType } from "../../types";

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

const ThemeToggle = styled.button`
  border: 1px solid var(--border);
  background: transparent;
  color: var(--muted);
  border-radius: 999px;
  width: 34px;
  height: 34px;
  display: grid;
  place-items: center;
  cursor: pointer;
  line-height: 1;
  padding: 0;

  &:hover {
    opacity: 0.9;
  }
`;

const SearchRow = styled.form`
  position: relative;
  margin-bottom: 14px;
`;

const SearchInput = styled.input`
  width: 100%;
  height: 40px;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: var(--input-bg);
  padding: 0 44px 0 14px;
  font-size: 12.5px;
  outline: none;
  color: var(--title);

  &::placeholder {
    color: #9aa2af;
  }
`;

const SearchIconWrap = styled.button`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  display: grid;
  place-items: center;
  width: 28px;
  height: 28px;
  color: #b7bdc7;
  border: 0;
  background: transparent;
  cursor: pointer;
  padding: 0;

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

const Hero = styled.div`
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 14px 12px;
  margin-bottom: 16px;
`;

const HeroLabel = styled.div`
  font-size: 12px;
  color: var(--muted);
  margin-bottom: 8px;
`;

const HistoryTitle = styled.h2`
  margin: 10px 0 8px;
  font-size: 14px;
  line-height: 1.2;
  font-weight: 700;
  color: var(--title);
`;

const Item = styled.div`
  padding: 12px 2px;
  border-bottom: 1px solid var(--border);
`;

const ItemNoBorder = styled(Item)`
  border-bottom: 0;
`;

const ItemTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`;

const QuestionTitle = styled.div`
  font-weight: 400;
  color: var(--title);
  font-size: 12.5px;
  line-height: 1.55;
`;

const QuestionTitleMuted = styled(QuestionTitle)`
  color: var(--muted);
  font-size: 12px;
  opacity: 0.8;
`;

const ToggleButton = styled.button`
  border: 0;
  background: transparent;
  color: #a1a8b4;
  cursor: pointer;
  line-height: 1;
  padding: 6px 8px;
  display: grid;
  place-items: center;
`;

const AnswerBox = styled.div`
  margin-top: 10px;
  margin-left: 16px;
  background: var(--answer-bg);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 10px 10px;
`;

const AnswerBoxHero = styled(AnswerBox)`
  padding: 12px 12px;
`;

const AnswerText = styled.p`
  margin: 0;
  color: var(--muted);
  font-size: 12px;
  line-height: 1.5;
  font-weight: 400;
`;

const AnswerTextHero = styled(AnswerText)`
  font-size: 12.5px;
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

  const onSubmit = async (e: React.FormEvent) => {
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
          <ThemeToggle
            type="button"
            aria-label="Toggle theme"
            onClick={() => setIsDark((v) => !v)}
          >
            {isDark ? <LightModeIcon fontSize="small" /> : <DarkModeIcon fontSize="small" />}
          </ThemeToggle>
        </HeaderRow>

        <SearchRow onSubmit={onSubmit}>
          <SearchInput
            placeholder="Ask question here"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            name="question"
          />
          <SearchIconWrap type="submit" aria-label="Submit question" disabled={!question.trim()}>
            <SearchIcon fontSize="small" />
          </SearchIconWrap>
        </SearchRow>

        {loading ? (
          <ItemNoBorder>
            <ItemTop>
              <QuestionTitle>Loading...</QuestionTitle>
            </ItemTop>
          </ItemNoBorder>
        ) : items.length === 0 ? (
          <ItemNoBorder>
            <ItemTop>
              <QuestionTitle>No questions yet</QuestionTitle>
            </ItemTop>
          </ItemNoBorder>
        ) : (
          <>
            <Hero>
              <HeroLabel>Current</HeroLabel>

              <ItemNoBorder>
                <ItemTop>
                  <QuestionTitle>{items[0].question}</QuestionTitle>
                </ItemTop>

                <AnswerBoxHero>
                  <AnswerTextHero>{items[0].answer}</AnswerTextHero>
                </AnswerBoxHero>
              </ItemNoBorder>
            </Hero>

            {items.length > 1 ? <HistoryTitle>Last Questions</HistoryTitle> : null}

            {items.slice(1).map((it, idx) => {
              const isOpen = openId === it.id;
              const isLast = idx === items.slice(1).length - 1;

              const Wrapper = isLast ? ItemNoBorder : Item;

              return (
                <Wrapper key={it.id}>
                  <ItemTop>
                    <QuestionTitleMuted>{it.question}</QuestionTitleMuted>

                    <ToggleButton
                      type="button"
                      aria-label="Expand"
                      onClick={() => setOpenId((prev) => (prev === it.id ? "" : it.id))}
                    >
                      <ExpandMoreIcon style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }} />
                    </ToggleButton>
                  </ItemTop>

                  {isOpen ? (
                    <AnswerBox>
                      <AnswerText>{it.answer}</AnswerText>
                    </AnswerBox>
                  ) : null}
                </Wrapper>
              );
            })}
          </>
        )}
      </Card>
    </Page>
  );
};

export default Questions;
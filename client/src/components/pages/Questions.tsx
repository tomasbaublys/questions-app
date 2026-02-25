import { useContext, useState } from "react";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import QuestionsContext from "../../contexts/QuestionsContext";
import type { QuestionsContextType } from "../../types";

const Page = styled.div`
  min-height: 100vh;
  background: #f3f4f7;
  display: flex;
  justify-content: center;
  padding: 16px 12px;
  font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif;
  color: #2b2f36;
`;

const Card = styled.div`
  width: 100%;
  max-width: 480px;
  background: #ffffff;
  border-radius: 14px;
  padding: 18px 16px 14px;
  box-shadow: 0 10px 26px rgba(16, 24, 40, 0.08);
`;

const Title = styled.h1`
  margin: 0 0 14px;
  font-size: 28px;
  line-height: 1.05;
  font-weight: 800;
  color: #3f4b63;
`;

const SearchRow = styled.form`
  position: relative;
  margin-bottom: 14px;
`;

const SearchInput = styled.input`
  width: 100%;
  height: 40px;
  border-radius: 999px;
  border: 1px solid #eef0f4;
  background: #f6f3ee;
  padding: 0 44px 0 14px;
  font-size: 12.5px;
  outline: none;
  color: #3f4b63;

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
  border: 1px solid #eef0f4;
  border-radius: 14px;
  padding: 14px 12px;
  margin-bottom: 16px;
`;

const HeroLabel = styled.div`
  font-size: 12px;
  color: #98a2b3;
  margin-bottom: 8px;
`;

const HistoryTitle = styled.h2`
  margin: 10px 0 8px;
  font-size: 18px;
  line-height: 1.2;
  font-weight: 700;
  color: #3f4b63;
`;

const Item = styled.div`
  padding: 12px 2px;
  border-bottom: 1px solid #eef0f4;
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
  color: #3f4b63;
  font-size: 12.5px;
  line-height: 1.55;
`;

const QuestionTitleMuted = styled(QuestionTitle)`
  color: #667085;
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
  background: #f6f3ee;
  border: 1px solid #eef0f4;
  border-radius: 12px;
  padding: 10px 10px;
`;

const AnswerBoxHero = styled(AnswerBox)`
  padding: 12px 12px;
`;

const AnswerText = styled.p`
  margin: 0;
  color: #6f7785;
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

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await askQuestion(question);
    setQuestion("");
    setOpenId("");
  };

  return (
    <Page>
      <Card>
        <Title>Ask Your Question</Title>

        <SearchRow onSubmit={onSubmit}>
          <SearchInput
            placeholder="Ask question here"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
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
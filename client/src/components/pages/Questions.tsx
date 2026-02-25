// client/src/components/pages/Questions.tsx
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

  @media (max-width: 420px) {
    font-size: 24px;
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

const Item = styled.div`
  padding: 12px 2px;
  border-bottom: 1px solid #eef0f4;
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
`;

const ToggleButton = styled.button<{ open?: boolean }>`
  border: 0;
  background: transparent;
  color: #a1a8b4;
  cursor: pointer;
  line-height: 1;
  padding: 6px 8px;
  display: grid;
  place-items: center;

  svg {
    transition: transform 0.15s ease;
    transform: rotate(${(p) => (p.open ? "180deg" : "0deg")});
  }
`;

const AnswerBox = styled.div`
  margin-top: 10px;
  background: #f6f3ee;
  border: 1px solid #eef0f4;
  border-radius: 12px;
  padding: 10px 10px;
`;

const AnswerText = styled.p`
  margin: 0;
  color: #6f7785;
  font-size: 12px;
  line-height: 1.45;
  font-weight: 400;
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
          <Item>
            <ItemTop>
              <QuestionTitle>Loading...</QuestionTitle>
            </ItemTop>
          </Item>
        ) : items.length === 0 ? (
          <Item>
            <ItemTop>
              <QuestionTitle>No questions yet</QuestionTitle>
            </ItemTop>
          </Item>
        ) : (
          items.map((it, index) => (
            <Item key={it.id}>
              <ItemTop>
                <QuestionTitle>{it.question}</QuestionTitle>

                {index > 0 ? (
                  <ToggleButton
                    type="button"
                    aria-label="Expand"
                    open={openId === it.id}
                    onClick={() => setOpenId((prev) => (prev === it.id ? "" : it.id))}
                  >
                    <ExpandMoreIcon />
                  </ToggleButton>
                ) : null}
              </ItemTop>

              {index === 0 || openId === it.id ? (
                <AnswerBox>
                  <AnswerText>{it.answer}</AnswerText>
                </AnswerBox>
              ) : null}
            </Item>
          ))
        )}
      </Card>
    </Page>
  );
};

export default Questions;
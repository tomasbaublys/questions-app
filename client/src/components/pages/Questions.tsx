// client/src/components/pages/Questions.tsx
import { useContext } from "react";
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
  font-size: 32px;
  line-height: 1.05;
  font-weight: 800;
  color: #3f4b63;

  @media (max-width: 420px) {
    font-size: 28px;
  }
`;

const SearchRow = styled.div`
  position: relative;
  margin-bottom: 14px;
`;

const SearchInput = styled.input`
  width: 100%;
  height: 42px;
  border-radius: 999px;
  border: 1px solid #eef0f4;
  background: #f6f3ee;
  padding: 0 44px 0 14px;
  font-size: 13px;
  outline: none;
  color: #3f4b63;

  &::placeholder {
    color: #9aa2af;
  }
`;

const SearchIconWrap = styled.div`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  display: grid;
  place-items: center;
  width: 28px;
  height: 28px;
  color: #b7bdc7;
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
  font-weight: 700;
  color: #3f4b63;
  font-size: 13px;
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
  background: #f6f3ee;
  border: 1px solid #eef0f4;
  border-radius: 12px;
  padding: 10px 10px;
`;

const AnswerText = styled.p`
  margin: 0;
  color: #6f7785;
  font-size: 12.5px;
  line-height: 1.45;
`;

const Questions = () => {
  const { items, loading } = useContext(QuestionsContext) as QuestionsContextType;

  return (
    <Page>
      <Card>
        <Title>Ask Your Question</Title>

        <SearchRow>
          <SearchInput placeholder="Ask question here" />
          <SearchIconWrap aria-hidden>
            <SearchIcon fontSize="small" />
          </SearchIconWrap>
        </SearchRow>

        {loading ? (
          <Item>
            <ItemTop>
              <QuestionTitle>Loading...</QuestionTitle>
              <ToggleButton type="button" aria-label="Expand">
                <ExpandMoreIcon />
              </ToggleButton>
            </ItemTop>
          </Item>
        ) : items.length === 0 ? (
          <Item>
            <ItemTop>
              <QuestionTitle>No questions yet</QuestionTitle>
              <ToggleButton type="button" aria-label="Expand">
                <ExpandMoreIcon />
              </ToggleButton>
            </ItemTop>
          </Item>
        ) : (
          items.map((it) => (
            <Item key={it.id}>
              <ItemTop>
                <QuestionTitle>{it.question}</QuestionTitle>
                <ToggleButton type="button" aria-label="Expand">
                  <ExpandMoreIcon />
                </ToggleButton>
              </ItemTop>

              <AnswerBox>
                <AnswerText>{it.answer}</AnswerText>
              </AnswerBox>
            </Item>
          ))
        )}
      </Card>
    </Page>
  );
};

export default Questions;
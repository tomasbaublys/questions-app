import styled from "styled-components";
import type { QaItem } from "../../../types";

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

const AnswerBox = styled.div`
  margin-top: 10px;
  margin-left: 16px;
  background: var(--answer-bg);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 12px 12px;
`;

const AnswerText = styled.p`
  margin: 0;
  color: var(--muted);
  font-size: 12.5px;
  line-height: 1.5;
  font-weight: 400;
`;

const CurrentQuestion = ({ item }: { item: QaItem }) => {
  return (
    <Hero>
      <HeroLabel>Current</HeroLabel>

      <ItemTop>
        <QuestionTitle>{item.question}</QuestionTitle>
      </ItemTop>

      <AnswerBox>
        <AnswerText>{item.answer}</AnswerText>
      </AnswerBox>
    </Hero>
  );
};

export default CurrentQuestion;
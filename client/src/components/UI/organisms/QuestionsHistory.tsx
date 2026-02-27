import styled from "styled-components";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import type { QaItem } from "../../../types";

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
  align-items: flex-start;
  justify-content: space-between;
  gap: 10px;
`;

const QuestionTitle = styled.div`
  font-weight: 400;
  color: var(--title);
  font-size: 12.5px;
  line-height: 1.55;

  overflow-wrap: anywhere;
  word-break: break-word;
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

const ToggleIcon = styled(ExpandMoreIcon)`
  transition: transform 0.15s ease;
`;

const ToggleIconOpen = styled(ToggleIcon)`
  transform: rotate(180deg);
`;

const AnswerBox = styled.div`
  margin-top: 10px;
  margin-left: 16px;
  background: var(--answer-bg);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 10px 10px;
`;

const AnswerText = styled.p`
  margin: 0;
  color: var(--muted);
  font-size: 12px;
  line-height: 1.5;
  font-weight: 400;

  overflow-wrap: anywhere;
  word-break: break-word;
`;

const QuestionsHistory = ({
  items,
  openId,
  setOpenId,
}: {
  items: QaItem[];
  openId: string;
  setOpenId: React.Dispatch<React.SetStateAction<string>>;
}) => {
  if (items.length <= 1) return null;

  const history = items.slice(1);

  return (
    <>
      <HistoryTitle>Last Questions</HistoryTitle>

      {history.map((it, idx) => {
        const isOpen = openId === it.id;
        const isLast = idx === history.length - 1;
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
                {isOpen ? <ToggleIconOpen /> : <ToggleIcon />}
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
  );
};

export default QuestionsHistory;
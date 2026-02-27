import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";

const Form = styled.form`
  position: relative;
  margin-bottom: 14px;
`;

const Input = styled.input`
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

const SubmitButton = styled.button`
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

type Props = {
  value: string;
  onChange: (next: string) => void;
  onSubmit: (e: React.SyntheticEvent<HTMLFormElement>) => void;
};

const QuestionForm = ({ value, onChange, onSubmit }: Props) => {
  return (
    <Form onSubmit={onSubmit}>
      <Input
        placeholder="Ask question here"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        name="question"
        maxLength={500}
      />
      <SubmitButton type="submit" aria-label="Submit question" disabled={!value.trim()}>
        <SearchIcon fontSize="small" />
      </SubmitButton>
    </Form>
  );
};

export default QuestionForm;
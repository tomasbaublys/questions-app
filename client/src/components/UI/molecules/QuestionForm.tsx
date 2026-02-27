import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";

const Form = styled.form`
  position: relative;
  margin-bottom: 6px;
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

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

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

const HelperText = styled.div`
  margin-left: 14px;
  margin-bottom: 12px;
  font-size: 12px;
  line-height: 1.2;
  color: var(--muted);
`;

const HelperTextError = styled(HelperText)`
  color: #d92d20;
`;

type Props = {
  value: string;
  onChange: (next: string) => void;
  onSubmit: (e: React.SyntheticEvent<HTMLFormElement>) => void;
};

const QuestionForm = ({ value, onChange, onSubmit }: Props) => {
  const trimmedLen = value.trim().length;
  const tooShort = trimmedLen > 0 && trimmedLen < 3;
  const tooLong = value.length > 500;
  const disabled = trimmedLen === 0 || tooShort || tooLong;

  return (
    <>
      <Form onSubmit={onSubmit}>
        <Input
          placeholder="Ask question here"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          name="question"
        />
        <SubmitButton type="submit" aria-label="Submit question" disabled={disabled}>
          <SearchIcon fontSize="small" />
        </SubmitButton>
      </Form>

      {tooLong ? (
        <HelperTextError>Question is too long (max 500 characters).</HelperTextError>
      ) : tooShort ? (
        <HelperTextError>Question is too short (min 3 characters).</HelperTextError>
      ) : value ? (
        <HelperText>{value.length}/500</HelperText>
      ) : null}
    </>
  );
};

export default QuestionForm;
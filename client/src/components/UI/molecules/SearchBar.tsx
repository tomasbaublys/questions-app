import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";

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

type Props = {
  value: string;
  onChange: (next: string) => void;
  onSubmit: (e: React.SyntheticEvent<HTMLFormElement>) => void;
};

const SearchBar = ({ value, onChange, onSubmit }: Props) => {
  return (
    <SearchRow onSubmit={onSubmit}>
      <SearchInput
        placeholder="Ask question here"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        name="question"
      />
      <SearchIconWrap type="submit" aria-label="Submit question" disabled={!value.trim()}>
        <SearchIcon fontSize="small" />
      </SearchIconWrap>
    </SearchRow>
  );
};

export default SearchBar;
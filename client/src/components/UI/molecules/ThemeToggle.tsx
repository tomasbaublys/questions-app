import styled from "styled-components";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

const Button = styled.button`
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

const ThemeToggle = ({
  isDark,
  onToggle,
}: {
  isDark: boolean;
  onToggle: () => void;
}) => {
  return (
    <Button type="button" aria-label="Toggle theme" onClick={onToggle}>
      {isDark ? <LightModeIcon fontSize="small" /> : <DarkModeIcon fontSize="small" />}
    </Button>
  );
};

export default ThemeToggle;
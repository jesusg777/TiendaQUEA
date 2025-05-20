// src/components/ThemeToggle.jsx
import { useTheme } from "../../context/ThemeContext";
import "./ThemeToggle.css";

export const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`theme-toggle ${isDark ? "dark" : "light"}`}
      aria-label={isDark ? "Cambiar a tema claro" : "Cambiar a tema oscuro"}
    >
      {isDark ? "☀️ Light" : "🌙 Dark"}
    </button>
  );
};

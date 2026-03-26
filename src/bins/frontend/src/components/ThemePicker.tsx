import { createSignal, onMount } from "solid-js";
import { useTheme } from "./ThemeContext";

const THEMES = [
  "light",
  "dark",
  "synthwave",
  "retro",
  "halloween",
  "forest",
  "aqua",
  "black",
  "luxury",
  "dracula",
  "business",
  "night",
  "coffee",
  "dim",
  "sunset",
  "abyss",
  "cyberpunk",
];

export default function ThemePicker() {
  const [theme, setTheme] = useTheme();

  return (
    <select
      class="select select-bordered w-full max-w-xs"
      value={theme()}
      onChange={(e) => setTheme(e.target.value)}
    >
      <option disabled>Choose a theme</option>
      {THEMES.map((t) => (
        <option value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
      ))}
    </select>
  );
}

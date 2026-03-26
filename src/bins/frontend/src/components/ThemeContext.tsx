// src/components/ThemeContext.tsx
import {
  createContext,
  useContext,
  createSignal,
  createEffect,
  ParentComponent,
} from "solid-js";
import { isServer, getRequestEvent } from "solid-js/web";

type ThemeContextType = [() => string, (theme: string) => void];

const ThemeContext = createContext<ThemeContextType>();

function getThemeCookie(): string {
  let cookieString = "";

  if (isServer) {
    const event = getRequestEvent();
    cookieString = event?.request.headers.get("cookie") || "";
  } else {
    cookieString = document.cookie;
  }

  const match = cookieString.match(new RegExp("(^| )daisy-theme=([^;]+)"));
  return match ? match[2] : "dark";
}

export const ThemeProvider: ParentComponent = (props) => {
  const [theme, setTheme] = createSignal(getThemeCookie());

  createEffect(() => {
    document.cookie = `daisy-theme=${theme()};path=/;max-age=31536000`;
  });

  return (
    <ThemeContext.Provider value={[theme, setTheme]}>
      {props.children}
    </ThemeContext.Provider>
  );
};

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
}

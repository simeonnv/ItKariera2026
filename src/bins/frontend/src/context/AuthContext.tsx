import { createContext, useContext, createSignal, JSX } from "solid-js";
import { isServer, getRequestEvent } from "solid-js/web";

type AuthContextType = {
  isLoggedIn: () => boolean;
  setIsLoggedIn: (value: boolean) => void;
  login: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>();

function getAuthCookie(): boolean {
  let cookieString = "";
  if (isServer) {
    const event = getRequestEvent();
    cookieString = event?.request.headers.get("cookie") || "";
  } else {
    cookieString = document.cookie;
  }
  const match = cookieString.match(new RegExp("(^| )auth-token=([^;]+)"));
  return !!match;
}

export function AuthProvider(props: { children: JSX.Element }) {
  const [isLoggedIn, setIsLoggedIn] = createSignal(getAuthCookie());

  function login() {
    document.cookie = `auth-token=true;path=/;max-age=86400`;
    setIsLoggedIn(true);
  }

  function logout() {
    document.cookie = `auth-token=;path=/;max-age=0`;
    setIsLoggedIn(false);
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, login, logout }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
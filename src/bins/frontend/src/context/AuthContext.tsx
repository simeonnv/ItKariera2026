import { getCookie } from "@solidjs/start/http";
import { RiFinance24HoursFill } from "solid-icons/ri";
import { createContext, useContext, createSignal, JSX } from "solid-js";
import { isServer, getRequestEvent } from "solid-js/web";
import { AuthResponse } from "~/routes/auth";

type AuthContextType = {
  isLoggedIn: () => boolean;
  setIsLoggedIn: (value: boolean) => void;
  login: (data: AuthResponse) => void;
  logout: () => void;
  performRefresh: () => void;
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

let refreshTimeout: ReturnType<typeof setTimeout> | null = null;

function clearRefreshTimer() {
  if (refreshTimeout) {
    clearTimeout(refreshTimeout);
    refreshTimeout = null;
  }
}


export function AuthProvider(props: { children: JSX.Element }): JSX.Element {
  const [isLoggedIn, setIsLoggedIn] = createSignal(getAuthCookie());

  function login(data: AuthResponse) {
    document.cookie = `accessToken=${data.accessToken}; path=/; max-age=${data.expiresIn}; SameSite=Lax; Secure`;
    document.cookie = `refreshToken=${data.refreshToken}; path=/; max-age=2592000; SameSite=Lax; Secure`;

    const refreshBuffer = 60
    const timeUntilRefresh = (data.expiresIn - refreshBuffer) 

    if (timeUntilRefresh > 0) {
      refreshTimeout = setTimeout(async () => {
        await performRefresh();
      }, timeUntilRefresh);

    setIsLoggedIn(true);
  }}

  async function performRefresh() {
    const refreshToken = getCookie("refreshToken")

    const res = await fetch("http://localhost:5120/refresh", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(refreshToken)
    });


    if (res.ok){
      const data: AuthResponse = await res.json();
      login(data)
    }
  }

  function logout() {
    document.cookie = `accessToken=; path=/; max-age=0`;
    document.cookie = `refreshToken=; path=/; max-age=0`;


    setIsLoggedIn(false);
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, login, logout, performRefresh }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}

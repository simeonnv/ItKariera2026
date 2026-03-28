// src/app.tsx
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import Nav from "~/components/Nav";
import Footer from "~/components/Footer";
import { ThemeProvider, useTheme } from "~/components/ThemeContext";
import "./app.css";
import { AuthProvider } from "./context/AuthContext";

function RootLayout(props: any) {
  const [theme] = useTheme();

  return (
    <div data-theme={theme()} class="min-h-screen w-full flex flex-col">
      <Nav />
        <main class="flex-1 flex flex-col overflow-y-auto">
          <Suspense>
          {props.children}
          </Suspense>
        </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
  <AuthProvider>
    <Router root={(props) => <RootLayout {...props} />}>
      <FileRoutes />
    </Router>
  </AuthProvider>
</ThemeProvider>
  );
}

// src/app.tsx
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import Nav from "~/components/Nav";
import Footer from "~/components/Footer";
import { ThemeProvider, useTheme } from "~/components/ThemeContext";
import "./app.css";

function RootLayout(props: any) {
  const [theme] = useTheme();

  return (
    <div data-theme={theme()} class="h-screen w-full flex flex-col">
      <Nav />
      <Suspense>{props.children}</Suspense>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Router root={(props) => <RootLayout {...props} />}>
        <FileRoutes />
      </Router>
    </ThemeProvider>
  );
}

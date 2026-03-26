import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import Nav from "~/components/Nav";
import Footer from "~/components/Footer";
import "./app.css";

export default function App() {
  return (
    <Router
      root={props => (
        <>
          <div class="flex flex-col min-h-screen">
            <Nav />
              <main class="flex-1">
                <Suspense>{props.children}</Suspense>
              </main>
            <Footer />
          </div>
        </>
      )}
    >
      <FileRoutes />
    </Router>
  );
}

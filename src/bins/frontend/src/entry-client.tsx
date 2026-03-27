// @refresh reload
import { mount, StartClient } from "@solidjs/start/client";
import { AuthProvider } from "./context/AuthContext";

mount(() => (
    <AuthProvider>
      <StartClient />
    </AuthProvider>), document.getElementById("app")!);
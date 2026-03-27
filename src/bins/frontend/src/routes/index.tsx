import { A } from "@solidjs/router";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const auth = useAuth();

  return (
    <main class="text-center h-full flex items-center justify-center">
      <div class="bg-[url(src/images/hopital.png)] h-full w-full">
        <div class="backdrop-blur-sm p-4 py-15 h-full flex flex-col items-center justify-center">
          <h1 class="max-6-xs text-6xl text-primary font-bold uppercase">
            MediqApp
          </h1>
          <p class="mt-10">One place for all your medical records.</p>
          {auth.isLoggedIn() && (
            <A class="btn btn-info mt-10" href="/medicalInfo">
              Take a look
            </A>
          )}
        </div>
      </div>
    </main>
  );
}

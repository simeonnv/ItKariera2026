import { A } from "@solidjs/router";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const auth = useAuth();

  return (
    <main class="relative w-screen min-h-screen">
      <div class="absolute inset-0 bg-[url(src/images/hopital.png)] bg-cover bg-center"></div>
        <div class="absolute inset-0 brightness-50 backdrop-blur-sm bg-white/10"></div>
          <div class="relative z-10 flex flex-col items-center justify-center min-h-screen text-center p-4">
            <h1 class="text-6xl text-primary font-bold uppercase">MediqApp</h1>
            <p class="mt-10">One place for all your medical records.</p>
            {auth.isLoggedIn() && (
            <A class="btn btn-info mt-10" href="/medicalInfo">Take a look</A>)}
          </div>
      </main>
  );
}

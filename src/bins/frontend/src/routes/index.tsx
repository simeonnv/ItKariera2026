import { A } from "@solidjs/router";

export default function Home() {
  return (
    
    <main class="text-center mx-auto text-gray-700">
      <div class="bg-[url(src/images/hopital.png)] py-60">
      <div class="backdrop-blur-sm p-4 py-15">
        <h1 class="max-6-xs text-6xl text-green-100 font-bold uppercase">MediqApp</h1>
      <p class="mt-10 text-green-100">
        One place for all your medical records.
      </p>
      <a class="btn bg-green-700 hover:bg-gray-900 mt-10" href="medicalInfo">Take a look</a>
      </div>
      </div>
    </main>
  );
}

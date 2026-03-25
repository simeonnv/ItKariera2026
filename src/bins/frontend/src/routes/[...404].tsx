import { A } from "@solidjs/router";

export default function NotFound() {
  return (
    <main class="flex justify-center mx-auto text-gray-100 p-40">
      <div class="flex justify-center flex-col">
        <h1 class="max-6-xs text-6xl text-red-700 font-bold uppercase my-16">Not Found</h1>
        <h2>Whoopsie doopsie! This was either a mistake on our side or you shouldn't be here! Please return to the {" "}
        <a href="/" class="text-sky-600 hover:underline">
          home page</a>{" "}!</h2>
        <img class="pt-10 " src="/src/images/pibble.png" width="300"></img>
      </div>
    </main>
  );
}

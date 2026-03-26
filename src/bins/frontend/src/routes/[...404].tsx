import { A } from "@solidjs/router";

export default function NotFound() {
  return (
    <main class="flex justify-center mx-auto  h-full">
      <div class="flex justify-center flex-col">
        <h1 class="max-6-xs text-6xl text-error font-bold uppercase my-16">
          Not Found
        </h1>

        <h2>
          Whoopsie doopsie! This was either a mistake on our side or you
          shouldn't be here! Please return to the{" "}
          <A href="/" class="link link-info link-hover hover:underline">
            home page
          </A>{" "}
          !
        </h2>
        <img class="pt-10 " src="/src/images/pibble.png" width="300"></img>
      </div>
    </main>
  );
}

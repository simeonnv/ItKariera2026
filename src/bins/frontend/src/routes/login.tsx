import { A } from "@solidjs/router";

export default function Home() {
  return (
    <main class="text-center mx-auto text-gray-100 p-4">
      <div class="flex w-full min-h-screen">
        <div class="bg-[url(src/images/doc.png)] bg-cover bg-center rounded-box w-1/3 min-h-0.5"></div>
        <div class="divider divider-horizontal"></div>
        <div class="card bg-base-300 rounded-box flex flex-col grow items-center justify-center gap-4 p-12">
          <div class="flex flex-col items-center gap-4 w-full max-w-sm">
            <h3>To view or edit medical information, please login!</h3>
            <label class="input validator w-full">
              <svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <g
              stroke-linejoin="round"
              stroke-linecap="round"
              stroke-width="2.5"
              fill="none"
              stroke="currentColor"
              >
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
              </g>
              </svg>
              <input type="text" required placeholder="Username"
                pattern="[A-Za-z][A-Za-z0-9\-]*" minlength="3" maxlength="30"
                title="Only letters, numbers or dash" />
            </label>
            <p class="validator-hint hidden">Must be 3 to 30 characters<br/>containing only letters, numbers or dash</p>
            <label class="input validator w-full">
              <svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <g
              stroke-linejoin="round"
              stroke-linecap="round"
              stroke-width="2.5"
              fill="none"
              stroke="currentColor"
              >
              <path
              d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"
              ></path>
              <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
              </g>
              </svg>
              <input type="password" required placeholder="Password"
                minlength="8" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Must be more than 8 characters, including number, lowercase letter, uppercase letter" />
            </label>
            <p class="validator-hint hidden">
              Must be more than 8 characters, including<br/>
              At least one number<br/>At least one lowercase letter<br/>At least one uppercase letter
            </p>
            <a class="btn bg-green-700 w-full hover:bg-gray-900 m-2" href="">Login</a>
            <h5>Don't have an account? You can{" "}
              <a href="/register" class="text-green-600 hover:underline">register</a>
              {" "}instead.
            </h5>
          </div>
        </div>
      </div>
    </main>
  );
}
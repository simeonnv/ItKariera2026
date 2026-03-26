import { A, useLocation } from "@solidjs/router";
import ThemePicker from "./ThemePicker";

export default function Nav() {
  const location = useLocation();
  const active = (path: string) =>
    path == location.pathname
      ? "border-primary"
      : "border-transparent hover:border-primary";
  return (
    <div class="navbar bg-base-200 flex flex-row shadow-sm px-6">
      <ul class="container flex items-center">
        <li class={`border-b-2 ${active("/")} mx-1.5 sm:mx-6`}>
          <A class="text-xl" href="/">
            MediqApp
          </A>
        </li>
      </ul>

      <div class="grow" />

      <A class="btn btn-ghost" href="/auth">
        Login
      </A>

      <ThemePicker />
    </div>
  );
}

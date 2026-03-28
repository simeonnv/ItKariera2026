import { A, useLocation } from "@solidjs/router";
import ThemePicker from "./ThemePicker";
import { useAuth } from "../context/AuthContext";

export default function Nav() {
  const auth = useAuth();
  const location = useLocation();

  const active = (path: string) =>
    path == location.pathname
      ? "border-primary"
      : "border-transparent hover:border-primary";

  return (
    <div class="navbar bg-base-200 flex flex-row shadow-sm px-6 sticky top-0 z-50">
      <ul class="container flex items-center">
        <li class={`border-b-2 ${active("/")} mx-1.5 sm:mx-6`}>
          <A class="text-xl" href="/">
            MediqApp
          </A>
        </li>
      </ul>

      <div class="grow" />

      {auth.isLoggedIn() ? (
        <div class="dropdown dropdown-end">
          <div tabindex="0" role="button" class="btn m-1">User</div>
          <ul
            tabindex="-1"
            class="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
          >
            <li><a href="medicalInfo">Medical information</a></li>
            <li><a href="userInfo">User information</a></li>
          </ul>
        </div>
      ) : (
        <A href="/auth" class="btn">Login</A>
      )}
      <A href="/doctors" class="btn mx-2">Doctors</A>
      <ThemePicker />
    </div>
  );
}
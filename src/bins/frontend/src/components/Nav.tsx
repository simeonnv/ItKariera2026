import { useLocation } from "@solidjs/router";
import { Show } from "solid-js";

export default function Nav() {
  const location = useLocation();
  const active = (path: string) =>
    path == location.pathname ? "border-green-600" : "border-transparent hover:border-green-600";
  return (
    <div class="navbar bg-green-800 shadow-sm">
      <ul class="container flex items-center p-3 text-gray-200">
        <li class={`border-b-2 ${active("/")} mx-1.5 sm:mx-6`}>
          <a href="/">MediqApp</a>
        </li>
      </ul>
      <div class="flex-1">
        <a class="btn" href="login">Login</a> {/*trqq dobavq <Show when={!IsLoggedIn()}> kato ima neshto gotovo ot backenda mai*/}
        <div class="dropdown dropdown-end">
          <div tabindex="0" role="button" class="btn m-1">User</div>
            <ul tabindex="-1" class="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
              <li><a href="medicalInfo">Medical information</a></li>
              <li><a href="userInfo">User information</a></li>
            </ul>
          </div>
      </div>
    </div>
  );
}

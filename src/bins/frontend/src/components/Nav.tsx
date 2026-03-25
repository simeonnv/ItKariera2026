import { useLocation } from "@solidjs/router";

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
        <a class="btn btn-ghost" href="/login">Login</a>
      </div>
    </div>
  );
}

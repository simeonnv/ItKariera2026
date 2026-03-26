import { A } from "@solidjs/router";
import { AiOutlineMail, AiOutlinePhone } from "solid-icons/ai";
import { FaRegularUserCircle } from "solid-icons/fa";
import { VsKey } from "solid-icons/vs";

export default function Home() {
  return (
    <main class="text-center p-4 w-full h-full flex justify-center items-center">
      <div class="flex w-2/3 h-full">
        <div class="bg-[url(src/images/doc.png)] bg-cover bg-center rounded-box w-1/3 min-h-full"></div>

        <div class="divider divider-horizontal"></div>

        <div class="card bg-base-300 rounded-box flex flex-col grow items-center justify-center gap-4 p-12">
          <div class="flex flex-col items-center gap-4 w-full max-w-sm">
            <h3>To view or edit medical information, please register!</h3>
            <label class="input validator w-full">
              <FaRegularUserCircle />
              <input
                type="text"
                required
                placeholder="Username"
                pattern="[A-Za-z][A-Za-z0-9\-]*"
                minlength="3"
                maxlength="30"
                title="Only letters, numbers or dash"
              />
            </label>
            <p class="validator-hint hidden">
              Must be 3 to 30 characters
              <br />
              containing only letters, numbers or dash
            </p>
            <label class="input validator w-full">
              <AiOutlineMail />
              <input type="email" placeholder="mail@site.com" required />
            </label>
            <div class="validator-hint hidden">Enter valid email address</div>
            <label class="input validator w-full">
              <AiOutlinePhone />
              <input
                type="tel"
                class="tabular-nums"
                required
                placeholder="Identification number"
                pattern="[0-9]*"
                minlength="10"
                maxlength="10"
                title="Must be 10 digits"
              />
            </label>
            <p class="validator-hint hidden">Must be 10 digits</p>
            <label class="input validator w-full">
              <VsKey />
              <input
                type="password"
                required
                placeholder="Password"
                minlength="8"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
              />
            </label>

            <p class="validator-hint hidden">
              Must be more than 8 characters, including
              <br />
              At least one number
              <br />
              At least one lowercase letter
              <br />
              At least one uppercase letter
            </p>

            <A class="btn w-full m-2" href="">
              Register
            </A>

            <h5>
              Have an account already? You can{" "}
              <A href="/login" class="link link-hover link-info">
                login
              </A>{" "}
              instead.
            </h5>
          </div>
        </div>
      </div>
    </main>
  );
}

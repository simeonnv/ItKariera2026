import { A } from "@solidjs/router";
import { AiOutlineMail, AiOutlinePhone } from "solid-icons/ai";
import { FaRegularUserCircle } from "solid-icons/fa";
import { VsKey } from "solid-icons/vs";
import { createSignal } from "solid-js";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const [username, setUsername] = createSignal("");
  const [email, setEmail] = createSignal("");
  const [id, setID] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [isLogin, setIsLogin] = createSignal(false);

  function handleUsernameInput(e: InputEvent) {
    const target = e.currentTarget as HTMLInputElement;
    setUsername(target.value);
  }

  function handleEmailInput(e: InputEvent) {
    const target = e.currentTarget as HTMLInputElement;
    setEmail(target.value);
  }

  function handleIDInput(e: InputEvent) {
    const target = e.currentTarget as HTMLInputElement;
    setID(target.value);
  }

  function handlePasswordInput(e: InputEvent) {
    const target = e.currentTarget as HTMLInputElement;
    setPassword(target.value);
  }

  function toggleMode() {
    setIsLogin(!isLogin());
  }
  
  const auth = useAuth();
  //tuk sys sigurnost ima za opravqne zashtoto ne znam dali shte proraboti s nashiq backend
  async function handleSubmit(e: Event) {
    e.preventDefault();

    const url = isLogin()  ? "http://localhost:5000/api/auth/login" : "http://localhost:5000/api/auth/register"; //may be total bullshit

    const payload = isLogin()
      ? {
          username: username(),
          password: password(),
        }
      : {
          username: username(),
          email: email(),
          id: id(),
          password: password(),
        };

    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  }

  return (
    
    <main class="text-center p-4 w-full h-full flex justify-center items-center">
      <div class="flex w-2/3 h-full">
        <div class="bg-[url(src/images/doc.png)] bg-cover bg-center rounded-box w-1/3 min-h-full"></div>
        <div class="divider divider-horizontal"></div>
        <div class="card bg-base-300 rounded-box flex flex-col grow items-center justify-center gap-4 p-12">
          <div class="flex flex-col items-center gap-4 w-full max-w-sm">
            <h3>To view or edit medical information, please {isLogin() ? "login" : "register"}!</h3>
            <form onSubmit={handleSubmit} class="flex flex-col items-center gap-4 w-full max-w-sm">
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
                onInput={handleUsernameInput}
              />
            </label>
            <p class="validator-hint hidden">
              Must be 3 to 30 characters
              <br />
              containing only letters, numbers or dash
            </p>
            {!isLogin() && (<>
              <label class="input validator w-full">
                <AiOutlineMail />
                <input
                  type="email"
                  placeholder="mail@site.com"
                  required
                  onInput={handleEmailInput}
                  title="Your email address"
                />
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
                onInput={handleIDInput}
              />
              </label>
              <p class="validator-hint hidden">Must be 10 digits</p>
              </>)}
            <label class="input validator w-full">
              <VsKey />
              <input
                type="password"
                required
                placeholder="Password"
                minlength="8"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                onInput={handlePasswordInput}
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

            <button type="submit" class="btn w-full m-2"> {isLogin() ? "Login" : "Register"} </button>
            </form>
            <h5>
              {isLogin() ? "Don't have an account?" : "Have an account already?"}{" "}
              <button type="button" class="link link-hover link-info" onClick={toggleMode}> {isLogin() ? "Register" : "Login"} </button>
            </h5>
          </div>
        </div>
      </div>
    </main>
  );
}

import { A } from "@solidjs/router";
import { AiOutlineMail, AiOutlinePhone } from "solid-icons/ai";
import { FaRegularUserCircle } from "solid-icons/fa";
import { VsKey } from "solid-icons/vs";
import { createSignal } from "solid-js";
import { useAuth } from "../context/AuthContext";
import PublicOnly from "~/components/PublicOnly";


export interface AuthResponse {
  tokenType: string;
  accessToken: string;
  expiresIn: number; 
  refreshToken: string;
}



export default function AuthPage() {
  const [username, setUsername] = createSignal("");
  const [email, setEmail] = createSignal("");
  const [id, setID] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [isLogin, setIsLogin] = createSignal(true);

  const { login } = useAuth();

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
  

  async function handleSubmit(e: Event) {
    e.preventDefault();
    const url = isLogin()
      ? "http://localhost:5120/login"
      : "http://localhost:5120/register";

    const payload = isLogin()
      ? { email: email(), password: password() }
      : { email: email(), password: password() };

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      let data: AuthResponse = await res.json();

      login(data);
    }
}

return (
  <PublicOnly>
  <div class="flex-1 flex items-center justify-center p-4 min-h-full">
    <div class="flex items-stretch justify-center gap-4 max-w-7xl w-full" style="height: 80vh">
      <div class="w-100 shrink-0 rounded-box overflow-hidden">
        <img src="src/images/doc.png" class="h-full w-full object-cover" alt="Doctor" />
      </div>

      <div class="divider divider-horizontal my-0"></div>

      <div class="flex flex-col shrink-0">
        <div class="card bg-base-300 rounded-box flex flex-col items-center justify-center gap-4 p-12 w-96 h-full">
          <div class="flex flex-col items-center gap-4 w-full max-w-sm">
            <h3>To view or edit medical information, please {isLogin() ? "login" : "register"}!</h3>
            <form onSubmit={handleSubmit} class="flex flex-col items-center gap-4 w-full max-w-sm">
              
              
                  <label class="input validator w-full">
                    <AiOutlineMail />
                    <input 
                    type="email" 
                    placeholder="mail@site.com" 
                    required 
                    onInput={handleEmailInput} 
                    title="Your email address" />
                  </label>
                  
                
              <label class="input validator w-full">
                <VsKey />
                <input 
                type="password" 
                required 
                placeholder="Password" 
                minlength="8" 
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" 
                title="Must be more than 8 characters, including number, lowercase letter, uppercase letter" 
                onInput={handlePasswordInput} />
              </label>
              <button type="submit" class="btn w-full m-2" >
                {isLogin() ? "Login" : "Register"}
                
              </button>
            </form>
            <h5>
              {isLogin() ? "Don't have an account?" : "Have an account already?"}{" "}
              <button type="button" class="link link-hover link-info" onClick={() => toggleMode()}>
                {isLogin() ? "Register" : "Login"}
              </button>
            </h5>
          </div>
        </div>
      </div>
    </div>
  </div>
  </PublicOnly>
);
}
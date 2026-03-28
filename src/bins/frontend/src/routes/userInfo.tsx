import { A, useNavigate } from "@solidjs/router";
import Protected from "~/components/Protected";
import { useAuth } from "~/context/AuthContext";

export default function UserInfo() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/auth");
  }
  return (
    <Protected>
    <main class="flex justify-center content-center flex-col mx-auto h-full p-30">
      <div>
        <div class="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
          <table class="table">
            <tbody>
              <tr>
                <th>Name</th>
                <td>this</td>
              </tr>
              <tr>
                <th>Middle name</th>
                <td>guy</td>
              </tr>
              <tr>
                <th>Surname</th>
                <td>idk</td>
              </tr>
              <tr>
                <th>Email</th>
                <td>sample@email.com</td>
              </tr>
              <tr>
                <th>Identification number</th>
                <td>1234567890</td>
              </tr>
              <tr>
                <th>Hospital</th>
                <td>bate znaesh</td>
              </tr>
              <tr>
                <td>
                  <a class="btn mr-2" onClick={handleLogout} href="/">Logout</a>
                  <label for="my_modal_6" class="btn bg-error">
                    Delete account
                  </label>
                </td>
              </tr>
            </tbody>
          </table>

          <input type="checkbox" id="my_modal_6" class="modal-toggle" />
          <div class="modal" role="dialog">
            <div class="modal-box">
              <h3 class="text-lg font-bold text-warning">Warning</h3>
              <p class="py-4">Are you sure you want to delete your account?</p>
              <div class="modal-action">
                <label for="my_modal_6" class="btn ">
                  No
                </label>
                <button class="btn">Yes</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    </Protected>
  );
}

import { A } from "@solidjs/router";
import { useAuth } from "../context/AuthContext";

export default function DoctorInfo() {
  const auth = useAuth();
  return (
    <main class="flex justify-center content-center flex-col mx-auto h-full p-30">
      <div>
        <div class="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
        <div class="avatar">
  <div class="w-24 rounded-full m-5">
    <img src="src/images/house.png"/>
  </div>
</div>
          <table class="table">
            <tbody>
              <tr>
                <th>Name</th>
                <td>Gregory House</td>
              </tr>
              <tr>
                <th>Qualification</th>
                <td>Lupus doctor</td>
              </tr>
              <tr>
                <th>Email</th>
                <td>sample@email.com</td>
              </tr>
              <tr>
                <th>Hospital</th>
                <td>ne znam :(</td>
              </tr>
              <tr>
                <th>Telephone</th>
                <td>+359888888888</td>
              </tr>
            </tbody>
          </table>
          <ul class="list bg-base-100 rounded-box shadow-md">
        <li class="list-row">
          {" "}
          <div>
            <div>The doctor of houses</div>
            <div class="text-xs uppercase font-semibold opacity-60">
            </div>
          </div>
          <p class="list-col-wrap text-xs">Book an appointment for me and if you get approved I guarantee you, you will never have lupus in your life!</p>
        </li>
        {auth.isLoggedIn() ? (<a href="/createAppointment" class="btn m-5">Book an appointment</a>) : (<><a class="btn btn-disabled m-5">Book an appointment</a> 
        <p class="m-2">You need to login to book an appointment!</p></>)}
      </ul>
        </div>
      </div>
    </main>
  );
}

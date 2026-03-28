import { A } from "@solidjs/router";
import Protected from "~/components/Protected"

export default function MedicalInfo() {
  return (
    <Protected>
    <main class="flex justify-center flex-col mx-auto p-40 h-full">
      <h3 class="p-10">You can take a look at all your appointments here:</h3>
      <ul class="list bg-base-100 rounded-box shadow-md">
        <li class="list-row">
          {" "}
          {/* foreach neshto za vseki appointment kato imame backend - zasega placeholderi */}
          <div> {/* user side appointment */}
            <div>Doctor House</div>
            <div class="text-xs uppercase font-semibold opacity-60">
              Hospital name
            </div>
          </div>
          <p class="list-col-wrap text-xs">Diagnosis: not lupus</p>
          <p class="list-col-wrap text-xs">Appointment date: DD/MM/YYYY</p>
          <div class="badge badge-success">Completed</div>
        </li>

        <li class="list-row">
          <div> {/*doctor side appointment */}
            <div>Koicho Koichev Koichevski</div>
          </div>
          <p class="list-col-wrap text-xs">Diagnosis: lupus</p>
          <p class="list-col-wrap text-xs">Appointment date: DD/MM/YYYY</p>
          <div class="badge badge-warning">Pending</div>
        </li>
        <li class="list-row">
          <div> {/*doctor side appointment */}
            <div>Koicho Koichev Koichevski</div>
          </div>
          <p class="list-col-wrap text-xs">Diagnosis: lupus</p>
          <p class="list-col-wrap text-xs">Appointment date: DD/MM/YYYY</p>
          <div class="badge badge-error">Rejected</div>
        </li>
        <li class="list-row">
          <div> {/*doctor side appointment */}
            <div>Koicho Koichev Koichevski</div>
          </div>
          <p class="list-col-wrap text-xs">Diagnosis: lupus</p>
          <p class="list-col-wrap text-xs">Appointment date: DD/MM/YYYY</p>
          <div class="badge badge-info">Accepted</div>
        </li>
      </ul>
      <a class="btn mt-5" href="/doctors">Create appointment</a>
    </main>
    </Protected>
  );
}

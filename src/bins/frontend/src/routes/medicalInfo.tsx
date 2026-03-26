import { A } from "@solidjs/router";

export default function MedicalInfo() {
  // please use the inbuilt colors in daisy

  return (
    <main class="flex justify-center flex-col mx-auto text-gray-100 p-40">
      <h3 class="p-10">You can take a look at all your appointments here:</h3>
      <ul class="list bg-base-100 rounded-box shadow-md">
        <li class="list-row">
          {" "}
          {/* foreach neshto za vseki appointment kato imame backend - zasega placeholderi */}
          <div>
            <div>Doctor House</div>
            <div class="text-xs uppercase font-semibold opacity-60">
              Hospital name
            </div>
          </div>
          <p class="list-col-wrap text-xs">Diagnosis: not lupus</p>
        </li>

        <li class="list-row">
          <div>
            <div>Doctor Who</div>
            <div class="text-xs uppercase font-semibold opacity-60">
              Hospital
            </div>
          </div>
          <p class="list-col-wrap text-xs">Diagnosis: lupus</p>
        </li>

        <li class="list-row">
          <div>
            <div>Doctor Grey</div>
            <div class="text-xs uppercase font-semibold opacity-60">
              Hopital
            </div>
          </div>
          <p class="list-col-wrap text-xs">Diagnosis: lorem ipsum</p>
        </li>
      </ul>
    </main>
  );
}

import { A } from "@solidjs/router";
import Protected from "~/components/Protected";

export default function CreateAppointment() {

  return (
    <Protected>
    <main class="flex justify-center flex-col mx-auto h-full p-40">
      <p class="m-2">Fill out the information below:</p>
        <fieldset class="fieldset">
            <legend class="fieldset-legend pb-1">Pick a date and time for your appointment</legend>
            <input type="datetime-local" class="input border-2"/>
        </fieldset>
        <fieldset class="fieldset">
            <legend class="fieldset-legend pb-1">Input details about your condition</legend>
            <textarea class="textarea border-2"></textarea>
        </fieldset>
        <button class="btn mt-5">Create appointment</button>
    </main>
    </Protected>
  );
}

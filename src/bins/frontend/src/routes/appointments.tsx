import { A } from "@solidjs/router";
import Protected from "~/components/Protected";

export default function Appointments() {

  return (
    <Protected>
        <main class="flex justify-center flex-col mx-auto p-40 h-full">
        <ul class="list bg-base-100 rounded-box shadow-md">
        <li class="list-row">
          <div>
            <div>Koicho Koichev Koichevski</div>
            <div class="text-xs uppercase font-semibold opacity-60">
              email@sample.com
            </div>
            <div class="text-xs uppercase font-semibold opacity-60">
              +359888888888
            </div>
          </div>
          <p class="list-col-wrap text-xs">complains about having schizophrenia</p>
          <p class="list-col-wrap text-xs">Appointment date: DD/MM/YYYY</p>
          <div class="badge badge-warning"><label for="my_modal_6">Pending</label></div>
            <input type="checkbox" id="my_modal_6" class="modal-toggle" />
            <div class="modal" role="dialog">
                <div class="modal-box">
                    <h3 class="text-lg font-bold">[Koicho Koichev Koichevski]'s appointment</h3>
                    <p class="py-4">Status: pending <br/>Accept or reject their appointment?</p>
                    <div class="modal-action">
                    <label for="my_modal_6" class="btn">Close</label>
                    <label for="my_modal_6" class="btn bg-error">Reject</label>
                    <label for="my_modal_6" class="btn bg-success">Accept</label>
                </div>
            </div>
        </div>
        </li>
        <li class="list-row">
          <div>
            <div>Koicho Koichev Koichevski</div>
            <div class="text-xs uppercase font-semibold opacity-60">
              email@sample.com
            </div>
            <div class="text-xs uppercase font-semibold opacity-60">
              +359888888888
            </div>
          </div>
          <p class="list-col-wrap text-xs">complains about having schizophrenia</p>
          <p class="list-col-wrap text-xs">Appointment date: DD/MM/YYYY</p>
          <div class="badge badge-info">Accepted</div>
        </li>
        <li class="list-row">
          <div>
            <div>Koicho Koichev Koichevski</div>
            <div class="text-xs uppercase font-semibold opacity-60">
              email@sample.com
            </div>
            <div class="text-xs uppercase font-semibold opacity-60">
              +359888888888
            </div>
          </div>
          <p class="list-col-wrap text-xs">complains about having schizophrenia</p>
          <p class="list-col-wrap text-xs">Appointment date: DD/MM/YYYY</p>
          <div class="badge badge-error">Rejected</div>
        </li>
        <li class="list-row">
          <div>
            <div>Koicho Koichev Koichevski</div>
            <div class="text-xs uppercase font-semibold opacity-60">
              email@sample.com
            </div>
            <div class="text-xs uppercase font-semibold opacity-60">
              +359888888888
            </div>
          </div>
          <p class="list-col-wrap text-xs">complains about having schizophrenia</p>
          <p class="list-col-wrap text-xs">Appointment date: DD/MM/YYYY</p>
          <div class="badge badge-success">Completed</div>
        </li>
        </ul>
        </main>
    </Protected>
  );}
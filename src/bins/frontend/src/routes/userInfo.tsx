import { A } from "@solidjs/router";

export default function UserInfo() {
  return (
    <main class="flex justify-center content-center flex-col mx-auto text-gray-100 p-30">
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
        <td><button class="btn mr-2">Logout</button><label for="my_modal_6" class="btn bg-red-800">Delete account</label>
        </td>
      </tr>
    </tbody>
  </table>
  
<input type="checkbox" id="my_modal_6" class="modal-toggle" />
<div class="modal" role="dialog">
  <div class="modal-box">
    <h3 class="text-lg font-bold text-red-600">Warning</h3>
    <p class="py-4">Are you sure you want to delete your account?</p>
    <div class="modal-action">
      <label for="my_modal_6" class="btn bg-gray-800">No</label>
      <button class="btn">Yes</button>
    </div>
  </div>
</div>
</div>
        </div>
    </main>
  );
}

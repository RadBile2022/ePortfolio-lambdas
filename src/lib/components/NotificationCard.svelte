<script>
  import { DropdownItem } from "flowbite-svelte";
  import {api_url,default_img} from "$lib/end-point.js";
  export let idProject, idUser;

  let userData, name, profilePicture;

  // get data user
  async function getUser() {
    const response = await fetch(
      api_url + "/api/users/" + idUser
    );

    if (!response.ok) {
      window.location.href = "/login";
      localStorage.clear();
    }

    const data = await response.json();
    userData = data;
    name = userData.username;
    if (userData.profilePicture) {
      profilePicture = api_url + "/" + userData.profilePicture;
    } else {
      profilePicture = default_img;
    }
  }

  getUser();
</script>

<a href="/project/{idProject}">
  <DropdownItem class="flex space-x-4">
    <img
      class="w-11 h-11 rounded-full object-cover"
      src={profilePicture}
      alt="Rounded avatar"
    />
    <div class=" w-full">
      <div class="text-gray-500 text-sm mb-1.5 dark:text-gray-400">
        New request for project participation from
        <span class="font-semibold text-gray-900 dark:text-white">{name}</span>
      </div>
      <!-- <div class="text-xs text-blue-600 dark:text-blue-500">
        a few moments ago
      </div> -->
    </div>
  </DropdownItem>
</a>

<script>
  import { Popover } from "flowbite-svelte";
  import {api_url, default_img} from "$lib/end-point.js";
  export let userId;
  let userData, profilePicture, nameUser;

  let userIdLocal = userId;

  // get data user
  async function getUser() {
    const response = await fetch(
        api_url + "/api/users/" + userId
    );

    if (!response.ok) {
      console.log(response.statusText);
    }

    const data = await response.json();
    userData = data;
    nameUser = userData.username;
    if (userData.profilePicture) {
      profilePicture =   api_url + "/" + userData.profilePicture;
    } else {
      profilePicture = default_img;
    }
  }

  getUser();
</script>

<a href={userIdLocal == userId ? "/profile" : "/profile/" + userId}>
  <img
    id="b{userId}"
    class="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800"
    src={profilePicture}
    alt=""
  />
  <Popover class="w-auto text-sm font-light " triggeredBy="#b{userId}">
    {nameUser}
  </Popover>
</a>

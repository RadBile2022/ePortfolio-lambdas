<script>
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
      profilePicture = import.meta.env.DBX_API_URL + "/" + userData.profilePicture;
    } else {
      profilePicture = default_img;
    }
  }

  getUser();
</script>

{#if userData}
  <option value={userId}>{nameUser}</option>
{/if}

<script>
  export let userId;
  export let userIdLocal;
  import {api_url, default_img} from "$lib/end-point.js";

  let userData,
    profilePicture,
    nameUser,
    roleUser,
    nimUser,
    majorUser,
    interestUser,
    academicField;


  // get data user
  async function getUserDiscovery() {
    const response = await fetch(
      api_url + "/api/users/" + userId
    );

    if (!response.ok) {
      console.log(response.statusText);
    }

    const data = await response.json();
    userData = data;
    nameUser = userData.username;
    nimUser = userData.nim;
    majorUser = userData.major;
    roleUser = userData.role;
    interestUser = userData.interest;
    academicField = userData.academicField;
    if (userData.profilePicture) {
      profilePicture = api_url + "/" + userData.profilePicture;
    } else {
      profilePicture = default_img;
    }
  }
  getUserDiscovery();
</script>

{#if userData}
  <div class="md:container md:mx-auto bg-gray-100 p-6">
    <div class="flex">
      <a
        href={userIdLocal == userId ? "/profile" : `/${userId}/profile`}
        class="flex"
      >
        <img
          class="w-14 h-14 rounded-full object-cover"
          src={profilePicture}
          alt="Rounded avatar"
        />
        <div class="ml-4">
          <div class="font-bold text-lg leading-tight line-clamp-1">
            {nameUser}
          </div>
          {#if roleUser == "mahasiswa"}
            <div class="font-light text-sm line-clamp-1">{nimUser}</div>
            <div class="font-light text-sm line-clamp-1">{majorUser}</div>
            <div class="line-clamp-1">{interestUser}</div>
          {:else}
            <div class="line-clamp-1 w-96">
              {academicField ? academicField : ""}
            </div>
          {/if}
        </div>
      </a>
    </div>
  </div>
{/if}

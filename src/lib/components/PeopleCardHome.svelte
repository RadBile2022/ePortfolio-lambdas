<script>
  export let userId;
  import {api_url,default_img} from "$lib/end-point.js";

  let userData,
    profilePicture,
    nameUser,
    roleUser,
    nimUser,
    majorUser,
    interestUser,
    organization,
    academicField;

  let userIdLocal = localStorage.getItem("userId");

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
    nimUser = userData.nim;
    majorUser = userData.major;
    roleUser = userData.role;
    interestUser = userData.interest;
    academicField =
      userData.academicField != "undefined" ? userData.academicField : null;
    organization = userData.organization;
    if (userData.profilePicture) {
      profilePicture = api_url + "/" + userData.profilePicture;
    } else {
      profilePicture = default_img;
    }
  }

  getUser();
</script>

{#if userData}
    <div class="  mb-5 pr-5 md:pr-0 ">
      <a
        href={userIdLocal == userId ? "/profile" :  userId + "/profile" }
        class="grid grid-cols-4"
      >
        <div class="flex justify-center self-center">
          <img
                  class="w-14 h-14 mx-3 rounded-full object-cover"
                  src={profilePicture}
                  alt="Rounded avatar"
          />
        </div>

        <div class="col-span-3">
          <div class="font-bold text-lg leading-tight line-clamp-1">
            {nameUser}
          </div>
          {#if roleUser == "mahasiswa"}
            <div class="text-sm line-clamp-1">{majorUser}</div>
          {:else}
            <div class="text-sm line-clamp-1">
              {academicField ? academicField  : ""}
            </div>
          {/if}
          <div class="text-sm line-clamp-1">
            {organization ? organization : ""}
          </div>
          <dvi class="md:flex md:justify-center">
            <button
                    type="button"
                    class="text-white w-full md:w-60  mt-1 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-1 mr-2 mb-2"
            >Follow</button
            >
          </dvi>

        </div>
      </a>
    </div>
{/if}

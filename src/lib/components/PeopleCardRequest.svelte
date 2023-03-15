<script>
  import {api_url,default_img} from "$lib/end-point.js";

  export let userId, idProject;
  let userData,
    profilePicture,
    nameUser,
    roleUser,
    nimUser,
    majorUser,
    interestUser,
    organization,
    academicField;

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
    academicField = userData.academicField;
    organization = userData.organization;
    if (userData.profilePicture) {
      profilePicture =   api_url + "/" + userData.profilePicture;
    } else {
      profilePicture = default_img;
    }
  }

  getUser();

  // accept request
  async function acceptRequestParticipation() {
    let response = await fetch(
        api_url + "/api/projects/accept/" + idProject,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
        }),
      }
    );

    if (!response.ok) {
      const data = await response.json();
      console.log(data);
    } else {
      const data = await response.json();
      console.log(data);
      window.location.reload();
    }
  }

  // cancel request participation
  async function cancelRequestParticipation() {
    let response = await fetch(
        api_url + "/api/projects/cancelrequest/" + idProject,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
        }),
      }
    );

    if (!response.ok) {
      const data = await response.json();
      console.log(data);
    } else {
      const data = await response.json();
      console.log(data);
      window.location.reload();
    }
  }
</script>

{#if userData}
  <div class="mb-2  md:w-1/2">
    <div class="flex">
      <img
        class="w-14 h-14 rounded-full object-cover"
        src={profilePicture}
        alt="Rounded avatar"
      />
      <div class="md:ml-4">
        <div class="font-bold text-md md:text-lg leading-tight line-clamp-1">
          {nameUser}
        </div>
        {#if roleUser == "mahasiswa"}
          <div class="text-sm line-clamp-1">{majorUser}</div>
        {:else}
          <div class="text-sm line-clamp-1">
            {academicField ? academicField + "asdasdsaasd" : ""}
          </div>
        {/if}
        <div class="text-sm line-clamp-1">
          {organization ? organization : ""}
        </div>
      </div>
      <div class="flex-auto" />
      <div class="flex ">
        <button
                on:click={acceptRequestParticipation}
                type="button"
                class="focus:outline-none h-10 self-center ml-4 text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5"
        >Accept</button
        >
        <button
                on:click={cancelRequestParticipation}
                type="button"
                class="focus:outline-none h-10 self-center ml-2 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 "
        >Reject</button
        >
      </div>

    </div>
  </div>
{/if}

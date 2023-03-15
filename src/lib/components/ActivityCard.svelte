<script>
  import { Button, Dropdown, DropdownItem } from "flowbite-svelte";
  import {onMount} from "svelte";
  import {api_url} from "$lib/end-point.js";
  import {goto} from "$app/navigation";

  export let activity;

  export let userId ;

  // onMount(()=>{
  //   userId= localStorage.getItem("userId");
  // })

  let userIdActivity, image, desc, date, title, type, startDate, endDate;

  if (activity) {
    title = activity.title;
    image = activity.image;
    desc = activity.desc;
    type = activity.type;
    userIdActivity = activity.userId;
    startDate = new Date(activity.startDate);
    if (activity.endDate) {
      endDate = new Date(activity.endDate);
    }

    if (activity.createdAt != activity.updatedAt) {
      date = new Date(activity.createdAt);
    } else {
      date = new Date(activity.createdAt);
    }
  }

  // edit activity
  async function editActivity(){
    localStorage.setItem("idActivity",activity._id)
    goto(`/activity/edit/${activity._id}`)
  }
  // detail
  async function detail(){
    goto(`/activity/${activity._id}`)
  }
  // delete activity
  async function deleteActivity() {
    const response = await fetch(
      api_url + "/api/activities/" + activity._id,
      {
        method: "DELETE",
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify({
          userId: userId,
        }),
      }
    );

    if (!response.ok) {
      alert("You can only delete your activity");
    } else {
      document.location.href = "/activities";
    }
  }
</script>

<hr />
<div class="flex my-4 px-6">
  <div class="w-full">
    <div class="flex">
      {#if image}
        <img
          class="h-16 w-16 object-cover mr-4 rounded-full self-center"
          src={image}
          alt=""
        />
      {/if}
      <div class=" self-center">
        <div>
          <div class="flex">
            <button on:click={detail}>
              <div
                class="font-bold text-blue-600 text-md md:text-xl hover:underline leading-tight"
              >
                {title}
              </div></button
            >
            {#if !activity.isPublic}
              <div
                class="ml-3 mt-1 h-5 ring-1 ring-gray-400  text-xs font-semibold text-gray-600 items-center inline-flex rounded-full px-2"
              >
                Private
              </div>
            {/if}
          </div>
          <div class="text-sm">
            {type == "academic" ? "Academic" : "Non Academic"}
          </div>
          {#if endDate}
            <div class="text-sm">
              {startDate.toLocaleDateString("id")} - {endDate.toLocaleDateString(
                "id"
              )}
            </div>
          {:else}
            <div class="text-sm">
              {startDate.toLocaleDateString("id")} - Present
            </div>
          {/if}
        </div>
      </div>

      <div class="flex-auto" />
      {#if userId == userIdActivity}
        <Button btnClass="p-0 h-3"
          >e<iconify-icon icon="fluent:more-horizontal-32-filled" /></Button
        >
        <Dropdown class="w-auto">
          <DropdownItem on:click={editActivity}
            >Edit</DropdownItem
          >
          <DropdownItem on:click={deleteActivity}>Delete</DropdownItem>
        </Dropdown>
      {/if}
    </div>
  </div>
  <div />
</div>

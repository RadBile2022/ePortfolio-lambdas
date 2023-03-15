<script>
  import {
    Button,
    Dropdown,
    DropdownItem,
    Chevron,
    Progressbar,
  } from "flowbite-svelte";
import {api_url} from "$lib/end-point.js";
  import {goto} from "$app/navigation";

  export let userId, project;

  let userIdLocal =userId;

  let userIdProject,
    image,
    desc,
    date,
    title,
    type,
    startDate,
    endDate,
    roadmaps = [],
    totalPercentRoadmaps = 0,
    progress;

  if (project) {
    title = project.title;
    image = project.image;
    desc = project.desc;
    type = project.type;
    roadmaps = project.roadmaps;
    userIdProject = project.userId;
    startDate = new Date(project.startDate);
    if (project.endDate) {
      endDate = new Date(project.endDate);
    }

    if (project.createdAt != project.updatedAt) {
      date = new Date(project.createdAt);
    } else {
      date = new Date(project.createdAt);
    }
  }

  roadmaps.forEach((roadmap) => {
    let percentRoadmap,
      totalPercentTask = 0;

    roadmap.tasks.forEach((task) => {
      let percentTask,
        doneLengthTask = 0,
        todosLengthTask = 0;

      todosLengthTask = task.todos.length;

      task.todos.forEach((todo) => {
        if (todo.done) {
          doneLengthTask += 1;
        }
      });

      if (todosLengthTask > 0) {
        percentTask = Math.round((doneLengthTask / todosLengthTask) * 100);
      }

      if (percentTask) {
        totalPercentTask += percentTask;
      } else {
        totalPercentTask += 0;
      }
    });

    percentRoadmap = totalPercentTask / roadmap.tasks.length;
    if (!percentRoadmap) {
      percentRoadmap = 0;
    }
    totalPercentRoadmaps += percentRoadmap;
  });

  progress = Math.round(totalPercentRoadmaps / roadmaps.length);
  if (!progress) {
    progress = 0;
  }

  // update data project
  async function update(visibility) {
    let response = await fetch(
      api_url +"/api/projects/" + project._id,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: project.userId,
          isPublic: visibility,
        }),
      }
    );

    if (!response.ok) {
      const data = await response.json();
    } else {
      document.location.reload();
    }
  }

  // delete project
  async function deleteProject() {
    const response = await fetch(
      api_url + "/api/projects/" + project._id,
      {
        method: "DELETE",
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify({
          userId: project.userId,
        }),
      }
    );

    if (!response.ok) {
      alert("You can only delete your project");
    } else {
      goto("/projects")  ;
    }
  }
</script>

<hr />
<div class="flex mt-4 mb-6 px-5">
  <div class="w-full">
    <div class="flex">
      {#if image}
        <img
          class="h-16 w-16 md:h-16 md:w-16 object-cover mr-4 rounded-full self-center"
          src={image}
          alt=""
        />
      {/if}
      <div class="self-center">
        <div>
          <div class="flex">
            <a href="/project/{project._id}">
              <div
                class="font-bold text-blue-600 text-md md:text-xl hover:underline leading-tight line-clamp-1"
              >
                {title}
              </div></a
            >
          </div>

          <div class="text-sm">
            {type == "academic" ? "Academic" : "Non Academic"}

            {#if !project.isPublic}
              <div
                      class="ml-3 mt-1 h-5 ring-1 ring-gray-400  text-xs font-semibold text-gray-600 items-center inline-flex rounded-full px-2"
              >
                Private
              </div>
            {:else}
              <div
                      class="ml-3 mt-1 h-5 ring-1 ring-gray-400  text-xs font-semibold text-gray-600 items-center inline-flex rounded-full px-2"
              >
                Public
              </div>
            {/if}
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
      <div class="text-sm md:text-md">
        {#if project.userId == userId}
          <div>Leader</div>
        {:else if project.participants.includes(userId)}
          <div>Participant</div>
        {/if}
      </div>
      <div class="flex-auto" />

<!--      benahin-->

        <div class="justify-end flex">
          {#if userIdLocal == userIdProject || project.participants.includes(userIdLocal)}
            <Button btnClass="p-0 h-3"
            >e<iconify-icon icon="fluent:more-horizontal-32-filled" /></Button
            >
            <Dropdown class="w-auto">
              <DropdownItem class="flex items-center justify-between"
              ><Chevron placement="right">Visibility</Chevron></DropdownItem
              >
              <Dropdown class="w-auto" placement="right-start">
                <DropdownItem on:click={() => update(true)}>Public</DropdownItem>
                <DropdownItem on:click={() => update(false)}>Private</DropdownItem>
              </Dropdown>
              <DropdownItem
              ><a href="/project/edit/{project._id}">Edit</a></DropdownItem
              >
              {#if !project.participants.includes(userId) && project.userId == userIdLocal}
                <DropdownItem on:click={deleteProject}>Delete</DropdownItem>
              {/if}
            </Dropdown>
          {/if}

        </div>





    </div>
    <div class="mt-2">
      <Progressbar {progress} size="h-4" labelInside />
    </div>
  </div>
  <div />
</div>

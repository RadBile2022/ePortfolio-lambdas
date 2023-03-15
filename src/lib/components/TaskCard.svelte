<script>
  import { Progressbar } from "flowbite-svelte";
  import AvatarStack from "./AvatarStack.svelte";

  export let idProject,
    projectData,
    roadmaps,
    task,
    assignee = [];

  let percent,
    doneLength = 0,
    todosLength;

  todosLength = task.todos.length;

  task.todos.forEach((element) => {
    if (element.done) {
      doneLength += 1;
    }
    if (element.assignee) {
      element.assignee.forEach((assigne) => {
        if (!assignee.includes(assigne)) {
          assignee.push(assigne);
        }
      });
    }
  });

  if (todosLength > 0) {
    percent = Math.round((doneLength / todosLength) * 100);
  }

  var t2 = new Date().getTime();
  var t1 = new Date(task.date).getTime();

  if (
    Math.floor((t2 - t1) / (24 * 3600 * 1000)) >= 0 &&
    task.status == "prepare"
  ) {
    updateTask();
  } else {
    let taskDate = new Date(task.date).toLocaleDateString("id");
    let now = new Date().toLocaleDateString("id");
    if (taskDate == now && task.status == "prepare") {
      updateTask();
    }
  }

  // update task
  async function updateTask() {
    task.status = "todo";

    const response = await fetch(
      "http://103.187.223.15:8800/api/projects/" + idProject,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: projectData.userId,
          roadmaps,
        }),
      }
    );

    if (!response.ok) {
      alert(response.statusText);
    } else {
      const data = await response.json();
      window.location.reload();
    }
  }
</script>

<div class="flex items-center border border-t-0 p-2">
  <iconify-icon icon="material-symbols:task-outline-rounded" class="mr-2" />
  <div class="grid grid-col-1 md:grid-cols-2  w-full">
    <div class="line-clamp-1 ">
      {task.title}
    </div>

    <div class="mt-2 flex justify-between ">
      {#if todosLength > 0}
        <div class="  w-36">
          <Progressbar progress={percent} size="h-4" labelInside />
        </div>
      {/if}
      <div class="flex gap-1 md:gap-5">
        {#if task.status}
          <div class="ring-1 ring-gray-400  text-xs font-semibold text-gray-600 items-center inline-flex rounded-full px-2">
            {#if task.status == "prepare"}
              <div>
                Prepare
              </div>
            {:else if task.status == "todo"}
              <div>
                To Do
              </div>
            {:else if task.status == "inprogress"}
              <div>
                In Progress
              </div>
            {:else if task.status == "complete"}
              <div>
                Complete
              </div>
            {/if}
          </div>

        {/if}
        <div class="flex -space-x-4">
          {#if assignee}
            {#each assignee as assigne}
              <AvatarStack userId={assigne} />
            {/each}
          {/if}
        </div>
        <div class="text-xs md:text-base">
          {new Date(task.date).toLocaleDateString("en", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </div>
      </div>
    </div>

  </div>



</div>

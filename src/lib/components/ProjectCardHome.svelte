<script>
  export let project;

  let userIdProject, image, desc, date, title, type, startDate, endDate;

  if (project) {
    title = project.title;
    image = project.image;
    desc = project.desc;
    type = project.type;
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
</script>

<div class="my-5 pr-5 md:pr-0">
    <div class="grid grid-cols-4">
      {#if image}

        <div class="flex justify-center">
          <img
                  class="h-14 w-14 object-cover mx-4 rounded-full self-center"
                  src={image}
                  alt=""
          />
        </div>

          {:else }
        <div class="flex justify-center">

          <img
                  class="h-14 w-14 object-cover mx-4 rounded-full self-center"
                  src="https://img.freepik.com/free-vector/team-starting-project_74855-4818.jpg?w=1060&t=st=1676884527~exp=1676885127~hmac=c777a2fbdff0b7fad51a26b8d4e53e10191b2f4fd4be86cb69a92c294f70abf2"
                  alt=""
          />
        </div>

      {/if}
      <div class=" col-span-3">
        <div>
          <div class="flex">
            <a href="/project/{project._id}">
              <div
                class="font-bold text-blue-600 text-xl hover:underline leading-tight line-clamp-1"
              >
                {title}
              </div></a
            >
            {#if !project.isPublic}
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
    </div>
  </div>

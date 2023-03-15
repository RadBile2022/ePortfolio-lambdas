<script>
  import { DropdownItem } from "flowbite-svelte";
  export let task;
</script>

<a href="/project/{task.projectId}/roadmap/{task.roadmapId}/task/{task.taskId}">
  <DropdownItem class="flex space-x-4">
    <div class="w-full">
      <div class="text-gray-500 text-sm mb-1.5 dark:text-gray-400">
        Task <span class="font-semibold text-gray-900 dark:text-white"
          >{task.title}</span
        > is approaching its due date
      </div>
    </div>
  </DropdownItem>
</a>

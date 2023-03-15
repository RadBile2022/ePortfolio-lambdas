<script>



</script>

<button on:click={detailActivity}

        class="hover:underline"
>
    <div class="flex items-center border border-t-0 p-2">
        <iconify-icon
                icon="material-symbols:task-outline-rounded"
                class="mr-2"
        />
        <div>
            {task.title}
        </div>
        <div class="flex-auto" />
        <div class="text-sm md:text-base">
            {new Date(task.date).toLocaleDateString("en", {
                day: "numeric",
                month: "long",
                year: "numeric",
            })}
        </div>
    </div>
</button>

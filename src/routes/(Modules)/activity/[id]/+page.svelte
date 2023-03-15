<script>
    import MarkdownViewer from "$lib/components/MarkdownViewer.svelte";
    import {goto} from "$app/navigation";
    import {api_url} from "$lib/end-point.js";
    import {onMount} from "svelte";

    export  let data;

    let idActivity = data.id;
    let activityData = data.response,
        image = data.response.image,
        desc = data.response.desc,
        title = data.response.title,
        type = data.response.type,
        startDate = data.response.startDate,
        endDate = data.response.endDate,
        tasks = data.response.tasks;

    let userId =data.user.userId ;


    // get data activity
    // async function getActivity() {
    //     const response = await fetch(
    //         api_url + "/api/activities/" + idActivity
    //     );
    //
    //     if (!response.ok) {
    //         alert(response.statusText);
    //     }
    //     const data = await response.json();
    //     activityData = data;
    //     desc = activityData.desc;
    //
    //     image = activityData.image;
    //     title = activityData.title;
    //     type = activityData.type;
    //     tasks = activityData.tasks;
    //     tasks.sort(function (a, b) {
    //         // @ts-ignore
    //         return new Date(a.date) - new Date(b.date);
    //     });
    //     startDate = new Date(activityData.startDate).toLocaleDateString("id");
    //     if (activityData.endDate) {
    //         endDate = new Date(activityData.endDate).toLocaleDateString("id");
    //     }
    //
    //
    // }


    onMount(()=>{
        taskArray  = Object.values(tasks)
        console.log(taskArray)

        // getActivity();
    })

    // delete activity
    async function deleteActivity() {
        const response = await fetch(
            api_url + "/api/activities/" + idActivity,
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
            goto("/activities");
        }

        const data = await response.json();
    }
</script>

{#if activityData}
    <main class="md:mx-10 mx-4">
        <div class="md:container md:mx-auto my-5 md:my-16">
            <div class="flex mb-6 items-center">
                {#if image}
                    <img
                            class="h-16 w-16 object-cover rounded-full mr-4"
                            src={image}
                            alt=""
                    />
                {/if}
                <div class="">
                    <div>
                        <div class="font-bold text-xl leading-tight">
                            {title}
                        </div>
                        <div class="text-sm">
                            {type == "academic" ? "Academic" : "Non Academic"}
                        </div>
                        {#if endDate}
                            <div class="text-sm">
                                {startDate} - {endDate}
                            </div>
                        {:else}
                            <div class="text-sm">
                                {startDate} - Present
                            </div>
                        {/if}
                    </div>
                </div>
                <div class="flex-auto" />
                {#if userId == activityData.userId}
                    <div>
                        <a
                                href="/activity/{idActivity}/add-task"
                                type="button"
                                class="focus:outline-none text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5"
                        >Add Task</a
                        >

                        <a
                                href="/activity/edit/{idActivity}"
                                type="button"
                                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 "
                        >edt<iconify-icon icon="material-symbols:edit" /></a
                        >
                        <button
                                on:click={deleteActivity}
                                type="button"
                                class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 "
                        >del<iconify-icon icon="material-symbols:delete-outline" /></button
                        >
                    </div>
                {/if}
            </div>

            <div>
                <MarkdownViewer value="{desc}" --color-markdown-viewer-bg="theme(colors.white)"/>

                <div class="border border-r-0 border-l-0 border-b-0 mt-6">
                    {#if tasks}
                        {#each tasks as task}
                            <a href={`/activity/${activityData._id}/task/${task._id}`}

                                    class="hover:underline w-full"
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
                            </a>
                        {/each}
                    {/if}
                </div>
            </div>
        </div>
    </main>
{/if}

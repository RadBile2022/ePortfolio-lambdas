<script>
    import { Checkbox } from "flowbite-svelte";
    import AssigneSelect from "$lib/components/AssigneSelect.svelte";
    import AvatarStack from "$lib/components/AvatarStack.svelte";
    import {api_url} from "$lib/end-point.js";
    import {goto} from "$app/navigation";

    export let data;
    let userId = data.user.userId;
    let idProject=data.id;
    let idRoadmap=data.roadmap_id;
    let idTaskRoadmap=data.task_id;
    let idTodo= data.todo_id;
    console.log(idTodo)

    const today = new Date().toLocaleDateString("en-CA");


    let desc,
        date,
        title,
        report,
        projectData,
        startDateRoadmap,
        endDateRoadmap,
        participants = [],
        tasks = [],
        indexTask,
        images = [],
        roadmap,
        indexRoadmap,
        roadmaps = [],
        todos = [],
        todo,
        indexTodo,
        done = false,
        assigne = userId,
        assignee = [];
    // get data project
    async function getProject() {
        const response = await fetch(
            api_url + "/api/projects/" + idProject
        );

        if (!response.ok) {
            alert(response.statusText);
        }
        const data = await response.json();
        projectData = data;
        participants = projectData.participants;
        roadmaps = projectData.roadmaps;
        roadmaps.forEach((element, i) => {
            if (element._id == idRoadmap) {
                indexRoadmap = i;
                roadmap = element;
                tasks = roadmap.tasks;
                startDateRoadmap = new Date(element.startDate).toLocaleDateString(
                    "en-CA"
                );
                endDateRoadmap = new Date(element.endDate).toLocaleDateString("en-CA");
                tasks = roadmap.tasks;
                tasks.forEach((elementTask, i) => {
                    if (elementTask._id == idTaskRoadmap) {
                        indexTask = i;
                        date = new Date(elementTask.date).toLocaleDateString("en-CA");
                        desc = elementTask.desc;
                        images = elementTask.images;
                        todos = elementTask.todos;
                        todos.forEach((elementTodo, i) => {
                            if (elementTodo._id == idTodo) {
                                indexTodo = i;
                                todo = elementTodo;
                                title = elementTodo.title;
                                done = elementTodo.done;
                                report = elementTodo.report;
                                assignee = elementTodo.assignee;
                            }
                        });
                    }
                });
            }
        });
    }

    getProject();

    // update todo
    async function updateTodo() {
        var t2 = new Date().getTime();
        var t1 = new Date(date).getTime();

        if (done && Math.floor((t2 - t1) / (24 * 3600 * 1000)) < 0) {
            done = false;
            alert("Couldn't complete the to do before the due date");
        } else {
            todos[indexTodo].title = title;
            todos[indexTodo].done = done;
            todos[indexTodo].report = report;
            todos[indexTodo].assignee = assignee;

            const response = await fetch(
                api_url + "/api/projects/" + idProject,
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
                window.location.href = `/project/${idProject}/roadmap/${idRoadmap}/task/${idTaskRoadmap}`;
            }
        }
    }
    const addAssignee = () => {
        if (assigne) {
            if (assignee.indexOf(assigne) !== -1) {
                // alert(assigne + " sudah ada");
            } else {
                assignee.push(assigne);
                assignee = assignee;
                assigne = "";
            }
        } else {
            alert("You didn't choose anything.");
        }
    };

    // remove indexed value
    const handleRemove = (index) => {
        assignee = [
            ...assignee.slice(0, index),
            ...assignee.slice(index + 1, assignee.length),
        ];
    };
</script>

<main class="md:mx-32 mx-4">
    <div class="md:container md:mx-auto my-5 md:my-16">
        <form on:submit|preventDefault={updateTodo}>
            <div class="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
                <h2 class="text-xl font-bold text-gray-900 dark:text-white">
                    Edit To Do
                </h2>
                <div class="sm:col-span-2">
                    <label
                            for="title"
                            class="block mb-2 font-medium text-gray-900 dark:text-white"
                    >Title*</label
                    >
                    <input
                            bind:value={title}
                            type="title"
                            id="title"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required
                    />
                </div>
                <div class="sm:col-span-2">
                    <Checkbox bind:checked={done}>Done</Checkbox>
                </div>
                <div class="sm:col-span-2">
                    <label
                            for="report"
                            class="block mb-2 font-medium text-gray-900 dark:text-white"
                    >Report</label
                    >
                    <textarea
                            bind:value={report}
                            id="report"
                            class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    />
                </div>
                <div class="sm:col-span-2">
                    <label
                            for="assigne"
                            class="block mb-2 font-medium text-gray-900 dark:text-white"
                    >Assigne</label
                    >
                    <div class="flex">
                        <select
                                bind:value={assigne}
                                id="assigne"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block md:w-1/4 w-full p-2.5"
                        >
                            {#if !assignee.includes(userId)}
                                <AssigneSelect {userId} />
                            {/if}
                            {#if participants && participants.length > 0}
                                {#each participants as participant}
                                    {#if !assignee.includes(participant)}
                                        <AssigneSelect userId={participant} />
                                    {/if}
                                {/each}
                            {/if}
                        </select>
                        <button
                                type="button"
                                on:click={addAssignee}
                                class="ml-4 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                        >Add</button
                        >
                    </div>
                    <div class="flex flex-wrap mt-4">
                        {#each assignee as assigne, i}
                            <div
                                    class="inline-flex justify-between items-center text-gray-900 bg-white border border-gray-300 focus:outline-none  focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm py-2.5 mr-3 my-1.5"
                            >
                                <AvatarStack userId={assigne} />
                                <button
                                        on:click={() => handleRemove(i)}
                                        type="button"
                                        class="items-center flex text-red-600 mr-3"
                                >
                                    <iconify-icon icon="material-symbols:close-rounded" />
                                </button>
                            </div>
                        {/each}
                    </div>
                </div>
            </div>
            <div class="flex items-center justify-between">
                <div />
                <div>
                    <button
                            type="submit"
                            class="text-white mr-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Update
                    </button>
                    <button
                            type="button"
                            on:click={() => history.back()}
                            class="text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </form>
    </div>
</main>

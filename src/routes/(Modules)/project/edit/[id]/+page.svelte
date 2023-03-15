<script>
    import MarkdownEditor from "$lib/components/MarkdownEditor.svelte";
    import Datepicker from "$lib/components/Datepicker.svelte";
    import {goto} from "$app/navigation";
    import {api_url} from "$lib/end-point.js";

    export let data;
    let userId =data.user.userId;
    let idProject=data.id;
    let desc,
        visibility,
        startDate,
        endDate,
        title,
        image,
        type,
        projectData,
        dateResult,
        ongoing = true;

    // update data project
    async function update() {
        let response;
        response = await fetch(
            api_url + "/api/projects/" + idProject,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId: projectData.userId,
                    title,
                    image,
                    type,
                    startDate: dateResult.startDate,
                    endDate: dateResult.endDate,
                    desc: desc,
                    isPublic: visibility === "public",
                }),
            }
        );

        if (!response.ok) {
            const data = await response.json();
        } else {
            goto("/project/" + idProject);
        }
    }

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
        desc = projectData.desc;
        title = projectData.title;
        image = projectData.image;
        startDate = projectData.startDate
        if (projectData.endDate) {
            endDate = projectData.endDate;
            ongoing = false;
        }
        projectData.isPublic ? (visibility = "public") : (visibility = "private");
    }

    getProject();

    function checkDiff() {
        if (!startDate) {
            alert("Please select start date first");
            endDate = null;
        } else {
            var t2 = new Date(endDate).getTime();
            var t1 = new Date(startDate).getTime();

            if (Math.floor((t2 - t1) / (24 * 3600 * 1000)) < 0) {
                alert("End date should be greater than start date");
                endDate = null;
            }
        }
    }
</script>

{#if projectData}
    <main class="mx-3 md:mx-10">
        <div class="md:container md:mx-auto my-5 md:my-16">
            <form on:submit|preventDefault={update}>
                <div class="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
                    <h2 class="text-xl font-bold text-gray-900 dark:text-white">
                        Edit project
                    </h2>
                    <div class="sm:col-span-2">
                        <label
                                for="image"
                                class="block mb-2 font-medium text-gray-900 dark:text-white"
                        >Project Image/Icon</label
                        >
                        <input
                                bind:value={image}
                                type="text"
                                id="image"
                                placeholder="Ex: https://www.url.com/path/filename.png"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                        <div class="text-sm mt-2">
                            * You can insert image address from <a
                                class="text-blue-600"
                                target="_blank"
                                rel="noopener noreferrer"
                                href="/album">Album</a
                        >
                        </div>
                    </div>
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
                        <label
                                for="tipe"
                                class="block mb-2 font-medium text-gray-900 dark:text-white"
                        >Type*</label
                        >
                        <select
                                bind:value={type}
                                id="tipe"
                                required
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                            <option value="academic">Academic</option>
                            <option value="non-academic">Non-Academic</option>
                        </select>
                    </div>
                    <div class="sm:col-span-2">
                        <div class="flex items-center">
                            <input
                                    bind:checked={ongoing}
                                    id="ongoing"
                                    type="checkbox"
                                    value=""
                                    class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            />
                            <label
                                    for="ongoing"
                                    class="ml-2 font-medium text-gray-900 dark:text-gray-300"
                            >Project is ongoing</label
                            >
                        </div>
                    </div>
                    <div class="w-full">
                        <label
                                for="startDate"
                                class="block mb-2 font-medium text-gray-900 dark:text-white"
                        >Start Date*</label
                        >
                        <Datepicker {startDate} {endDate} bind:result="{dateResult}" range="{!ongoing}"  />
                    </div>
                    <div class="sm:col-span-2">
                        <label
                                for="description"
                                class="block mb-2 font-medium text-gray-900 dark:text-white"
                        >Description*</label
                        >
                        <MarkdownEditor bind:value={desc}/>
                    </div>
                </div>
                <div class="flex items-center justify-between gap-4 ">
                    <select
                            bind:value={visibility}
                            id="visibility"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block md:w-1/4 w-full p-2.5"
                    >
                        <option selected value="public">Public</option>
                        <option value="private">Private</option>
                    </select>
                    <div class="flex justify-center">
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
{/if}

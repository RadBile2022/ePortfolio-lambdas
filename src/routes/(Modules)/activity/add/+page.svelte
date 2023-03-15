<script>
    import MarkdownEditor from "$lib/components/MarkdownEditor.svelte";
    import Datepicker from "$lib/components/Datepicker.svelte";
    import {goto} from "$app/navigation";
    import {onMount} from "svelte";
    import {api_url} from "$lib/end-point.js";
    export let data;
    let userId = data.user.userId;
    // onMount(()=> {
    //     userId = localStorage.getItem("userId");
    // })

    let image, desc, visibility, startDate, endDate, title, type, resultDate, ongoing;

    // create a post
    async function addActivity() {
        const response = await fetch(api_url + "/api/activities/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId,
                image,
                title,
                type,
                startDate:resultDate.startDate,
                endDate:resultDate.endDate,
                desc,
                isPublic: visibility == "public" ? true : false,
            }),
        });

        if (!response.ok) {
            const data = await response.json();
            console.log(data);
        } else {
            goto("/activities");
        }
    }

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

<main class=" mx-4">
    <div class="md:container md:mx-auto my-5 md:my-16">
        <form on:submit|preventDefault={addActivity}>
            <div class="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
                <h2 class="text-xl font-bold text-gray-900 dark:text-white">
                    Add activity
                </h2>
                <div class="sm:col-span-2">
                    <label
                            for="image"
                            class="block mb-2 font-medium text-gray-900 dark:text-white"
                    >Activity Image/Icon</label
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
                        >Activity is ongoing</label
                        >
                    </div>
                </div>
                <div class="w-full">
                    <label
                            for="startDate"
                            class="block mb-2 font-medium text-gray-900 dark:text-white"
                    >Start Date*</label
                    >
                    <Datepicker {startDate} {endDate} bind:result={resultDate} range="{!ongoing}"/>

                    <!--          <input-->
                    <!--            required-->
                    <!--            bind:value={startDate}-->
                    <!--            type="date"-->
                    <!--            name="startDate"-->
                    <!--            id="startDate"-->
                    <!--            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"-->
                    <!--            placeholder="Your Major"-->
                    <!--          />-->
                </div>
                <!--{#if !ongoing}-->
                <!--  <div class="w-full">-->
                <!--    <label-->
                <!--      for="endDate"-->
                <!--      class="block mb-2 font-medium text-gray-900 dark:text-white"-->
                <!--      >End Date*</label-->
                <!--    >-->
                <!--    <input-->
                <!--      required-->
                <!--      on:change={checkDiff}-->
                <!--      bind:value={endDate}-->
                <!--      min={startDate}-->
                <!--      type="date"-->
                <!--      name="endDate"-->
                <!--      id="endDate"-->
                <!--      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"-->
                <!--      placeholder="Your Major"-->
                <!--    />-->
                <!--  </div>-->
                <!--{/if}-->

                <div class="sm:col-span-2">
                    <label
                            for="description"
                            class="block mb-2 font-medium text-gray-900 dark:text-white"
                    >Description*</label
                    >

                    <MarkdownEditor bind:value={desc}/>

                </div>
            </div>
            <div class="flex items-center justify-between gap-5">
                <select
                        bind:value={visibility}
                        id="visibility"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block md:w-1/4 w-full p-2.5"
                >
                    <option selected value="public">Public</option>
                    <option value="private">Private</option>
                </select>
                <div class="flex justify-between">
                    <button
                            type="submit"
                            class="text-white mr-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Save
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

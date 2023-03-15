<script>
    import MarkdownEditor from "$lib/components/MarkdownEditor.svelte";
    import Datepicker from "$lib/components/Datepicker.svelte";
    import {onMount} from "svelte";
    import {api_url} from "$lib/end-point.js";
    export let data;
     let idActivity = data.id;

    const today = new Date().toLocaleDateString("en-CA");

    let userId=data.user.userId;

    let desc,
        date,
        title,
        activityData,
        startDateActivity,
        endDateActivity,
        tasks = [],
        imgurl,
        caption,
        resultDate,
        images = [];

    // get data activity
    async function getActivity() {
        const response = await fetch(
            api_url + "/api/activities/" + idActivity
        );

        if (!response.ok) {
            alert(response.statusText);
        }
        const data = await response.json();
        activityData = data;
        startDateActivity = new Date(activityData.startDate).toLocaleDateString(
            "en-CA"
        );
        if (activityData.endDate) {
            endDateActivity = new Date(activityData.endDate).toLocaleDateString(
                "en-CA"
            );
        }
        tasks = activityData.tasks;
    }
    onMount(()=>{

        getActivity();
    })

    // add task
    async function addTask() {
        let newtask = {
            title,
            date : resultDate.startDate,
            desc,
            images,
        };

        tasks.splice(0, 0, newtask);

        const response = await fetch(
            api_url + "/api/activities/" + idActivity,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId: userId,
                    tasks,
                }),
            }
        );

        if (!response.ok) {
            alert(response.statusText);
        } else {
            const data = await response.json();
            window.location.href = "/activity/" + idActivity;
        }
    }

    const addImage = () => {
        if (imgurl) {
            if (images.indexOf(imgurl) !== -1) {
                alert(imgurl + " sudah ada");
            } else {
                let imagesLength = images.length;
                images.push({ id: imagesLength, name: caption ? caption : "", imgurl });
                images = images;
                imgurl = "";
                caption = "";
            }
        } else {
            alert("You didn't type anything.");
        }
    };

    // remove indexed value
    const handleRemove = (index) => {
        images = [
            ...images.slice(0, index),
            ...images.slice(index + 1, images.length),
        ];
    };
</script>

<main class=" mx-4">
    <div class="md:container md:mx-auto my-5 md:my-16">
        <form on:submit|preventDefault={addTask}>
            <div class="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
                <h2 class="text-xl font-bold text-gray-900 dark:text-white">
                    Add Task
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
                <div class="w-full">
                    <label
                            for="date"
                            class="block mb-2 font-medium text-gray-900 dark:text-white"
                    >Date*</label
                    >

                    <Datepicker startDate="{startDateActivity}" endDate="{endDateActivity}"  maxDate="{endDateActivity}"  bind:result="{resultDate}"   />

                    <!--{#if endDateActivity}-->
                    <!--  <input-->
                    <!--    required-->
                    <!--    bind:value={date}-->
                    <!--    max={endDateActivity}-->
                    <!--    min={startDateActivity}-->
                    <!--    type="date"-->
                    <!--    name="date"-->
                    <!--    id="date"-->
                    <!--    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"-->
                    <!--    placeholder="Your Major"-->
                    <!--  />-->
                    <!--{:else}-->
                    <!--  <input-->
                    <!--    required-->
                    <!--    bind:value={date}-->
                    <!--    max={today}-->
                    <!--    min={startDateActivity}-->
                    <!--    type="date"-->
                    <!--    name="date"-->
                    <!--    id="date"-->
                    <!--    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"-->
                    <!--    placeholder="Your Major"-->
                    <!--  />-->
                    <!--{/if}-->
                </div>

                <div class="sm:col-span-2">
                    <label
                            for="description"
                            class="block mb-2 font-medium text-gray-900 dark:text-white"
                    >Description</label
                    >
                    <MarkdownEditor bind:value={desc}/>
                    <!--          <textarea-->
                    <!--            bind:value={desc}-->
                    <!--            id="description"-->
                    <!--            rows="8"-->
                    <!--            class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"-->
                    <!--          />-->
                    <!--          <div class="mt-1 text-sm">-->
                    <!--            *-->
                    <!--            <a-->
                    <!--              class="text-blue-600"-->
                    <!--              target="_blank"-->
                    <!--              rel="noopener noreferrer"-->
                    <!--              href="https://www.markdownguide.org/basic-syntax/">Markdown</a-->
                    <!--            > is supported-->
                    <!--          </div>-->
                </div>

                <div class="sm:col-span-2">
                    <label
                            for="image-url"
                            class="block mb-2 font-medium text-gray-900 dark:text-white"
                    >{images.length > 1 ? "Images" : "Image"}</label
                    >
                    <div class="">
                        <input
                                bind:value={imgurl}
                                type="text"
                                id="image-url"
                                placeholder="URL: https://www.url.com/path/filename.png"
                                class="bg-gray-50 mr-4 mb-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                        <input
                                bind:value={caption}
                                type="text"
                                id="caption"
                                placeholder="Caption: First Task"
                                class="bg-gray-50 mr-4 mb-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                        <button
                                type="button"
                                on:click={addImage}
                                class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                        >Add</button
                        >
                    </div>
                    <div class="text-sm mt-2">
                        * You can insert image address from <a
                            class="text-blue-600"
                            target="_blank"
                            rel="noopener noreferrer"
                            href="/album">Album</a
                    >
                    </div>
                    <div class=" flex flex-wrap mt-4 gap-2">
                        {#each images as image, i}
                            <div>
                                <div class="relative group/item opacity-75 hover:opacity-100">
                                    <!-- svelte-ignore a11y-img-redundant-alt -->
                                    <img
                                            src={image.imgurl}
                                            alt="image"
                                            class="inset-0 h-36 w-48 object-cover object-center rounded border cursor-pointer"
                                    />
                                    <button
                                            type="button"
                                            on:click={() => handleRemove(i)}
                                            class="group/edit invisible group-hover/item:visible absolute top-2 right-2 bg-white p-1 rounded-lg flex items-center"
                                    ><iconify-icon
                                            icon="material-symbols:close-rounded"
                                    /></button
                                    >
                                </div>
                                <div class="w-48 text-sm">{image.name}</div>
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
                        Add
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

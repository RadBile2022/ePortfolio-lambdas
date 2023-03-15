
<script>
    import {goto} from "$app/navigation";
    import {api_url} from "$lib/end-point.js";
    const today = new Date().toLocaleDateString("en-CA");

    let title,
        issuer,
        desc,
        url,
        earnedDate,
        imgBadge,
        skill,
        skills = [];
    export let data;
    let userId = data.user.userId;

    // create a badge
    async function addBadge() {
        const response = await fetch(api_url + "/api/badges/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId: userId,
                title,
                imgBadge,
                issuer,
                desc,
                url,
                earnedDate,
                skills,
            }),
        });

        if (!response.ok) {
            alert(response.statusText);
        } else {
            goto("/badges");
        }
        const data = await response.json();
    }

    const addSkill = () => {
        if (skill) {
            // if (skill.indexOf(" ") >= 0) {
            //   alert("The skill can't contain spaces");
            // } else
            if (skills.indexOf(skill) !== -1) {
                alert(skill + " sudah ada");
            } else {
                skills.push(skill);
                skills = skills;
                skill = "";
            }
        } else {
            alert("You didn't type anything.");
        }
    };

    // remove indexed value
    const handleRemove = (index) => {
        skills = [
            ...skills.slice(0, index),
            ...skills.slice(index + 1, skills.length),
        ];
    };
</script>

<section class="flex justify-center">
    <div class="py-8 px-4 md:w-1/2 lg:py-8">
        <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">
            Add a new badge
        </h2>
        <form
                action="#"
                on:submit|preventDefault={addBadge}
                enctype="multipart/form-data"
        >
            <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
                <div class="sm:col-span-2">
                    <label
                            for="image"
                            class="block mb-2 font-medium text-gray-900 dark:text-white"
                    >Badge Image/Icon*</label
                    >
                    <input
                            bind:value={imgBadge}
                            required
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
                            required
                            type="text"
                            id="title"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                </div>
                <div class="sm:col-span-2">
                    <label
                            for="issuer"
                            class="block mb-2 font-medium text-gray-900 dark:text-white"
                    >Issuing Organization*</label
                    >
                    <input
                            bind:value={issuer}
                            required
                            type="text"
                            id="issuer"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                </div>
                <div class="sm:col-span-2">
                    <label
                            for="url"
                            class="block mb-2 font-medium text-gray-900 dark:text-white"
                    >URL</label
                    >
                    <input
                            bind:value={url}
                            type="text"
                            id="url"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                </div>
                <div class="w-full">
                    <label
                            for="startDate"
                            class="block mb-2 font-medium text-gray-900 dark:text-white"
                    >Earned Date*</label
                    >
                    <input
                            bind:value={earnedDate}
                            type="date"
                            name="startDate"
                            id="startDate"
                            max={today}
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Your Major"
                            required
                    />
                </div>
                <div class="sm:col-span-2">
                    <label
                            for="description"
                            class="block mb-2 font-medium text-gray-900 dark:text-white"
                    >
                        Description*</label
                    >
                    <textarea
                            bind:value={desc}
                            required
                            id="description"
                            rows="8"
                            class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    />
                </div>
            </div>
            <div class="mt-1 text-sm">
                *
                <a
                        class="text-blue-600"
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://www.markdownguide.org/basic-syntax/">Markdown</a
                > is supported
            </div>
            <div class="mt-4">
                <label
                        for="skills"
                        class="block mb-2 font-medium text-gray-900 dark:text-white"
                >Skills</label
                >
                <div class="flex">
                    <input
                            bind:value={skill}
                            type="text"
                            id="skills"
                            class="bg-gray-50 mr-4 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                    <button
                            type="button"
                            on:click={addSkill}
                            class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    >Add</button
                    >
                </div>
                <div class=" flex flex-wrap mt-4">
                    {#each skills as skill, i}
                        <div
                                class="inline-flex justify-between items-center text-gray-900 bg-white border border-gray-300 focus:outline-none  focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm py-2.5 mr-3 my-1.5"
                        >
                            <div class="ml-4 mr-2">{skill}</div>
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
            <div class="flex justify-between items-center mt-4 space-x-2">
                <div />

                <div class="flex justify-end items-center space-x-2">
                    <button
                            type="submit"
                            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                    >Add</button
                    >
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
</section>

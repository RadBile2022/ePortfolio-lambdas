<script>
   import {goto} from "$app/navigation";
   import {api_url} from "$lib/end-point.js";
   import {onMount} from "svelte";

   export let data;
   let userId = data.user.userId;

    let userData, ig, linkedin, twitter, github, facebook;

    // get data user
    async function getUser() {
        const response = await fetch(
            api_url + "/api/users/" + userId,
            {
                method: "GET",
            }
        );

        if (!response.ok) {
            goto("/login");
            localStorage.clear();
        }

        const data = await response.json();
        userData = data;
        let socmed = userData.socialMedia;
        ig = socmed.instagram;
        linkedin = socmed.linkedin;
        twitter = socmed.twitter;
        github = socmed.github;
        facebook = socmed.facebook;
    }
       getUser();

    // update data user
    async function update() {
        let response;

        response = await fetch(api_url + "/api/users/" + userId, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId: userId,
                socialMedia: {
                    instagram: ig,
                    linkedin: linkedin,
                    twitter: twitter,
                    github: github,
                    facebook: facebook,
                },
            }),
        });

        if (!response.ok) {
            alert(response.statusText);
            console.log(response.status);
            console.log(response.statusText);
        }

        const data = await response.json();
        document.location.href = "/profile";
    }
</script>

{#if userData}
    <div class="w-full md:w-3/5 px-4 py-8 mx-auto lg:py-16">
        <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">
            Edit Social Media
        </h2>
        <div class="mb-6">
            <label
                    for="linkedin-icon"
                    class="block mb-2 font-medium text-gray-900 dark:text-white"
            >LinkedIn</label
            >
            <div class="relative">
                <div
                        class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"
                >
                    <iconify-icon icon="akar-icons:linkedin-fill" class="" />
                </div>
                <input
                        bind:value={linkedin}
                        type="text"
                        id="linkedin-icon"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Your LinkedIn URL"
                />
            </div>
        </div>
        <div class="mb-6">
            <label
                    for="github-icon"
                    class="block mb-2 font-medium text-gray-900 dark:text-white"
            >Github</label
            >
            <div class="relative">
                <div
                        class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"
                >
                    <iconify-icon icon="akar-icons:github-fill" class="" />
                </div>
                <input
                        bind:value={github}
                        type="text"
                        id="github-icon"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Your Github URL"
                />
            </div>
        </div>
        <div class="mb-6">
            <label
                    for="instagram-icon"
                    class="block mb-2 font-medium text-gray-900 dark:text-white"
            >Instagram</label
            >
            <div class="relative">
                <div
                        class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"
                >
                    <iconify-icon icon="akar-icons:instagram-fill" class="" />
                </div>
                <input
                        bind:value={ig}
                        type="text"
                        id="instagram-icon"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Your Instagram URL"
                />
            </div>
        </div>
        <div class="mb-6">
            <label
                    for="twitter-icon"
                    class="block mb-2 font-medium text-gray-900 dark:text-white"
            >Twitter</label
            >
            <div class="relative">
                <div
                        class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"
                >
                    <iconify-icon icon="akar-icons:twitter-fill" class="" />
                </div>
                <input
                        bind:value={twitter}
                        type="text"
                        id="twitter-icon"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Your Twitter URL"
                />
            </div>
        </div>
        <div class="mb-6">
            <label
                    for="facebook-icon"
                    class="block mb-2 font-medium text-gray-900 dark:text-white"
            >Facebook</label
            >
            <div class="relative">
                <div
                        class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"
                >
                    <iconify-icon icon="akar-icons:facebook-fill" class="" />
                </div>
                <input
                        bind:value={facebook}
                        type="text"
                        id="facebook-icon"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Your Facebook URL"
                />
            </div>
        </div>
        <div class="flex justify-end items-center mt-4 space-x-2">
            <button
                    on:click={update}
                    type="button"
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
            >Update</button
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
{/if}

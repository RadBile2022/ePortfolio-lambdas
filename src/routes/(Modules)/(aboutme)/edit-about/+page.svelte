<script>
    import MarkdownEditor from "$lib/components/MarkdownEditor.svelte";
    import {api_url} from "$lib/end-point.js";
    import {onMount} from "svelte";

    export let data;
    let userId = data.user.userId;

    let userData, about;

    // get data user
    async function getUser() {
        const response = await fetch(
            api_url + "/api/users/" + userId,
            {
                method: "GET",
            }
        );

        if (!response.ok) {
            document.location.href = "/login";
            localStorage.clear();
        }

        const data = await response.json();
        userData = data;
        about = userData.about;

    }
 onMount(()=>{
     getUser();
 })

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
                about: about,
            }),
        });

        if (!response.ok) {
            alert(response.statusText);
            console.log(response.status);
            console.log(response.statusText);
        }

        const data = await response.json();
        document.location.href = "/profile";

        console.log(about)

    }
</script>

{#if userData}
    <section class="flex">
        <div class="py-8 px-4  lg:py-8 flex-1">
            <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                Edit About Me
            </h2>

            <MarkdownEditor bind:value="{about}"/>

            <!--      <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">-->
            <!--        <div class="sm:col-span-2">-->
            <!--          <textarea-->
            <!--            bind:value={about}-->
            <!--            [id]="description"-->
            <!--            rows="18"-->
            <!--            class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"-->
            <!--          />-->
            <!--        </div>-->
            <!--      </div>-->
            <!--      <div class="mt-1 text-sm">-->
            <!--        *-->
            <!--        <a-->
            <!--          class="text-blue-600"-->
            <!--          target="_blank"-->
            <!--          rel="noopener noreferrer"-->
            <!--          href="https://www.markdownguide.org/basic-syntax/">Markdown</a-->
            <!--        > is supported-->
            <!--      </div>-->
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
        <!--    <div class="py-8 px-4 w-1/2 lg:py-8">-->
        <!--      <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">-->
        <!--        Preview-->
        <!--      </h2>-->
        <!--      <div-->
        <!--        class=" text-sm max-w-none p-4 border-2 border-gray-100 rounded h-96 overflow-auto"-->
        <!--      >-->
        <!--        <SvelteMarkdown source={about} />-->
        <!--      </div>-->
        <!--    </div>-->
    </section>
{/if}

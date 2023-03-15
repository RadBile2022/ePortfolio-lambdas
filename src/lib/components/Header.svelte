<script>
    import {goto} from "$app/navigation";
    import { Dropdown, DropdownItem, Avatar } from "flowbite-svelte";
    import NotificationCard from "./NotificationCard.svelte";
    import NotificationWarningTaskCard from "./NotificationWarningTaskCard.svelte";
    import {onMount} from "svelte";
    import {api_url} from "$lib/end-point.js";

    export let active;
    export let userId;
    let home,
        discovery,
        profile,
        request = [],
        projects = [],
        taskWarning = [];

    // get userId from localStorage
    // let userId;
    let isClient = false;

    // get data user
    async function getUser() {
        const response = await fetch(
            api_url + "/api/users/" + userId,
            {
                method: "GET",
            }
        );

        if (!response.ok && isClient) {
            goto("/login");
            localStorage.clear();
        }

        // const data = await response.json();
        // if (!data.gender) {
        //     home.classList.add("hidden");
        //     discovery.classList.add("hidden");
        //     profile.classList.add("hidden");
        // }
        getAllRequest();
        getprojects();
    }
    onMount(()=>{
        // userId = localStorage.getItem("userId");
        isClient = true;
        getUser();
    });

    // get [search] request projects
       async function getAllRequest() {
           let response = await fetch(
               api_url + "/api/projects/allrequest/" + userId
           );
           const data = await response.json();
           request = data;
       }


    // get [search] user projects
        async function getprojects() {
            let response = await fetch(
                api_url + "/api/projects/all/" + userId
            );
            const data = await response.json();
            projects = data;

            projects.forEach((project) => {
                project.roadmaps.forEach((roadmap) => {
                    roadmap.tasks.forEach((task) => {
                        var t2 = new Date().getTime();
                        var t1 = new Date(task.date).getTime();
                        if (t1 >= t2 && t2 > t1 - 1000 * 60 * 60 * 24 * 7) {
                            let taskItem = {
                                title: task.title,
                                projectId: project._id,
                                roadmapId: roadmap._id,
                                taskId: task._id,
                            };

                            taskWarning.push(taskItem);
                        }
                    });
                });
            });
        }

    // logout

    const logout = async () => {
        await fetch(api_url + "/api/auth/logout", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
        });

        // clear localStorage
        localStorage.clear();
        if (isClient){
            goto("/login");
        }
    };
</script>

<nav class="bg-gray-300 border-gray-200 px-2 sm:px-4 py-2.5 rounded ">
    <div class="container flex flex-wrap justify-between items-center mx-auto">
        <a href="/" class="flex items-center">
            <!-- <img
              src="https://flowbite.com/docs/images/logo.svg"
              class="mr-3 h-6 sm:h-9"
              alt="Flowbite Logo"
            /> -->
            <span class="self-center text-xl font-semibold whitespace-nowrap "
            >ePortfolio</span
            >
        </a>
        <button
                data-collapse-toggle="navbar-default"
                type="button"
                class="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "
                aria-controls="navbar-default"
                aria-expanded="false"
        >
            <span class="sr-only">Open main menu</span>
            <svg
                    class="w-6 h-6"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
            ><path
                    fill-rule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clip-rule="evenodd"
            /></svg
            >
        </button>

        <div class="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul
                    class="flex flex-col items-center p-1 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-transparent "
            >
                <li>
                    <a
                            bind:this={home}
                            href="/home"
                            class="{active == 'home'
              ? ' text-white md:text-blue-700 md:px-0 border-b-2 border-b-black bg-blue-700'
              : 'text-gray-700 md:hover:text-blue-700 md:p-0'} block py-2 pr-4 pl-3  md:bg-transparent"
                            aria-current="page">Home</a
                    >
                </li>
                <li>
                    <a
                            bind:this={discovery}
                            href="/discovery"
                            class="{active == 'discovery'
              ? 'text-white md:text-blue-700 md:px-0 border-b-2 border-b-black bg-blue-700'
              : 'text-gray-700 md:hover:text-blue-700 md:p-0'} block py-2 pr-4 pl-3  md:bg-transparent"
                    >Discovery</a
                    >
                </li>
                <li>
                    <a
                            bind:this={profile}
                            href="/profile"
                            class="{active == 'profile'
              ? 'text-white md:text-blue-700 md:px-0 border-b-2 border-b-black bg-blue-700'
              : 'text-gray-700 md:hover:text-blue-700 md:p-0'} block py-2 pr-4 pl-3  md:bg-transparent"
                    >Profile</a
                    >
                </li>
                <li>
                    <div
                            id="bell"
                            class="inline-flex items-center text-sm font-medium text-center text-gray-500 hover:text-gray-900 focus:outline-none dark:hover:text-white dark:text-gray-400"
                    >
                        <svg
                                class="w-6 h-6"
                                aria-hidden="true"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                        ><path
                                d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"
                        /></svg
                        >
                        <div class="flex relative">
                            {#if request && request.length > 0}
                                <div
                                        class="inline-flex relative -top-2 right-3 w-3 h-3 bg-red-500 rounded-full border-2 border-white dark:border-gray-900"
                                />
                            {/if}
                        </div>
                    </div>
                    {#if request && request.length > 0}
                        <Dropdown
                                triggeredBy="#bell"
                                class="w-full max-w-sm rounded divide-y divide-gray-100 shadow dark:bg-gray-800 dark:divide-gray-700"
                        >
                            <div slot="header" class="py-2 font-bold text-center ">
                                Notifications
                            </div>
                            {#each request as req}
                                <NotificationCard
                                        idProject={req.projectId}
                                        idUser={req.userId}
                                />
                            {/each}
                            {#each taskWarning as task}
                                <NotificationWarningTaskCard {task} />
                            {/each}
                        </Dropdown>
                    {/if}
                </li>
                <!-- BUTTON SIGN OUT -->
                <li>
                    <button
                            on:click={logout}
                            class="text-red-500 ring-1 ring-red-500 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-red-700 md:hover:ring-red-700 inline-flex items-center px-5 py-1.5 md:ml-5"
                    >Sign Out
                        <svg
                                aria-hidden="true"
                                class="ml-2 -mr-1 w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                    fill-rule="evenodd"
                                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                    clip-rule="evenodd"
                            />
                        </svg></button
                    >
                </li>
            </ul>
        </div>
    </div>
</nav>







<!--<script>-->
<!--    export let active;-->
<!--</script>-->


<!--<nav class="bg-gray-300 border-gray-200 px-2 sm:px-4 py-2.5 rounded ">-->
<!--    <div class="container flex flex-wrap justify-between items-center mx-auto">-->
<!--        <a href="/static" class="flex items-center">-->
<!--            <span class="self-center text-xl font-semibold whitespace-nowrap "-->
<!--            >ePortfolio</span-->
<!--            >-->
<!--        </a>-->
<!--        <button-->
<!--                data-collapse-toggle="navbar-default"-->
<!--                type="button"-->
<!--                class="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "-->
<!--                aria-controls="navbar-default"-->
<!--                aria-expanded="false"-->
<!--        >-->
<!--            <span class="sr-only">Open main menu</span>-->
<!--            <svg-->
<!--                    class="w-6 h-6"-->
<!--                    aria-hidden="true"-->
<!--                    fill="currentColor"-->
<!--                    viewBox="0 0 20 20"-->
<!--                    xmlns="http://www.w3.org/2000/svg"-->
<!--            ><path-->
<!--                    fill-rule="evenodd"-->
<!--                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"-->
<!--                    clip-rule="evenodd"-->
<!--            /></svg-->
<!--            >-->
<!--        </button>-->

<!--        <div class="hidden w-full md:block md:w-auto" [id]="navbar-default">-->
<!--            <ul-->
<!--                    class="flex flex-col items-center p-1 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-transparent "-->
<!--            >-->
<!--                <li>-->
<!--                    <a-->

<!--                            href="/home"-->
<!--                            class="{active == 'home'-->
<!--              ? ' text-white md:text-blue-700 md:px-0 border-b-2 border-b-black bg-blue-700'-->
<!--              : 'text-gray-700 md:hover:text-blue-700 md:p-0'} block py-2 pr-4 pl-3  md:bg-transparent"-->
<!--                            aria-current="page">Home</a-->
<!--                    >-->
<!--                </li>-->
<!--                <li>-->
<!--                    <a-->

<!--                            href="/discovery"-->
<!--                            class="{active == 'discovery'-->
<!--              ? 'text-white md:text-blue-700 md:px-0 border-b-2 border-b-black bg-blue-700'-->
<!--              : 'text-gray-700 md:hover:text-blue-700 md:p-0'} block py-2 pr-4 pl-3  md:bg-transparent"-->
<!--                    >Discovery</a-->
<!--                    >-->
<!--                </li>-->
<!--                <li>-->
<!--                    <a-->

<!--                            href="/profile"-->
<!--                            class="{active == 'profile'-->
<!--              ? 'text-white md:text-blue-700 md:px-0 border-b-2 border-b-black bg-blue-700'-->
<!--              : 'text-gray-700 md:hover:text-blue-700 md:p-0'} block py-2 pr-4 pl-3  md:bg-transparent"-->
<!--                    >Profile</a-->
<!--                    >-->
<!--                </li>-->
<!--                <li>-->
<!--                    <div-->
<!--                            [id]="bell"-->
<!--                            class="inline-flex items-center text-sm font-medium text-center text-gray-500 hover:text-gray-900 focus:outline-none dark:hover:text-white dark:text-gray-400"-->
<!--                    >-->
<!--                        <svg-->
<!--                                class="w-6 h-6"-->
<!--                                aria-hidden="true"-->
<!--                                fill="currentColor"-->
<!--                                viewBox="0 0 20 20"-->
<!--                                xmlns="http://www.w3.org/2000/svg"-->
<!--                        ><path-->
<!--                                d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"-->
<!--                        /></svg-->
<!--                        >-->
<!--                        &lt;!&ndash;                        <div class="flex relative">&ndash;&gt;-->
<!--                        &lt;!&ndash;                            {#if request && request.length > 0}&ndash;&gt;-->
<!--                        &lt;!&ndash;                                <div class="inline-flex relative -top-2 right-3 w-3 h-3 bg-red-500 rounded-full border-2 border-white dark:border-gray-900"        />&ndash;&gt;-->
<!--                        &lt;!&ndash;                            {/if}&ndash;&gt;-->
<!--                        &lt;!&ndash;                        </div>&ndash;&gt;-->
<!--                    </div>-->
<!--                    &lt;!&ndash;{#if request && request.length > 0}&ndash;&gt;-->
<!--                    &lt;!&ndash;  <Dropdown&ndash;&gt;-->
<!--                    &lt;!&ndash;    triggeredBy="#bell"&ndash;&gt;-->
<!--                    &lt;!&ndash;    class="w-full max-w-sm rounded divide-y divide-gray-100 shadow dark:bg-gray-800 dark:divide-gray-700"&ndash;&gt;-->
<!--                    &lt;!&ndash;  >&ndash;&gt;-->
<!--                    &lt;!&ndash;    <div slot="header" class="py-2 font-bold text-center ">&ndash;&gt;-->
<!--                    &lt;!&ndash;      Notifications&ndash;&gt;-->
<!--                    &lt;!&ndash;    </div>&ndash;&gt;-->
<!--                    &lt;!&ndash;    {#each request as req}&ndash;&gt;-->
<!--                    &lt;!&ndash;      <NotificationCard&ndash;&gt;-->
<!--                    &lt;!&ndash;        idProject={req.projectId}&ndash;&gt;-->
<!--                    &lt;!&ndash;        idUser={req.userId}&ndash;&gt;-->
<!--                    &lt;!&ndash;      />&ndash;&gt;-->
<!--                    &lt;!&ndash;    {/each}&ndash;&gt;-->
<!--                    &lt;!&ndash;    {#each taskWarning as task}&ndash;&gt;-->
<!--                    &lt;!&ndash;      <NotificationWarningTaskCard {task} />&ndash;&gt;-->
<!--                    &lt;!&ndash;    {/each}&ndash;&gt;-->
<!--                    &lt;!&ndash;  </Dropdown>&ndash;&gt;-->
<!--                    &lt;!&ndash;{/if}&ndash;&gt;-->
<!--                </li>-->
<!--                &lt;!&ndash; BUTTON SIGN OUT &ndash;&gt;-->
<!--                <li>-->
<!--                    <button-->
<!--                            class="text-red-500 ring-1 ring-red-500 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-red-700 md:hover:ring-red-700 inline-flex items-center px-5 py-1.5 md:ml-5"-->
<!--                    >Sign Out-->
<!--                        <svg-->
<!--                                aria-hidden="true"-->
<!--                                class="ml-2 -mr-1 w-5 h-5"-->
<!--                                fill="currentColor"-->
<!--                                viewBox="0 0 20 20"-->
<!--                                xmlns="http://www.w3.org/2000/svg"-->
<!--                        >-->
<!--                            <path-->
<!--                                    fill-rule="evenodd"-->
<!--                                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"-->
<!--                                    clip-rule="evenodd"-->
<!--                            />-->
<!--                        </svg></button-->
<!--                    >-->
<!--                </li>-->
<!--            </ul>-->
<!--        </div>-->
<!--    </div>-->
<!--</nav>-->

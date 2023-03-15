<script>
    import ActivityCard from "$lib/components/ActivityCard.svelte";
    import ArticleCardDiscovery from "$lib/components/ArticleCardDiscovery.svelte";
    import DiscoveryCard from "$lib/components/DiscoveryCard.svelte";
    import PeopleCardDiscovery from "$lib/components/PeopleCardDiscovery.svelte";
    import PostCardDiscovery from "$lib/components/PostCardDiscovery.svelte";
    import ProjectCard from "$lib/components/ProjectCard.svelte";
    import {api_url} from "$lib/end-point.js";
    import {page} from '$app/stores';
    import {goto} from "$app/navigation";

    export let data;
    let userIdLocal = data.user.userId;

    let posts = [],
        articles = [],
        activities = [],
        projects = [],
        searchKeyword,
        usersId = [],
        allUsersId = [];
    const urlParams = $page.url.searchParams;
    if (!urlParams.get("search")) {
        getAllUsers();
    }
    searchKeyword = urlParams.get("search");

    if (searchKeyword) {
            getUsers();
            getArticles();
            getPosts();
            getActivities();
            getProjects();
    }

    // get [search] posts
    async function getPosts() {
        let response = await fetch(
            api_url + `/api/posts/search/${searchKeyword}`
        );

        if (!response.ok) {
            alert(response.status);
        }

        const data = await response.json();
        let temp = data;
        temp.forEach((element) => {
            // filter private post
            if (element.isPublic == false && element.userId != userIdLocal) {
            } else {
                posts.push(element);
                posts = posts;

            }
        });
    }

    // get articles
    async function getArticles() {
        let response = await fetch(
            api_url + `/api/articles/search/${searchKeyword}`
        );

        if (!response.ok) {
            // alert(response.status);
            console.log(response.status);
        }

        const data = await response.json();
        let temp = data;
        temp.forEach((element) => {
            // filter private article
            if (element.isPublic == false && element.userId != userIdLocal) {
            } else {
                articles.push(element);
                articles = articles;
            }
        });
    }

    // get activities
    async function getActivities() {
        let response = await fetch(
            api_url + `/api/activities/search/${searchKeyword}`
        );

        if (!response.ok) {
            // alert(response.status);
            console.log(response.status);
        }

        const data = await response.json();
        let temp = data;
        temp.forEach((element) => {
            // filter private activity
            if (element.isPublic == false && element.userId != userIdLocal) {
            } else {
                activities.push(element);
                activities = activities;
            }
        });
    }

    // get activities
    async function getProjects() {
        let response = await fetch(
            `${api_url}/api/projects/search/${searchKeyword}`
        );

        if (!response.ok) {
            // alert(response.status);
            console.log(response.status);
        }

        const data = await response.json();
        let temp = data;
        temp.forEach((element) => {
            // filter private project
            if (element.isPublic == false && element.userId != userIdLocal) {
            } else {
                projects.push(element);
                projects = projects;
            }
        });
    }

    // get users
    async function getUsers() {
        const response = await fetch(
            api_url + `/api/users/search/${userIdLocal}/${searchKeyword}`
        );

        if (!response.ok) {
            console.log(response.status);
        }

        const data = await response.json();
        usersId = data;
    }

    // get [search] users
    async function getAllUsers() {
        const response = await fetch(
            api_url + `/api/users/all/${userIdLocal}`
        );

        if (!response.ok) {
            console.log(response.status);
        }

        const data = await response.json();
        allUsersId = data;
    }
</script>

<main class="mx-4 md:mx-20 2xl:mx-60">
    <section>
        <div class="md:container md:mx-auto mt-8">
            <h1 class="text-xl md:text-3xl font-bold text-center">
                Discover People, Article, Or Activity
            </h1>
            <form>
                <input
                        bind:value={searchKeyword}
                        type="search"
                        name="search"
                        class="w-full mt-4 md:mt-8 text-center  text-gray-700 bg-white border-2 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                        placeholder="Search..."
                />
            </form>
        </div>
    </section>

    <section>
        <div class=" md:mx-auto my-8">


            <div class="">
                <div class="">
                    {#if posts.length > 0}
                        <div class="rounded-lg bg-gray-100 mb-14">
                            <h2 class="text-3xl font-bold px-6 pt-6">Posts</h2>
                            {#each posts as post, i}
                                {#if i < 3}
                                    <p>{JSON.stringify(post)}</p>
                                    <PostCardDiscovery {post} userId="{userIdLocal}"/>
                                    <hr class="h-1 bg-gray-300" />
                                {/if}
                            {/each}
                            <button
                                    type="button"
                                    on:click={() =>
                 goto (`discovery/${searchKeyword}/post-all`)}
                                    class="py-3 px-5 w-full text-base font-medium text-center bg-gray-100 rounded-b-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-200"
                            >See all post results</button
                            >
                        </div>
                    {/if}

                    <!-- articles -->
                    {#if articles.length > 0}
                        <div class="rounded-lg bg-gray-100 mb-14">
                            <h2 class="text-3xl font-bold px-6 pt-6">Articles</h2>
                            {#each articles as article, i}
                                {#if i < 3}
                                    <ArticleCardDiscovery {article} />
                                    <hr class="h-1 bg-gray-300" />
                                {/if}
                            {/each}
                            <button
                                    type="button"
                                    on:click={() =>
                 goto(`discovery/${searchKeyword}/article-all` )}
                                    class="py-3 px-5 w-full text-base font-medium text-center bg-gray-100 rounded-b-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-200"
                            >See all article results</button
                            >
                        </div>
                    {/if}

                    <!-- activities -->
                    {#if activities.length > 0}
                        <div class="rounded-lg bg-gray-100 mb-14">
                            <h2 class="text-3xl font-bold px-6 pt-6 mb-2">Activities</h2>
                            {#each activities as activity, i}
                                {#if i < 3}
                                    <ActivityCard {activity} />
                                    <hr class="h-1 bg-gray-300" />
                                {/if}
                            {/each}
                            <button
                                    type="button"  on:click={() => goto(`discovery/${searchKeyword}/activity-all`)}
                                    class="py-3 px-5 w-full text-base font-medium text-center bg-gray-100 rounded-b-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-200"
                            >
                                See all activity results
                            </button>
                        </div>
                    {/if}

                    <!-- projects -->
                    {#if projects.length > 0}
                        <div class="rounded-lg bg-gray-100 mb-14">
                            <h2 class="text-3xl font-bold px-6 pt-6 mb-2">Projects</h2>
                            {#each projects as project, i}
                                {#if i < 3}
                                    <ProjectCard userId={userIdLocal} {project} />
                                    <hr class="h-1 bg-gray-300" />
                                {/if}
                            {/each}
                            <button
                                    type="button"
                                    on:click={() =>
                  goto(`discovery/${searchKeyword}/project-all`)}
                                    class="py-3 px-5 w-full text-base font-medium text-center bg-gray-100 rounded-b-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-200"
                            >See all project results</button
                            >
                        </div>
                    {/if}

                    <!-- users -->
                    {#if usersId.length > 0}
                        <div class="rounded-lg bg-gray-100">
                            <h2 class="text-3xl font-bold px-6 pt-6">People</h2>
                            {#each usersId as userId, i}
                                {#if i < 3 && userIdLocal != userId}
                                    <PeopleCardDiscovery {userId} {userIdLocal}/>
                                    <hr class="h-1 bg-gray-300" />
                                {/if}
                            {/each}

                            <button
                                    type="button"
                                    on:click={() =>
                  goto(  `discovery/${searchKeyword}/people-all` )}
                                    class="py-3 px-5 w-full text-base font-medium text-center bg-gray-100 rounded-b-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-200"
                            >See all people results</button
                            >
                        </div>
                    {/if}
                </div>
            </div>

            <!--      perbaiki-->
            {#if !urlParams.get("search") && allUsersId.length > 0}
                <div class="grid grid-cols-1 gap-6 md:grid-cols-3 sm:grid-cols-2 ">
                    {#each allUsersId as userId, i}
                        {#if userIdLocal != userId}
                            <DiscoveryCard {userId} {userIdLocal} />
                        {/if}
                    {/each}
                </div>
            {/if}
        </div>
    </section>
</main>

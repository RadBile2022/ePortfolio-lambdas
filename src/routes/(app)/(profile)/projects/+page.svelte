<script>
    import { writable } from "svelte/store";
    import { onMount } from "svelte";
    import ProjectCard from "$lib/components/ProjectCard.svelte";
    import {api_url} from "$lib/end-point.js";
    export let data;
    let userId = data.user.userId;
    const projectsStore = writable(null);

    // get [search] user projects
    async function getprojects() {
        let response = await fetch(
            api_url + "/api/projects/all/" + userId
        );
        return response.ok ? await response.json() : null;
    }

    onMount(async () => {
        let projects = await getprojects();
        if (projects) {
            projectsStore.update((data) => projects);
        }
    });
</script>


    <!-- tabs content -->
    <a
            href="/project/create"
            class="w-full mb-8 bg-blue-700 text-white hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-white font-medium rounded-lg text-sm px-5 py-3 text-center inline-flex items-center justify-center"
    >
        Add new Project
        <iconify-icon class="ml-2" icon="akar-icons:plus" />
    </a>

    {#if $projectsStore}
        {#each $projectsStore as $project}
            <ProjectCard project={$project} {userId}/>
        {/each}
    {/if}
<!--<main class="md:mx-64">-->
<!--  <section>-->
<!--    <div class="md:container md:mx-auto my-16">-->
<!--      <div class="flex">-->
<!--        <ProfileBar active={"projects"} {userId} />-->

<!--        <div class="flex-initial w-3/4">-->
<!--          &lt;!&ndash; tabs &ndash;&gt;-->
<!--          <ProfileTabs active={"projects"} />-->


<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<!--  </section>-->
<!--</main>-->

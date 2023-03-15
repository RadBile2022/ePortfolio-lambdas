<script>
    import {writable} from "svelte/store";
    import {onMount} from "svelte";
    import ProjectCard from "$lib/components/ProjectCard.svelte";
    import {api_url} from "$lib/end-point.js";


    export let data;
    let userId = data.id;
    let userIdLocal = data.user.userId;

    const projectsStore = writable(null);

    let all = [];

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
            projects.forEach((element) => {
                // filter private activitiy
                if (element.isPublic == false && element.userId != userIdLocal) {
                } else {
                    all.push(element);
                    all = all;
                }
                // sorting activitiy
                all.sort(function (a, b) {
                    // @ts-ignore
                    return new Date(b.createdAt) - new Date(a.createdAt);
                });
            });
            projectsStore.update((data) => all);
        }
    });
</script>
<div class="2xl:mx-60">
        <!-- tabs content -->
        {#if $projectsStore}
            {#each $projectsStore as $project}
                <ProjectCard project={$project}/>
            {/each}
        {/if}

</div>



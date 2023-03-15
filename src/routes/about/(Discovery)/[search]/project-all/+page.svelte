<script>
    import ProjectCard from "$lib/components/ProjectCard.svelte";
    import {api_url} from "$lib/end-point.js";

    export let data;
    let projects = [];
    let userIdLocal = data.user.userId;
    let searchKeyword = data.params.search;

    if (searchKeyword) getProjects();

    // get all projects
    async function getProjects() {
        let response = await fetch(
            api_url + `/api/projects/search/${searchKeyword}`
        );

        if (!response.ok) {
            alert(response.status);
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
</script>

<div class="md:container md:mx-auto my-16">
    <div class="flex justify-center">
        <div class="w-full md:mx-32">
            {#if projects.length > 0}
                {#each projects as project}
                    <ProjectCard userId={userIdLocal} {project} />
                {/each}
            {/if}
        </div>
    </div>
</div>

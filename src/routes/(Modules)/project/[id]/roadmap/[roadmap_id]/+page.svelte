<script>
    import MarkdownViewer from "$lib/components/MarkdownViewer.svelte";

    import { Breadcrumb, BreadcrumbItem } from "flowbite-svelte";
    // import AvatarStack from "../../components/AvatarStack.svelte";
    import TaskCard from "$lib/components/TaskCard.svelte";
    import {goto} from "$app/navigation";
    import {api_url} from "$lib/end-point.js";

    export let data;
    let  idProject =data.id;
    let idRoadmap =data.roadmap_id;
    let userId = data.user.userId;

    let projectData,
        image,
        desc,
        title,
        startDate,
        endDate,
        participants = [],
        participated,
        roadmap,
        indexRoadmap,
        roadmaps = [],
        tasks = [],
        assignee = [];

    // get data project
    async function getProject() {
        const response = await fetch(
            api_url + "/api/projects/" + idProject
        );

        if (!response.ok) {
            alert(response.statusText);
        }
        const data = await response.json();
        projectData = data;

        participants = projectData.participants;
        participants.push(projectData.userId);
        if (participants && participants.includes(userId)) {
            participated = true;
        }
        roadmaps = projectData.roadmaps;
        roadmaps.forEach((element, i) => {
            if (element._id == idRoadmap) {
                indexRoadmap = i;
                roadmap = element;
                title = element.title;
                startDate = new Date(element.startDate).toLocaleDateString("en", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                });
                endDate = new Date(element.endDate).toLocaleDateString("en", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                });
                tasks = element.tasks;
                tasks.sort(function (a, b) {
                    // @ts-ignore
                    return new Date(b.date) - new Date(a.date);
                });
                desc = element.desc;
            }
        });
    }

    getProject();

    // delete roadmap
    async function deleteRoadmap() {
        roadmaps = [
            ...roadmaps.slice(0, indexRoadmap),
            ...roadmaps.slice(indexRoadmap + 1, roadmaps.length),
        ];

        const response = await fetch(
            api_url + "/api/projects/" + idProject,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId: projectData.userId,
                    roadmaps,
                }),
            }
        );

        if (!response.ok) {
            const data = await response.json();
            alert(data);
        } else {
            goto(`/project/${idProject}`);
        }
    }
</script>

{#if projectData}
    <main class="md:mx-10 mx-4">
        <div class="md:container md:mx-auto my-5 md:my-16">
            <Breadcrumb navClass={"mb-4"} aria-label="Default breadcrumb example">
                {#if userId == projectData.userId || participated}
                    <BreadcrumbItem href="/projects" home>Projects</BreadcrumbItem>
                {:else}
                    <BreadcrumbItem href="/projects/{projectData.userId}" home
                    >Projects</BreadcrumbItem
                    >
                {/if}
                <BreadcrumbItem href="/project/{idProject}"
                >{projectData.title}</BreadcrumbItem
                >
                <BreadcrumbItem>{title}</BreadcrumbItem>
            </Breadcrumb>


            {#if image}
                <img
                        class="h-16 w-16 object-cover rounded-full mr-4"
                        src={image}
                        alt=""
                />
            {/if}
            <div class="grid grid-cols-1 mb-5 md:grid-cols-2 ">
                <div class="">
                    <div class="font-bold text-xl leading-tight">
                        {title}
                    </div>
                    <div class="text-sm">
                        <!-- {type == "academic" ? "Academic" : "Non Academic"} -->
                    </div>
                    {#if endDate}
                        <div class="text-sm">
                            {startDate} - {endDate}
                        </div>
                    {:else}
                        <div class="text-sm">
                            {startDate} - Present
                        </div>
                    {/if}
                </div>
                <div class="flex justify-center mt-1 md:mt-0 md:justify-end">
                    {#if userId == projectData.userId || participated}
                        <div>
                            <a
                                    href="/project/{idProject}/roadmap/{idRoadmap}/add-task"
                                    type="button"
                                    class="focus:outline-none text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5"
                            >Add Task</a
                            >

                            <a
                                    href="/project/{idProject}/edit-roadmap/{idRoadmap}"
                                    type="button"
                                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 "
                            >edt<iconify-icon icon="material-symbols:edit" /></a
                            >
                            <button
                                    on:click={deleteRoadmap}
                                    type="button"
                                    class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 "
                            >del<iconify-icon icon="material-symbols:delete-outline" /></button
                            >
                        </div>
                    {/if}
                </div>

            </div>


            <div>
                <!--        <div class="prose prose-neutral text-sm max-w-none">-->
                <!--          <SvelteMarkdown source={desc} />-->
                <!--        </div>-->
                <MarkdownViewer value="{desc}" --color-markdown-viewer-bg="theme(colors.white)"/>
                {#if tasks && tasks.length > 0}
                    <div class="text-lg font-bold mt-6 mb-2">Tasks:</div>
                    <div class="border border-r-0 border-l-0 border-b-0">
                        {#each tasks as task}
                            <a
                                    href={`/project/${projectData._id}/roadmap/${idRoadmap}/task/${task._id}`}
                                    class=""
                            >
                                <TaskCard
                                        {idProject}
                                        {projectData}
                                        {roadmaps}
                                        {task}
                                        {assignee}
                                />
                            </a>
                        {/each}
                    </div>
                {/if}
            </div>
        </div>
    </main>
{/if}

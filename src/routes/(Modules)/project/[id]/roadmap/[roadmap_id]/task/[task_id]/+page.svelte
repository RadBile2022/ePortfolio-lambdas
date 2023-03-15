<script>
    import { Button, Dropdown, DropdownItem } from "flowbite-svelte";
    import { Carousel, CarouselTransition } from "flowbite-svelte";
    import { Breadcrumb, BreadcrumbItem } from "flowbite-svelte";
    import "@splidejs/svelte-splide/css";
    import AvatarStack from "$lib/components/AvatarStack.svelte";
    import MarkdownViewer from "$lib/components/MarkdownViewer.svelte";
    import {api_url} from "$lib/end-point.js";


    export let data;
    let idProject =data.id;
    let idRoadmap=data.roadmap_id;
    let idTask=data.task_id;
    let userId = data.user.userId;

    let projectData,
        tasks = [],
        task,
        status,
        date,
        indexTask,
        images = [],
        participants = [],
        participated,
        indexRoadmap,
        roadmap,
        roadmaps = [],
        todos = [],
        indexTodo,
        todo,
        titleTodo,
        doneTodo,
        assigneTodo;


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
        roadmaps.forEach((elementRoadmap, i) => {
            if (elementRoadmap._id == idRoadmap) {
                indexRoadmap = i;
                roadmap = elementRoadmap;
                tasks = roadmap.tasks;
                tasks.forEach((elementTask, i) => {
                    if (elementTask._id == idTask) {
                        indexTask = i;
                        task = elementTask;
                        date = new Date(elementTask.date).toLocaleDateString("en", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                        });
                        status = elementTask.status;
                        images = elementTask.images;
                        todos = elementTask.todos;
                    }
                });
            }
        });
    }

    getProject();

    //   delete task
    async function deleteTask() {
        tasks = [
            ...tasks.slice(0, indexTask),
            ...tasks.slice(indexTask + 1, tasks.length),
        ];

        roadmap.tasks = tasks;

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
            alert(response.statusText);
        } else {
            const data = await response.json();
            window.location.href = `/project/${idProject}/roadmap/${idRoadmap}`;
        }
    }

    // delete todo
    async function deleteTodo(idTodo) {
        todos.forEach((elementTodo, i) => {
            if (elementTodo._id == idTodo) {
                indexTodo = i;
            }
        });

        todos = [
            ...todos.slice(0, indexTodo),
            ...todos.slice(indexTodo + 1, todos.length),
        ];

        task.todos = todos;

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
            alert(response.statusText);
        } else {
            const data = await response.json();
            window.location.href = `/project/${idProject}/roadmap/${idRoadmap}/task/${idTask}`;
        }
    }

    // change check todo
    async function changeCheckTodo(idTodo) {
        var t2 = new Date().getTime();
        var t1 = new Date(date).getTime();

        if (Math.floor((t2 - t1) / (24 * 3600 * 1000)) < 0) {
            alert("Couldn't complete the to do before the due date");
            window.location.reload();
        } else {
            todos.forEach((elementTodo, i) => {
                if (elementTodo._id == idTodo) {
                    indexTodo = i;
                    todo = elementTodo;
                    titleTodo = elementTodo.title;
                    doneTodo = !elementTodo.done;
                    assigneTodo = elementTodo.assigne;
                }
            });

            todos[indexTodo].title = titleTodo;
            todos[indexTodo].done = doneTodo;
            todos[indexTodo].assigne = assigneTodo;

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
                const data = await response.json();
                // window.location.href = `/project/${idProject}/roadmap/${idRoadmap}/task/${idTask}`;
            }
        }
    }
</script>

{#if task}
    <main class="md:mx-32 mx-4">
        <div class="md:container md:mx-auto my-5 md:my-16">
            <div class="flex justify-center">
                <div class="flex-initial w-full">
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
                        <BreadcrumbItem href="/project/{idProject}/roadmap/{idRoadmap}"
                        >{roadmap.title}</BreadcrumbItem
                        >
                        <BreadcrumbItem>{task.title}</BreadcrumbItem>
                    </Breadcrumb>

                    <div class="flex mb-3 items-center">
                        {#if status}
                            <div class="justify-self-start">
                                {#if status == "prepare"}
                                    <div
                                            class="mr-8 ring-1 ring-gray-400  text-xs font-semibold text-gray-600 items-center inline-flex rounded-full px-2"
                                    >
                                        Prepare
                                    </div>
                                {:else if status == "todo"}
                                    <div
                                            class="mr-8 ring-1 ring-gray-400  text-xs font-semibold text-gray-600 items-center inline-flex rounded-full px-2"
                                    >
                                        To Do
                                    </div>
                                {:else if status == "inprogress"}
                                    <div
                                            class="mr-8 ring-1 ring-blue-400  text-xs font-semibold text-blue-600 items-center inline-flex rounded-full px-2"
                                    >
                                        In Progress
                                    </div>
                                {:else if status == "complete"}
                                    <div
                                            class="mr-8 ring-1 ring-green-400  text-xs font-semibold text-green-600 items-center inline-flex rounded-full px-2"
                                    >
                                        Complete
                                    </div>
                                {/if}
                            </div>
                        {/if}
                        <div class="flex-auto" />
                        {#if userId == projectData.userId || participated}
                            <div>
                                <a
                                        href="/project/{idProject}/roadmap/{idRoadmap}/task/{idTask}/add-todo"
                                        type="button"
                                        class="focus:outline-none text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5"
                                >Add To Do</a
                                >

                                <a
                                        href={`/project/${projectData._id}/roadmap/${idRoadmap}/edit-task/${task._id}`}
                                        type="button"
                                        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 "
                                >edt<iconify-icon icon="material-symbols:edit" /></a
                                >
                                <button
                                        on:click={deleteTask}
                                        type="button"
                                        class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 "
                                >del<iconify-icon
                                        icon="material-symbols:delete-outline"
                                /></button
                                >
                            </div>
                        {/if}
                    </div>
                    <div class="md:container md:mx-auto ">
                        <h1 class="mb-4 text-4xl font-extrabold">{task.title}</h1>
                        <div class="text-sm text-gray-600 mb-4">{date}</div>
                        <MarkdownViewer value="{task.desc}" --color-markdown-viewer-bg="theme(colors.white)"/>
                        <!--            <div class="prose prose-neutral text-sm max-w-none">-->
                        <!--              <SvelteMarkdown source={task.desc} />-->
                        <!--            </div>-->
                        {#if todos && todos.length > 0}
                            <div class="text-lg font-bold mt-6 mb-2">To Do List:</div>
                            <div class="border border-r-0 border-l-0 border-b-0">
                                {#each todos as todo}
                                    <div class="flex items-center border border-t-0 p-2">
                                        {#if userId == projectData.userId || participated}
                                            <input
                                                    id={todo._id}
                                                    type="checkbox"
                                                    on:change={() => changeCheckTodo(todo._id)}
                                                    value=""
                                                    checked={todo.done}
                                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                            />
                                        {:else}
                                            <input
                                                    id={todo._id}
                                                    type="checkbox"
                                                    disabled
                                                    value=""
                                                    checked={todo.done}
                                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                            />
                                        {/if}

                                        <label
                                                for={todo._id}
                                                class="ml-2 flex-auto text-sm text-gray-900 dark:text-gray-300"
                                        >{todo.title}</label
                                        >

                                        <div class="flex -space-x-4">
                                            {#each todo.assignee || [] as assigne}
                                                <AvatarStack userId={assigne} />
                                            {/each}
                                        </div>

                                        {#if userId == projectData.userId || participated}
                                            <Button btnClass="p-0 ml-4"
                                            >e<iconify-icon
                                                    icon="fluent:more-horizontal-32-filled"
                                            /></Button
                                            >
                                            <Dropdown class="w-auto">
                                                <DropdownItem
                                                ><a
                                                        href={`/project/${projectData._id}/roadmap/${idRoadmap}/task/${idTask}/edit-todo/${todo._id}`}
                                                >Edit</a
                                                ></DropdownItem
                                                >
                                                {#if projectData.userId == userId || !projectData.participants.includes(userId)}
                                                    <DropdownItem on:click={() => deleteTodo(todo._id)}
                                                    >Delete</DropdownItem
                                                    >
                                                {/if}
                                            </Dropdown>
                                        {/if}
                                    </div>
                                {/each}
                            </div>
                        {/if}
                        {#if images && images.length > 0}
                            <div class="mt-4">
                                <Carousel divClass={"h-full"} {images} showThumbs={false} />
                            </div>
                        {/if}
                    </div>
                </div>
            </div>
        </div>
    </main>
{/if}

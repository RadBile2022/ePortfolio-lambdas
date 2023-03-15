<script>
    import { Button, Dropdown, DropdownItem } from "flowbite-svelte";
    import {goto} from "$app/navigation";
    import {api_url} from "$lib/end-point.js";
    import MarkdownViewer from "$lib/components/MarkdownViewer.svelte";


    export let data;
    let userId = data.user.userId;
    let idBadge=data.id;

    let badgeData,
        desc,
        date,
        time,
        userIdBadge,
        title,
        imgBadge,
        issuer,
        url,
        skills = [];


    const today = new Date().toLocaleDateString("en", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    // get data user
    async function getUser() {
        const response = await fetch(
            api_url + "/api/users/" + userId
        );

        if (!response.ok) {
            localStorage.clear();
            document.location.href = "/login";
        }

        const data = await response.json();
    }

    getUser();

    // get data badge
    async function getBadge() {
        const response = await fetch(
            api_url + "/api/badges/" + idBadge
        );

        if (!response.ok) {
            alert(response.statusText);
        }
        const data = await response.json();
        badgeData = data;
        desc = badgeData.desc;
        title = badgeData.title;
        issuer = badgeData.issuer;
        skills = badgeData.skills;
        url = badgeData.url;
        imgBadge = badgeData.imgBadge;
        userIdBadge = badgeData.userId;
        date = new Date(badgeData.createdAt).toLocaleDateString("en", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });
        time = new Date(badgeData.createdAt).toLocaleTimeString("en", {
            hour: "numeric",
            minute: "2-digit",
        });
    }

    getBadge();

    // delete badge
    async function deleteBadge() {
        const response = await fetch(
            api_url + "/api/badges/" + idBadge,
            {
                method: "DELETE",
                headers: { "Content-type": "application/json; charset=UTF-8" },
                body: JSON.stringify({
                    userId: userId,
                }),
            }
        );

        if (!response.ok) {
            alert("You can only delete your badge");
        } else {
            goto("/badges");
        }

        // const data = await response.json();
    }
</script>

{#if badgeData}
    <main class="">
        <div class=" md:mx-auto my-5 md:my-16">
            <div class="flex justify-center w-full">
                <div class="w-3/4">
                    <div class="flex justify-end mb-3">
                        {#if userIdBadge == userId}
                            <Button btnClass="p-0 h-3"
                            >e<iconify-icon
                                    icon="fluent:more-horizontal-32-filled"
                            /></Button
                            >
                            <Dropdown class="w-auto">
                                <DropdownItem
                                ><a href="/badge/edit/{idBadge}">Edit</a></DropdownItem
                                >
                                <DropdownItem on:click={deleteBadge}>Delete</DropdownItem>
                            </Dropdown>
                        {/if}
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
                        <div class="flex-initial col-span-1 ">
                            <img
                                    class="w-full h-auto object-cover rounded-lg m-0"
                                    src={imgBadge}
                                    alt="Default avatar"
                            />
                        </div>
                        <div class=" flex-initial col-span-2 ">
                            <h1 class="mb-4 font-bold text-2xl">{title}</h1>
                            <div class="mb-4">Issued by {issuer}</div>
                            <div class="mb-4 prose prose-neutral text-sm max-w-none">
                                <MarkdownViewer value={desc} />
                            </div>
                            {#if url}
                                <div class="mb-4">
                                    <a href={url} class="underline">Learn more</a>
                                </div>
                            {/if}
                            <div class="mb-4">Issued Date: {date}</div>
                            {#if skills && skills.length > 0}
                                <div class="font-bold mb-2">Skills</div>
                                <div class="flex flex-wrap">
                                    {#each skills as skill, i (skill)}
                                        <div
                                                class="text-gray-900 bg-white border border-gray-300 focus:outline-none  focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-3 my-1.5"
                                        >
                                            <a
                                                    class="no-underline hover:underline"
                                                    href="/discovery?search={skill}">{skill}</a
                                            >
                                        </div>
                                    {/each}
                                </div>
                            {/if}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
{/if}

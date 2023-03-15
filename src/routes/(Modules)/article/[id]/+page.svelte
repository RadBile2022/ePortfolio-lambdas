<script>

    import { Button, Dropdown, DropdownItem } from "flowbite-svelte";
    import CommentCard from "$lib/components/CommentCard.svelte";
    import MarkdownViewer from "$lib/components/MarkdownViewer.svelte";
    import {goto} from "$app/navigation";
    import {api_url} from "$lib/end-point.js";




    let articleData,
        desc,
        date,
        time,
        userIdArticle,
        title,
        coverArticle,
        userData,
        profilePicture,
        nameUserArticle,
        profilePictureArticle,
        nimUserArticle,
        majorUserArticle,
        organizationUserArticle,
        roleUserArticle,
        academicFieldUserArticle,
        commentInput,
        comments = [],
        userDataArticle,
        tags = [];

    export let data;
    let userId = data.user.userId;
    let idArticle=data.id;

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
        userData = data;
        if (userData.profilePicture) {
            profilePicture = api_url + "/" + userData.profilePicture;
        } else {
            profilePicture = "/icon-user.png";
        }
    }

    getUser();

    // get data article
    async function getArticle() {
        const response = await fetch(
            api_url + "/api/articles/" + idArticle
        );

        if (!response.ok) {
            alert(response.statusText);
        }
        const data = await response.json();
        articleData = data;
        desc = articleData.desc;
        title = articleData.title;
        comments = articleData.comments;
        tags = articleData.tags;
        coverArticle = articleData.coverArticle;
        userIdArticle = articleData.userId;
        date = new Date(articleData.createdAt).toLocaleDateString("en", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });
        time = new Date(articleData.createdAt).toLocaleTimeString("en", {
            hour: "numeric",
            minute: "2-digit",
        });

        getUserArticle();
    }

    getArticle();

    // get data user article
    async function getUserArticle() {
        const response = await fetch(
            api_url + "/api/users/" + userIdArticle
        );

        if (!response.ok) {
            console.log(response.statusText);
        }

        const data = await response.json();
        userDataArticle = data;
        nameUserArticle = userDataArticle.username;
        nimUserArticle = userDataArticle.nim;
        majorUserArticle = userDataArticle.major;
        organizationUserArticle = userDataArticle.organization;
        roleUserArticle = userDataArticle.role;
        academicFieldUserArticle = userDataArticle.academicField;
        if (userDataArticle.profilePicture) {
            profilePictureArticle =
                api_url + "/" + userDataArticle.profilePicture;
        } else {
            profilePictureArticle = "/icon-user.png";
        }
    }

    // delete article
    async function deleteArticle() {
        const response = await fetch(
            api_url + "/api/articles/" + idArticle,
            {
                method: "DELETE",
                headers: { "Content-type": "application/json; charset=UTF-8" },
                body: JSON.stringify({
                    userId: userId,
                }),
            }
        );

        if (!response.ok) {
            alert("You can only delete your article");
        } else {
            goto("/articles");
        }

        // const data = await response.json();
    }

    // add comment
    async function addComment() {
        let newComment = {
            userId,
            comment: commentInput,
        };

        comments.splice(0, 0, newComment);

        const response = await fetch(
            api_url + "/api/articles/" + idArticle,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId: userIdArticle,
                    comments,
                }),
            }
        );

        if (!response.ok) {
            alert(response.statusText);
        } else {
            comments = comments;
            comments.sort(function (a, b) {
                // @ts-ignore
                return new Date(b.date) - new Date(a.date);
            });
            const data = await response.json();
            commentInput = "";
        }
    }
</script>

{#if userDataArticle && articleData && userData}
    <main class="md:mx-32">
        <div class="md:container md:mx-auto mx-4 my-5  md:my-16">
            <div class="flex justify-center">
                <div class="flex-initial w-full">
                    <div class="flex justify-between mb-3 items-center">
                        <div>
                            <button on:click={() => history.back()}>
                                <iconify-icon icon="material-symbols:arrow-back-rounded" />
                            </button>
                        </div>
                        {#if userIdArticle == userId}
                            <div>
                                <Button btnClass="p-0 h-3"
                                ><iconify-icon
                                        icon="fluent:more-horizontal-32-filled"
                                /></Button
                                >
                                <Dropdown class="w-auto">
                                    <DropdownItem
                                    ><a href="/article/edit/{idArticle}">Edit</a></DropdownItem
                                    >
                                    <DropdownItem on:click={deleteArticle}>Delete</DropdownItem>
                                </Dropdown>
                            </div>
                        {/if}
                    </div>
                    <div class="md:container md:mx-auto">
                        <h1 class="mb-4 font-extrabold text-4xl">{title}</h1>
                        <div class="flex">
                            <div class="text-sm text-gray-600 mb-4">Published on {date}</div>
                            {#if !articleData.isPublic}
                                <div
                                        class="ml-3 h-5 ring-1 ring-gray-400  text-xs font-semibold text-gray-600 items-center inline-flex rounded-full px-2"
                                >
                                    Private
                                </div>
                            {/if}
                        </div>
                        {#if coverArticle}
                            <img
                                    class="w-full h-96 mb-4 object-cover rounded-lg"
                                    src={coverArticle}
                                    alt="Default avatar"
                            />
                        {/if}

                        <div class="flex mb-4 items-center border-t border-b p-2">
                            <a
                                    href={userId == userIdArticle
                  ? "/profile"
                  : "/profile/" + userIdArticle}
                                    class="flex no-underline hover:underline"
                            >
                                <img
                                        class="w-14 h-14 m-0 rounded-full object-cover"
                                        src={profilePictureArticle}
                                        alt="Rounded avatar"
                                />
                                <div class="flex flex-col ml-4">
                                    <div class="font-bold text-lg line-clamp-1">
                                        {nameUserArticle}
                                    </div>
                                    {#if roleUserArticle == "mahasiswa"}
                                        <!-- <div class="font-light text-xs">{nimUserArticle}</div> -->
                                        <div class="font-light text-xs">
                                            {majorUserArticle ? majorUserArticle : ""}
                                        </div>
                                    {:else}
                                        <div class="font-light text-xs ">
                                            {academicFieldUserArticle ? academicFieldUserArticle : ""}
                                        </div>
                                    {/if}
                                    <div class="font-light text-xs">
                                        {organizationUserArticle ? organizationUserArticle : ""}
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div class="prose prose-neutral text-sm max-w-none">
                        </div>

                        <MarkdownViewer value={desc} --color-markdown-viewer-bg="theme(colors.white)"/>
                        <div class="flex flex-wrap">
                            {#each tags as tag}
                                <div class="mr-3">
                                    <a
                                            class="no-underline hover:underline text-gray-600 font-light hover:text-black hover:font-normal"
                                            href="/discovery?search={tag}">#{tag}</a
                                    >
                                </div>
                            {/each}
                        </div>
                        <div class="flex justify-end">
                            <div class="text-sm">
                                {#if comments.length > 0}
                                    {comments.length}
                                    {comments.length == 1 ? "comment" : "comments"}
                                {/if}
                            </div>
                        </div>
                        <div class="">
                            <hr class="my-4" />
                            <div class="flex items-center ">
                                <img
                                        class="w-11 h-11 rounded-full object-cover m-0"
                                        src={profilePicture}
                                        alt="Rounded avatar"
                                />
                                <form on:submit|preventDefault={addComment} class="w-full">
                                    <input
                                            bind:value={commentInput}
                                            type="text"
                                            id="comment"
                                            placeholder="Add a comment..."
                                            class="bg-gray-50 ml-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    />
                                </form>
                            </div>
                        </div>
                    </div>
                    {#each comments as comment, i (comment)}
                        <CommentCard {userId}
                                comment={{
                ...comment,
                idArticle: idArticle,
                userIdArticle,
                type: "article",
              }}
                        />
                    {/each}
                </div>
            </div>
        </div>
    </main>
{/if}

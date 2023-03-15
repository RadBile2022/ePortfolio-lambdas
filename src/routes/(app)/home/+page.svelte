<script>
    import {api_url,default_img} from "$lib/end-point.js";
    import PostCardDiscovery from "$lib/components/PostCardDiscovery.svelte";
    import { onMount } from "svelte";
    import {goto} from"$app/navigation";

    import ArticleCard from "$lib/components/ArticleCard.svelte";
    import PeopleCardHome from "$lib/components/PeopleCardHome.svelte";
    import ProjectCardHome from "$lib/components/ProjectCardHome.svelte";

    export let data;
    let all = [];
    let userIdLocal = data.user.userId;
    let jwt = data.user.jwt;



    // onMount(() => {
    //    userIdLocal = localStorage.getItem("userId");
    //     jwt = localStorage.getItem("jwt");
    // });

    let userData,
        name,
        profilePicture,
        nim,
        major,
        interest,
        role,
        academicField,
        organization,
        userSuggest = [],
        projectSuggest = [],
        following = [];

    // get jwt from localstorage
    async function checkUserAuth() {
        const response = await fetch(
         api_url+  "/api/auth/user/" + jwt
        );

        // kalau tidak ada
        if (!response.ok) {
            // clear localStorage
            localStorage.clear();

            goto("/login");
        }

        const content = await response.json();

        if (!content.gender) {
            goto("/edit-profile");
        } else {
            getUser();
        }
    }

    // get data user
    async function getUser() {
        const response = await fetch(
           api_url  + "/api/users/" + userIdLocal
        );
        if (!response.ok) {
            goto("/login");
            localStorage.clear();
        }
        const data = await response.json();
        userData = data;
        name = userData.username;
        nim = userData.nim;
        major = userData.major;
        interest = userData.interest;
        role = userData.role;
        academicField = userData.academicField;
        organization = userData.organization;
        following = userData.following;
        if (userData.profilePicture) {
            profilePicture = api_url + "/" + userData.profilePicture;
            // profilePicture = "\\src\\lib\\images\\icon-user.jpg";
        } else {
            profilePicture = default_img;
        }

        getUsersSuggest();
        getProjectsSuggest();
    }

    // get [search] posts
    async function getPosts() {
        let response = await fetch(
            api_url + "/api/posts/timeline/all/" + userIdLocal
        );
        return response.ok ? await response.json() : null;
    }

    // get [search] articles
    async function getArticles() {
        let response = await fetch(
          api_url + "/api/articles/timeline/all/" + userIdLocal
        );
        return response.ok ? await response.json() : null;
    }

    // get users suggestion
    async function getUsersSuggest() {
        let majorsuggest = major ? major : " ";
        let organizationsuggest = organization ? organization : " ";
        const response = await fetch(
            api_url + `/api/users/suggest/${majorsuggest}/${organizationsuggest}/${userIdLocal}`
        );

        if (!response.ok) {
            const data = await response.json();
        }

        const data = await response.json();
        userSuggest = data;
    }

    // get projects suggestion
    async function getProjectsSuggest() {
        let response = await fetch(
            api_url + "/api/projects/suggest/" + userIdLocal
        );

        if (!response.ok) {
            const data = await response.json();
            // console.log(data);
        }

        const data = await response.json();
        projectSuggest = data;
    }

    onMount(async () => {
        checkUserAuth();
        let post = await getPosts();
        let articles = await getArticles();
        if (post) {
            post.forEach((element) => {
                // filter private post
                if (element.isPublic == false && element.userId != userIdLocal) {
                } else {
                    all.push(element);
                    all = all;
                }
            });
        }

        if (articles) {
            articles.forEach((element) => {
                // filter private article
                if (element.isPublic == false && element.userId != userIdLocal) {
                } else {
                    all.push(element);
                    all = all;
                }
                // sorting [search] posts and articles
                all.sort(function (a, b) {
                    // @ts-ignore
                    return new Date(b.createdAt) - new Date(a.createdAt);
                });
            });
        }
    });



</script>

<main class="w-full grid grid-cols-1 md:grid-cols-3">
    <div class="">
        {#if userData}
            <div class="  mt-8 ">
                <a href="/profile" class="hover:underline">
                    <div class="flex justify-center mb-3">
                        <img
                                class="w-48 h-48 object-cover rounded-full mb-2 ring-2 ring-gray-200 p-1"
                                src={profilePicture}
                                alt="Rounded avatar"
                        />
                    </div>
                    <p class="font-bold text-center text-xl">{name}</p>
                </a>
                {#if role == "mahasiswa"}
                    <div class="text-center">
                        <p class="font-light  text-sm truncate">{nim ? nim : ""}</p>
                        <p class="text-xl text-center my-2">{major ? major : ""}</p>
                        <p>{interest ? interest : ""}</p>
                    </div>
                {:else}
                    <p class="text-center">{academicField ? academicField : ""}</p>
                {/if}
            </div>
        {:else}
            <div class="flex-initial " />
        {/if}

        <div class=" mt-10  ">
            {#if userSuggest && userSuggest.length > 0}
                {#each userSuggest as userId, i}
                    {#if i < 3 && userSuggest}
                        <PeopleCardHome {userId} />
                    {/if}
                {/each}
            {/if}
            <div class="mt-10">

                {#if projectSuggest && projectSuggest.length > 0}
                    {#each projectSuggest as project}
                        <div class=""></div>
                        <ProjectCardHome {project} />
                    {/each}
                {/if}
            </div>
        </div>
    </div>






    <div class="flex-initial md:mt-8 col-span-2 md:mx-5">
        <div class="md:container md:mx-auto bg-gray-300 p-4 rounded-lg mb-8">
            <a
                    href="/post/create"
                    class="block w-full text-gray-500 bg-white hover:bg-gray-50 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-5 text-start"
            >
                What's going on?
            </a>
        </div>

        {#if all}
            {#each all as element}
                {#if element.title && !element.startDate}
                    <ArticleCard article={element} />
                {:else}
                    <PostCardDiscovery userId="{userIdLocal}" post={element} />
                {/if}
            {/each}
        {/if}
    </div>

</main>

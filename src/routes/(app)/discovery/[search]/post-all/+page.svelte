<script>
    import PostCard from "$lib/components/PostCard.svelte";
    import {api_url} from "$lib/end-point.js";

    export let data;
    let posts = [];
    let userIdLocal = data.user.userId;

    let searchKeyword =data.params.search;

    if (searchKeyword) getPost();


    // get all posts
    async function getPost() {
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
</script>

<div class="md:container md:mx-auto my-16">
    <div class="flex justify-center">
        <div class="w-full md:mx-32">
            {#if posts.length > 0}
                {#each posts as post}
                    <PostCard {post} userId="{userIdLocal}" />
                {/each}
            {/if}
        </div>
    </div>
</div>

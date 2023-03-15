<script>
    import { writable } from "svelte/store";
    import { onMount } from "svelte";
    import ArticleCard from "$lib/components/ArticleCard.svelte";
    // import ProfileModule from "$lib/pages/ProfileModule.svelte";
    import {api_url} from "$lib/end-point.js";

    const articleStore = writable(null);
    export let data;
    let userId=data.user.userId ;


    // get [search] user articles
    async function getArticle() {
        let response = await fetch(
            api_url + "/api/articles/all/" + userId
        );
        return response.ok ? await response.json() : null;
    }

    onMount(async () => {
        let article = await getArticle();
        if (article) articleStore.update((data) => article);
    });
</script>

    <!-- tabs content -->
    <a
            href="/article/create"
            class="w-full mb-8 bg-blue-700 text-white hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-white font-medium rounded-lg text-sm px-5 py-3 text-center inline-flex items-center justify-center"
    >
        Create new article
        <iconify-icon class="ml-2" icon="akar-icons:plus" />
    </a>

    {#if $articleStore}
        {#each $articleStore as $article}
            <ArticleCard article={$article}  {userId}/>
        {/each}
    {/if}
<!--<main class="md:mx-64">-->
<!--  <section>-->
<!--    <div class="md:container md:mx-auto my-16">-->
<!--      <div class="flex">-->
<!--        <ProfileBar active={"articles"} {userId} />-->

<!--        <div class="flex-initial w-3/4">-->
<!--          &lt;!&ndash; tabs &ndash;&gt;-->
<!--          <ProfileTabs active={"articles"} />-->

<!--         -->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<!--  </section>-->
<!--</main>-->

<script>
    import ArticleCard from "$lib/components/ArticleCard.svelte";
    import {api_url} from "$lib/end-point.js";

    export let data;
    let userIdLocal = data.user.userId;

     let searchKeyword=data.params.search;
    let articles = [];

    if (searchKeyword) getArticles();
    // get all articles
    async function getArticles() {
        let response = await fetch(
            api_url + `/api/articles/search/${searchKeyword}`
        );

        if (!response.ok) {
            alert(response.status);
        }

        const data = await response.json();
        let temp = data;
        temp.forEach((element) => {
            // filter private article
            if (element.isPublic == false && element.userId != userIdLocal) {
            } else {
                articles.push(element);
                articles = articles;
            }
        });
    }
</script>

<div class="md:container md:mx-auto my-16">
    <div class="flex justify-center">
        <div class="w-full md:mx-32">
            {#if articles.length > 0}
                {#each articles as article}
                    <ArticleCard {article} />
                {/each}
            {/if}
        </div>
    </div>
</div>

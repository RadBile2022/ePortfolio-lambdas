<script>
    import {writable} from "svelte/store";
    import {onMount} from "svelte";
    import ArticleCard from "$lib/components/ArticleCard.svelte";
    import {api_url} from "$lib/end-point.js";

    const articleStore = writable(null);
    export let data;
     let userId  = data.id;
    let userIdLocal = data.user.userId;

    let all = [];

    // get [search] user articles
    async function getArticle() {
        let response = await fetch(
            api_url + "/api/articles/all/" + userId
        );
        return response.ok ? await response.json() : null;
    }

    onMount(async () => {
        let article = await getArticle();
        if (article) {
            article.forEach((element) => {
                // filter private article
                if (element.isPublic == false && element.userId != userIdLocal) {
                } else {
                    all.push(element);
                    all = all;
                }
                // sorting article
                all.sort(function (a, b) {
                    // @ts-ignore
                    return new Date(b.createdAt) - new Date(a.createdAt);
                });
            });
            articleStore.update((data) => all);
        }
    });
</script>
<div className="2xl:mx-60">
        {#if $articleStore}
            {#each $articleStore as $article}
                <ArticleCard article={$article} userId="{userIdLocal}"/>
            {/each}
        {/if}
</div>


<!--<main class="md:mx-72">-->
<!--  <section>-->
<!--    <div class="md:container md:mx-auto my-16">-->
<!--      <div class="flex">-->
<!--        <ProfileBar active={"articles"} {userId} />-->

<!--        <div class="flex-initial w-3/4">-->
<!--          &lt;!&ndash; tabs &ndash;&gt;-->
<!--          <div-->
<!--            class="mb-4 text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700"-->
<!--          >-->
<!--            <ul class="flex flex-wrap -mb-px">-->
<!--              <li class="mr-2">-->
<!--                <a-->
<!--                  href="/profile/{userId}"-->
<!--                  class="border-transparent hover:text-gray-600 hover:border-gray-300 inline-block p-4 rounded-t-lg border-b-2 "-->
<!--                  >About Me</a-->
<!--                >-->
<!--              </li>-->
<!--              <li class="mr-2">-->
<!--                <a-->
<!--                  href="/posts/{userId}"-->
<!--                  class="border-transparent hover:text-gray-600 hover:border-gray-300 inline-block p-4 rounded-t-lg border-b-2"-->
<!--                  aria-current="page">Posts</a-->
<!--                >-->
<!--              </li>-->
<!--              <li class="mr-2">-->
<!--                <a-->
<!--                  href="/articles/{userId}"-->
<!--                  class="border-blue-600 text-blue-600 inline-block p-4 rounded-t-lg border-b-2 "-->
<!--                  >Articles</a-->
<!--                >-->
<!--              </li>-->
<!--              <li class="mr-2">-->
<!--                <a-->
<!--                  href="/activities/{userId}"-->
<!--                  class="border-transparent hover:text-gray-600 hover:border-gray-300 inline-block p-4 rounded-t-lg border-b-2 "-->
<!--                  >Activities</a-->
<!--                >-->
<!--              </li>-->
<!--              <li class="mr-2">-->
<!--                <a-->
<!--                  href="/projects/{userId}"-->
<!--                  class="border-transparent hover:text-gray-600 hover:border-gray-300 inline-block p-4 rounded-t-lg border-b-2 "-->
<!--                  >Projects</a-->
<!--                >-->
<!--              </li>-->
<!--              <li class="mr-2">-->
<!--                <a-->
<!--                  href="/badges/{userId}"-->
<!--                  class="border-transparent hover:text-gray-600 hover:border-gray-300 inline-block p-4 rounded-t-lg border-b-2 "-->
<!--                  >Badges</a-->
<!--                >-->
<!--              </li>-->
<!--            </ul>-->
<!--          </div>-->

<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<!--  </section>-->
<!--</main>-->

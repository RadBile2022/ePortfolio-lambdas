<script>
  import MarkdownViewer from "./MarkdownViewer.svelte";
  import {api_url} from "$lib/end-point.js";

  export let article;

  let userId = article.userId;
  let userData, name, date,userIdArticle;
  const today = new Date();

  if (article) {
    userIdArticle = article.userId;
    if (article.createdAt != article.updatedAt) {
      date = new Date(article.createdAt);
    } else {
      date = new Date(article.createdAt);
    }
  }
  // get data user
  async function getUserArticle() {
    const response = await fetch(
            api_url + "/api/users/" + userIdArticle
    );

    if (!response.ok) {
      console.log(response.statusText);
    }

    const data = await response.json();
    userData = data;
    name = userData.username;
  }

  getUserArticle();
</script>

{#if userData}
  <div class="md:container md:mx-auto bg-gray-100 p-6 rounded-lg">
    <div class="flex">
      <div class=""><span class="font-bold">{name}</span> posted this</div>
      {#if !article.isPublic}
        <div
          class="ml-3 ring-1 ring-gray-400 my-1 text-xs font-semibold text-gray-600 items-center inline-flex rounded-full px-2"
        >
          Private
        </div>
      {/if}
    </div>
    <div class="text-sm">
      <!-- if updated -->
      <!-- {article.createdAt != article.updatedAt ? "Last updated on " : ""} -->
      <!-- time -->
      {date.toLocaleTimeString("id", {
        hour: "numeric",
        minute: "2-digit",
      })}
      <!-- date -->
      {date.toLocaleDateString("en") == today.toLocaleDateString("en")
        ? "Today"
        : date.toLocaleDateString("en", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
    </div>
    <a href="/article/{article._id}" class="">
      {#if article.coverArticle}
        <img
          class="my-3 object-cover h-80 w-full rounded"
          src={article.coverArticle}
          alt=""
        />
      {/if}

      <div class="font-extrabold text-3xl mb-2">
        {article.title}
      </div>
      <div class="prose prose-neutral line-clamp-6 text-sm">
        <MarkdownViewer value={article.desc} />
      </div>
    </a>
  </div>
{/if}

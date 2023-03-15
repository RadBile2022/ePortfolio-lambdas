<script>
  import {api_url,default_img} from "$lib/end-point.js";

  import { Button, Dropdown, DropdownItem } from "flowbite-svelte";
  import MarkdownViewer from "./MarkdownViewer.svelte";
  import {onMount} from "svelte";
  import {goto} from "$app/navigation";

  export let article;

  export let userId ;

  let userData, name, date, userIdArticle;
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

  // edit articel
  async function editArticle(){
    localStorage.setItem("idArticle",article._id)
    goto(`/article/edit/${article._id}`)
  }

  // delete article
  async function deleteArticle() {
    const response = await fetch(
      api_url + "/api/articles/" + article._id,
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
      window.location.reload();
    }

    // const data = await response.json();
  }
</script>

{#if userData}
  <div class="md:container md:mx-auto bg-gray-100 p-6 rounded-lg mb-8">
    <div class="flex">
      <div class="line-clamp-1">
        <span class="font-bold">{name}</span> posted this
      </div>
      {#if !article.isPublic}
        <div
          class="mx-3 ring-1 ring-gray-400 my-1 text-xs font-semibold text-gray-600 items-center inline-flex rounded-full px-2"
        >
          Private
        </div>
      {/if}
      <div class="flex-auto" />
      {#if userId == userIdArticle}
        <Button btnClass="p-0 h-3"
          >e<iconify-icon icon="fluent:more-horizontal-32-filled" /></Button
        >
        <Dropdown class="w-auto">
          <DropdownItem on:click={editArticle}
            >Edit</DropdownItem
          >
          <DropdownItem on:click={deleteArticle}>Delete</DropdownItem>
        </Dropdown>
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
          class="object-cover h-80 w-full rounded my-4"
          src={article.coverArticle}
          alt=""
        />
      {/if}

      <div class="font-extrabold text-3xl mb-2">
        {article.title}
      </div>
<!--      <div class="prose prose-neutral line-clamp-6 text-sm max-w-none">-->
<!--        <SvelteMarkdown source={article.desc} />-->
<!--      </div>-->

      <p class="line-clamp-6 max-w-none text-sm">
        <MarkdownViewer class="bg-white" value={article.desc} />
      </p>
      <!-- <div class="text-sm">{name} on ePortfolio</div> -->
    </a>
  </div>
{/if}

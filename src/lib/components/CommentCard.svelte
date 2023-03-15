<script>
  import { Button, Dropdown, DropdownItem } from "flowbite-svelte";
  import {api_url} from "$lib/end-point.js";

  export let comment;

 export let userId ;
  let userData,
    name,
    profilePicture,
    postData,
    articleData,
    badgeData,
    comments = [],
    cardComment;

  // get data user
  async function getUser() {
    const response = await fetch(
      api_url + "/api/users/" + comment.userId
    );

    if (!response.ok) {
      localStorage.clear();
      document.location.href = "/login";
    }

    const data = await response.json();
    userData = data;
    name = userData.username;
    if (userData.profilePicture) {
      profilePicture = api_url + "/" + userData.profilePicture;
    } else {
      profilePicture = "/icon-user.png";
    }
  }

  getUser();

  // get data post
  async function getPost() {
    const response = await fetch(
      api_url + "/api/posts/" + comment.idPost
    );

    if (!response.ok) {
      alert(response.statusText);
    } else {
      const data = await response.json();
      postData = data;
      comments = postData.comments;
    }
  }

  // get data article
  async function getArticle() {
    const response = await fetch(
      api_url + "/api/articles/" + comment.idArticle
    );

    if (!response.ok) {
      alert(response.statusText);
    } else {
      const data = await response.json();
      articleData = data;
      comments = articleData.comments;
    }
  }

  // get data badge
  async function getBadge() {
    const response = await fetch(
      api_url + "/api/badges/" + comment.idBadge
    );

    if (!response.ok) {
      alert(response.statusText);
    }
    const data = await response.json();
    badgeData = data;
    comments = badgeData.comments;
  }

  if (comment.userId == userId) {
    if (comment.type == "post") {
      getPost();
    } else if (comment.type == "article") {
      getArticle();
    } else if (comment.type == "badge") {
      getBadge();
    }
  }

  // comment date
  function timeSince(date) {
    // @ts-ignore
    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = seconds / 31536000;

    if (interval > 1) {
      return Math.floor(interval) + " years";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " months";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " days";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutes";
    }
    return Math.floor(seconds) + " seconds";
  }

  // delete comment
  async function deleteComment(idComment) {
    let updatedComments = comments.filter(
      (comment) => comment._id !== idComment
    );

    if (comment.type == "post") {
      const response = await fetch(
        api_url + "/api/posts/" + comment.idPost,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: comment.userIdPost,
            comments: updatedComments,
          }),
        }
      );

      if (!response.ok) {
        alert(response.statusText);
      } else {
        cardComment.classList.add("hidden");
      }
    } else if (comment.type == "article") {
      const response = await fetch(
        api_url + "/api/articles/" + comment.idArticle,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: comment.userIdArticle,
            comments: updatedComments,
          }),
        }
      );
      if (!response.ok) {
        alert(response.statusText);
      } else {
        cardComment.classList.add("hidden");
      }
    } else if (comment.type == "badge") {
    }
  }
</script>

{#if userData}
  <div class="flex mt-3" bind:this={cardComment}>
    <img
      class="w-11 h-11 rounded-full object-cover m-0"
      src={profilePicture}
      alt="Rounded avatar"
    />
    <div
      class="flex flex-col ml-2 leading-tight flex-auto {comment.type == 'post'
        ? 'bg-white'
        : 'bg-gray-200'} rounded-lg p-2"
    >
      <div class="flex justify-between">
        <div class="font-bold ">{name}</div>
        {#if comment.userId == userId}
          <Button btnClass="p-0"
            ><iconify-icon icon="fluent:more-horizontal-32-filled" /></Button
          >
          <Dropdown class="w-auto">
            <DropdownItem on:click={() => deleteComment(comment._id)}
              >Delete</DropdownItem
            >
          </Dropdown>
        {/if}
      </div>
      <div class="text-sm">
        {comment.comment}
      </div>
      <div class="font-light text-xs">
        {comment.date
          ? timeSince(new Date(Date.parse(comment.date)))
          : timeSince(new Date(Date.now()))}
      </div>
    </div>
  </div>
{/if}

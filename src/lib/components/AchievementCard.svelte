<script>
  import SvelteMarkdown from "svelte-markdown";
  import CommentCard from "./CommentCard.svelte";
  import { Button, Dropdown, DropdownItem } from "flowbite-svelte";

  export let achievement;

  let userId = localStorage.getItem("userId");

  let userData,
    profilePicture,
    desc,
    date,
    commentInput,
    comments = [],
    userIdAchievement = achievement.userId,
    userDataAchievement,
    nameUserAchievement,
    profilePictureAchievement,
    roleUserAchievement,
    nimUserAchievement,
    commentVisible = false,
    academicFieldAchievement;

  function toggleVissible() {
    commentVisible = !commentVisible;
  }

  const today = new Date();

  // get data user
  async function getUser() {
    const response = await fetch(
      import.meta.env.DBX_API_URL + "/api/users/" + userId
    );

    if (!response.ok) {
      localStorage.clear();
      document.location.href = "/login";
    }

    const data = await response.json();
    userData = data;
    if (userData.profilePicture) {
      profilePicture = import.meta.env.DBX_API_URL + "/" + userData.profilePicture;
    } else {
      profilePicture = "/icon-user.png";
    }
  }

  getUser();

  if (achievement) {
    desc = achievement.desc;
    comments = achievement.comments;
    comments.sort(function (a, b) {
      // @ts-ignore
      return new Date(b.date) - new Date(a.date);
    });
    if (achievement.createdAt != achievement.updatedAt) {
      date = new Date(achievement.createdAt);
    } else {
      date = new Date(achievement.createdAt);
    }
  }

  // get data user achievement
  async function getUserAchievement() {
    const response = await fetch(
      import.meta.env.DBX_API_URL + "/api/users/" + userIdAchievement
    );

    if (!response.ok) {
      console.log(response.statusText);
    }

    const data = await response.json();
    userDataAchievement = data;
    nameUserAchievement = userDataAchievement.username;
    nimUserAchievement = userDataAchievement.nim;
    roleUserAchievement = userDataAchievement.role;
    academicFieldAchievement = userDataAchievement.academicField;
    if (userDataAchievement.profilePicture) {
      profilePictureAchievement =
        import.meta.env.DBX_API_URL + "/" + userDataAchievement.profilePicture;
    } else {
      profilePictureAchievement = "/icon-user.png";
    }
  }

  getUserAchievement();

  // add comment
  async function addComment() {
    let newComment = {
      userId,
      comment: commentInput,
    };

    comments.splice(0, 0, newComment);

    const response = await fetch(
      import.meta.env.DBX_API_URL + "/api/achievements/" + achievement._id,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userIdAchievement,
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

  // delete achievement
  async function deleteAchievement() {
    const response = await fetch(
      import.meta.env.DBX_API_URL + "/api/achievements/" + achievement._id,
      {
        method: "DELETE",
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify({
          userId: userId,
        }),
      }
    );

    if (!response.ok) {
      alert("You can only delete your achievement");
    } else {
      document.location.href = "/achievements";
    }

    // const data = await response.json();
  }
</script>

{#if userDataAchievement && userData}
  <div
    class="md:container md:mx-auto bg-gray-100 p-6 rounded-lg achievement-card mb-8"
  >
    <div class="flex mb-4">
      <a
        href={userId == userIdAchievement
          ? "/profile"
          : "/profile/" + userIdAchievement}
        class="flex"
      >
        <img
          class="w-14 h-14 rounded-full object-cover"
          src={profilePictureAchievement}
          alt="Rounded avatar"
        />
        <div class="ml-4 ">
          <div>
            <div class="font-bold text-lg hover:underline leading-tight">
              {nameUserAchievement}
            </div>
            {#if roleUserAchievement == "mahasiswa"}
              <div class="font-light text-xs">{nimUserAchievement}</div>
            {:else}
              <div class="font-light text-xs truncate w-96">
                {academicFieldAchievement ? academicFieldAchievement : ""}
              </div>
            {/if}
            <div class="font-light text-xs">
              <!-- if updated -->
              <!-- {achievement.createdAt != achievement.updatedAt ? "Last updated on " : ""} -->
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
          </div>
        </div>
      </a>
      {#if !achievement.isPublic}
        <div
          class="ml-3 mt-1 h-5 ring-1 ring-gray-400  text-xs font-semibold text-gray-600 items-center inline-flex rounded-full px-2"
        >
          Private
        </div>
      {/if}
      <div class="flex-auto" />
      {#if userId == userIdAchievement}
        <Button btnClass="p-0 h-3"
          ><iconify-icon icon="fluent:more-horizontal-32-filled" /></Button
        >
        <Dropdown class="w-auto">
          <DropdownItem
            ><a href="/achievement/edit/{achievement._id}">Edit</a
            ></DropdownItem
          >
          <DropdownItem on:click={deleteAchievement}>Delete</DropdownItem>
        </Dropdown>
      {/if}
    </div>
    <div class="prose prose-neutral text-sm max-w-none">
      <SvelteMarkdown source={desc} />
    </div>
    <img
      class="object-cover h-auto w-full rounded mt-4"
      src="{import.meta.env.DBX_API_URL + '/' +achievement.imgAchievement}"
      alt=""
    />
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="flex justify-end my-2" on:click={toggleVissible}>
      <div class="cursor-pointer hover:underline text-sm">
        {#if comments.length > 0}
          {comments.length}
          {comments.length == 1 ? "comment" : "comments"}
        {/if}
      </div>
    </div>
    <hr />

    <div class="mt-2">
      <div class="flex mt-3 items-center">
        <img
          class="w-11 h-11 rounded-full object-cover"
          src={profilePicture}
          alt="Rounded avatar"
        />
        <form on:submit|preventDefault={addComment} class="w-full">
          <input
            bind:value={commentInput}
            on:focus={() => (commentVisible = true)}
            type="text"
            id="comment"
            placeholder="Add a comment..."
            class="bg-gray-50 ml-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </form>
      </div>
      {#if commentVisible}
        {#each comments as comment, i (comment)}
          <CommentCard
            comment={{
              ...comment,
              idAchievement: achievement._id,
              userIdAchievement,
              type: "achievement",
            }}
          />
        {/each}
      {/if}
    </div>
  </div>
{/if}

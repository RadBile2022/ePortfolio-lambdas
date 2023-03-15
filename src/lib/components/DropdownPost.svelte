<script>
  import { Button, Dropdown, DropdownItem } from "flowbite-svelte";
  import {api_url} from "$lib/end-point.js";
  import {onMount} from "svelte";
  import {goto} from "$app/navigation";


  export let idPost;

  export let userId ;



  // edit post
  async  function editPost(){
    localStorage.setItem("idPost",idPost);
    goto(`/post/edit/${idPost}`)
  }

  // delete post
  async function deletePost() {
    const response = await fetch(
      api_url + "/api/posts/" + idPost,
      {
        method: "DELETE",
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify({
          userId: userId,
        }),
      }
    );

    if (!response.ok) {
      const data = await response.json();
      alert(data);
    } else {
      window.location.reload();
    }
  }
</script>

<Button btnClass="p-0 h-3"
  >e<iconify-icon icon="fluent:more-horizontal-32-filled" /></Button
>
<Dropdown class="w-auto">
  <DropdownItem on:click={editPost}>Edit</DropdownItem>
  <DropdownItem on:click={deletePost}>Delete</DropdownItem>
</Dropdown>

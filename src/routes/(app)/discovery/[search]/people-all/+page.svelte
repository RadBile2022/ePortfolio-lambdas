<script>
    import PeopleCardDiscovery from "$lib/components/PeopleCardDiscovery.svelte";
    import {api_url} from "$lib/end-point.js";

    export let data;
    let userIdLocal = data.user.userId;
    let searchKeyword = data.params.search;
    let usersId = [];


    if (searchKeyword) getPeoples();
    // get all articles
    async function getPeoples() {
        let response = await fetch(
            api_url + `/api/users/search/${userIdLocal}/${searchKeyword}`
        );

        if (!response.ok) {
            alert(response.status);
        }

        const data = await response.json();
        usersId = data;
    }
</script>

<div class="md:container md:mx-auto my-16">
    <div class="flex justify-center">
        <div class="w-3/4">
            {#if usersId.length > 0}
                <div class="rounded-lg bg-gray-100">
                    <div class="pt-1" />
                    {#each usersId as userId, i}
                        {#if userIdLocal != userId}
                            <PeopleCardDiscovery {userId} />
                            {#if !(i == usersId.length - 1)}
                                <hr class="h-1 bg-gray-300" />
                            {:else}
                                <div
                                        class="py-1 w-full text-base font-medium text-center bg-gray-100 rounded-b-lg focus:ring-4 focus:outline-none focus:ring-gray-200"
                                ></div>
                            {/if}
                        {/if}
                    {/each}
                </div>
            {/if}
        </div>
    </div>
</div>

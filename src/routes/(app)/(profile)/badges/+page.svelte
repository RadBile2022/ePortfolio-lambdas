<script>
    import BadgeCard from "$lib/components/BadgeCard.svelte";
    import { writable } from "svelte/store";
    import { onMount } from "svelte";
    import {api_url} from "$lib/end-point.js";

    export let data;

    let userId=data.user.userId ;
    const badgeStore = writable(null);

    // get [search] user badges
    async function getBadges() {
        let response = await fetch(
            api_url + "/api/badges/all/" + userId
        );
        return response.ok ? await response.json() : null;
    }

    onMount(async () => {
        let badge = await getBadges();
        if (badge) badgeStore.update((data) => badge);
    });
</script>
    <!-- tabs content -->
    <a
            href="/badge/add"
            class="w-full mb-8 bg-blue-700 text-white hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-white font-medium rounded-lg text-sm px-5 py-3 text-center inline-flex items-center justify-center"
    >
        Add new badge
        <iconify-icon class="ml-2" icon="akar-icons:plus" />
    </a>

    <div class="grid grid-cols-1 md:grid-cols-3 mb-5  gap-2">
        {#if $badgeStore}
            {#each $badgeStore as $badge}
                <BadgeCard badge={$badge} />
            {/each}
        {/if}
    </div>

<!--<main class="md:mx-64">-->
<!--  <section>-->
<!--    <div class="md:container md:mx-auto my-16">-->
<!--      <div class="flex">-->
<!--        <ProfileBar active={"badges"} {userId} />-->

<!--        <div class="flex-initial w-3/4">-->
<!--          &lt;!&ndash; tabs &ndash;&gt;-->
<!--          <ProfileTabs active={"badges"} />-->


<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<!--  </section>-->
<!--</main>-->

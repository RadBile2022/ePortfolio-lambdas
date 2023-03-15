<script>
    import {writable} from "svelte/store";
    import {onMount} from "svelte";
    import ActivityCard from "$lib/components/ActivityCard.svelte";
    import {api_url} from "$lib/end-point.js";


    export let data;
    let userId = data.id;

    let userIdLocal = data.user.userId;
    const activitiestore = writable(null);

    let all = [];

    // get [search] user activities
    async function getActivitiy() {
        let response = await fetch(
            api_url + "/api/activities/all/" + userId
        );
        return response.ok ? await response.json() : null;
    }

    onMount(async () => {
        let activitiy = await getActivitiy();
        if (activitiy) {
            activitiy.forEach((element) => {
                // filter private activitiy
                if (element.isPublic == false && element.userId != userIdLocal) {
                } else {
                    all.push(element);
                    all = all;
                }
                // sorting activitiy
                all.sort(function (a, b) {
                    // @ts-ignore
                    return new Date(b.createdAt) - new Date(a.createdAt);
                });
            });
            activitiestore.update((data) => all);
        }
    });
</script>
<div className="2xl:mx-60">
        <!-- tabs content -->
        {#if $activitiestore}
            {#each $activitiestore as $activity}
                <ActivityCard activity={$activity} userId="{userIdLocal}"/>
            {/each}
        {/if}

</div>

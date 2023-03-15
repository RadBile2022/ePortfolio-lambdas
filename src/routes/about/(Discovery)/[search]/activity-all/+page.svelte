<script>
    import ActivityCard from "$lib/components/ActivityCard.svelte";
    import {api_url} from "$lib/end-point.js";
    export let data;
    let userIdLocal = data.user.userId;
    let searchKeyword = data.params.search;
    let activities = [];
    if (searchKeyword) getActivities();

    // get all activities
    async function getActivities() {
        let response = await fetch(
            api_url + `/api/activities/search/${searchKeyword}`
        );

        if (!response.ok) {
            alert(response.status);
        }

        const data = await response.json();
        let temp = data;
        temp.forEach((element) => {
            // filter private activity
            if (element.isPublic == false && element.userId != userIdLocal) {
            } else {
                activities.push(element);
                activities = activities;
            }
        });
    }
</script>

<div class="md:container md:mx-auto my-16">
    <div class="flex justify-center">
        <div class="w-full md:mx-32">
            {#if activities.length > 0}
                {#each activities as activity}
                    <ActivityCard {activity} userId="{userIdLocal}" />
                {/each}
            {/if}
        </div>
    </div>
</div>

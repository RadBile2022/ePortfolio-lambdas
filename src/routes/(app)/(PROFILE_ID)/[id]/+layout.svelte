<script>
    import ProfileBar from "$lib/components/ProfileBar.svelte";
    import UserProfileTabs from "$lib/components/UserProfileTabs.svelte";
    export let data;
    export let active;
     let userId=data.id;
</script>

<main class="mx-5">
    <section class="grid grid-cols-1 md:grid-cols-3 md:gap-6">
        <div class="">
            <ProfileBar {active} {userId} />
        </div>

        <div class="flex-initial md:col-span-2">
            <!--tabs-->
            <UserProfileTabs {userId} {active}/>

            <slot/>

        </div>
    </section>
</main>


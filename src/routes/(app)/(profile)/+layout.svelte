<script>
    import ProfileBar from "$lib/components/ProfileBar.svelte";
    import ProfileTabs from "$lib/components/ProfileTabs.svelte";
    import {onMount} from "svelte";
    import AboutMe from "$lib/components/AboutMe.svelte";

    export let data;
    let userId = data.user.userId;


    // onMount(()=>{
    //     userId = localStorage.getItem("userId");
    //     // console.log(userId)
    //
    // })

    // onMount(() => {
    //     userIdLocal = localStorage.getItem("userId");
    //     jwt = localStorage.getItem("jwt");
    // });
    export let active;
</script>


<main class="">
    <section>
        <div class="md:grid md:grid-cols-3 2xl:mx-60">
            <div class=" ">
                <ProfileBar  {userId}/>
            </div>

            <div class="mx-5 col-span-2 ">
                <!-- tabs -->
                <!--                <ProfileTabs active={"profile"}/>-->
                <ProfileTabs {active}/>
                <!-- tabs content -->
                                <slot/>

            </div>
        </div>

    </section>
</main>


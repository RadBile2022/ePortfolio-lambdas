<script>
    // import ProfileBar from "$lib/components/ProfileBar.svelte";
    // import ProfileTabs from "$lib/components/ProfileTabs.svelte";
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


<!--<main class="">-->
<!--    <section>-->
<!--        <div class="md:grid md:grid-cols-3 2xl:mx-60">-->
<!--            <div class=" ">-->
<!--                <p>{userId}</p>-->

<!--                <ProfileBar  {userId}/>-->
<!--            </div>-->

<!--            <div class="mx-5 col-span-2 ">-->
<!--                &lt;!&ndash; tabs &ndash;&gt;-->
<!--                &lt;!&ndash;                <ProfileTabs active={"profile"}/>&ndash;&gt;-->
<!--                <ProfileTabs {active}/>-->
<!--                &lt;!&ndash; tabs content &ndash;&gt;-->
<!--&lt;!&ndash;                <slot/>&ndash;&gt;-->
                <AboutMe {userId}/>

<!--            </div>-->
<!--        </div>-->

<!--    </section>-->
<!--</main>-->


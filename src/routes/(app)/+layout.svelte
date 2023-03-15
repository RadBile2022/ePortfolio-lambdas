<script>
    import Header from "$lib/components/Header.svelte";
    export let data;
    let userId = data.user.userId;

</script>

<header>
    <Header  active="home" {userId}></Header>
</header>

<main class="lg:mx-44">
    <slot/>
</main>

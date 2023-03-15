<script>
    // import {api_url} from "$lib/end-point.js";
    export let data;
 let email,
        password,
        wrongpass = false,
        notfound = false;
    // login
</script>

<section class="bg-gray-50 dark:bg-gray-900">
    <div
            class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
    >
        <a
                href="/login"
                class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
            <img
                    class="w-8 h-8 mr-2"
                    src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
                    alt="logo"
            />
            ePortfolio
        </a>
        <div
                class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
        >
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1
                        class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
                >
                    Sign in to your account
                </h1>
                <form class="space-y-4 md:space-y-6" method="POST" action="?/login">
                    <div>
                        <label
                                for="email"
                                class="block mb-2 font-medium text-gray-900 dark:text-white"
                        >Your email</label
                        >
                        <input
                                bind:value={email}
                                type="email"
                                name="email"
                                id="email"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="name@company.com"
                                required
                        />
                        {#if notfound}
                            <div class="text-sm text-red-500 mt-1">User Not Found</div>
                        {/if}
                    </div>
                    <div>
                        <label
                                for="password"
                                class="block mb-2 font-medium text-gray-900 dark:text-white"
                        >Password</label
                        >
                        <input
                                bind:value={password}
                                type="password"
                                name="password"
                                id="password"
                                placeholder="••••••••"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required
                        />
                        {#if wrongpass}
                            <div class="text-sm text-red-500 mt-1">Wrong Password</div>
                        {/if}
                    </div>

                    <button
                            type="submit"
                            class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                    >Sign in</button
                    >
                    <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                        Don't have an account yet? <a
                            href="signup"
                            class="font-medium text-blue-600 hover:underline dark:text-blue-500"
                    >Sign up</a
                    >
                    </p>
                </form>
            </div>
        </div>
    </div>
</section>



<!--<script>-->
<!--    import {api_url} from "$lib/end-point.js";-->

<!--    let email,-->
<!--        password,-->
<!--        wrongpass = false,-->
<!--        notfound = false;-->
<!--    // login-->
<!--       async function login() {-->
<!--        wrongpass = false;-->
<!--        notfound = false;-->

<!--        const response = await fetch(-->
<!--            api_url + "/api/auth/login", {-->
<!--                method: "POST",-->
<!--                headers: { "Content-Type": "application/json" },-->
<!--                credentials: "include",-->
<!--                body: JSON.stringify({-->
<!--                    email,-->
<!--                    password,-->
<!--                }),-->
<!--            });-->

<!--        if (!response.ok) {-->
<!--            const data = await response.json();-->
<!--            if (data == "Wrong password") {-->
<!--                wrongpass = true;-->
<!--            } else if (data == "User not found") {-->
<!--                notfound = true;-->
<!--            }-->
<!--        } else {-->
<!--            const data = await response.json();-->
<!--            localStorage.setItem("jwt", data.jwt);-->
<!--            localStorage.setItem("userId", data.userId);-->
<!--            document.location.href = "/home";-->
<!--        }-->
<!--    }-->
<!--</script>-->

<!--<section class="bg-gray-50 dark:bg-gray-900">-->
<!--    <div-->
<!--            class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"-->
<!--    >-->
<!--        <a-->
<!--                href="/login"-->
<!--                class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"-->
<!--        >-->
<!--            <img-->
<!--                    class="w-8 h-8 mr-2"-->
<!--                    src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"-->
<!--                    alt="logo"-->
<!--            />-->
<!--            ePortfolio-->
<!--        </a>-->
<!--        <div-->
<!--                class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"-->
<!--        >-->
<!--            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">-->
<!--                <h1-->
<!--                        class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"-->
<!--                >-->
<!--                    Sign in to your account-->
<!--                </h1>-->
<!--                <form class="space-y-4 md:space-y-6" on:submit|preventDefault={login}>-->
<!--                    <div>-->
<!--                        <label-->
<!--                                for="email"-->
<!--                                class="block mb-2 font-medium text-gray-900 dark:text-white"-->
<!--                        >Your email</label-->
<!--                        >-->
<!--                        <input-->
<!--                                bind:value={email}-->
<!--                                type="email"-->
<!--                                name="email"-->
<!--                                id="email"-->
<!--                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"-->
<!--                                placeholder="name@company.com"-->
<!--                                required-->
<!--                        />-->
<!--                        {#if notfound}-->
<!--                            <div class="text-sm text-red-500 mt-1">User Not Found</div>-->
<!--                        {/if}-->
<!--                    </div>-->
<!--                    <div>-->
<!--                        <label-->
<!--                                for="password"-->
<!--                                class="block mb-2 font-medium text-gray-900 dark:text-white"-->
<!--                        >Password</label-->
<!--                        >-->
<!--                        <input-->
<!--                                bind:value={password}-->
<!--                                type="password"-->
<!--                                name="password"-->
<!--                                id="password"-->
<!--                                placeholder="••••••••"-->
<!--                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"-->
<!--                                required-->
<!--                        />-->
<!--                        {#if wrongpass}-->
<!--                            <div class="text-sm text-red-500 mt-1">Wrong Password</div>-->
<!--                        {/if}-->
<!--                    </div>-->

<!--                    <button-->
<!--                            type="submit"-->
<!--                            class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "-->
<!--                    >Sign in</button-->
<!--                    >-->
<!--                    <p class="text-sm font-light text-gray-500 dark:text-gray-400">-->
<!--                        Don't have an account yet? <a-->
<!--                            href="signup"-->
<!--                            class="font-medium text-blue-600 hover:underline dark:text-blue-500"-->
<!--                    >Sign up</a-->
<!--                    >-->
<!--                    </p>-->
<!--                </form>-->
<!--            </div>-->
<!--        </div>-->
<!--    </div>-->
<!--</section>-->

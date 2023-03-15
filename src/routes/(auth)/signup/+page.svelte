<script>
    import {
        useForm,
        Hint,
        HintGroup,
        validators,
        required,
        minLength,
        email,
    } from "svelte-use-form";
    import { passwordMatch, containNumbers } from "../customValidators.js";
    import {api_url,default_img} from "$lib/end-point.js";

    import {goto} from"$app/navigation";

    const form = useForm();

    const requiredMessage = "This field is required";

    let username,
        emailUser,
        password,
        role,
        organization,
        registered = false;

    // register
    async function register() {
        registered = false;
        const response = await fetch(
            api_url + "/api/auth/register",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: emailUser,
                    username,
                    password,
                    role,
                    organization,
                }),
            }
        );

        if (!response.ok) {
            // alert(response.statusText);
            const data = await response.json();
            if (data == "Email already registered") {
                registered = true;
            }
        } else {
            goto("/login");
        }
    }
</script>

<section class="bg-gray-50 dark:bg-gray-900">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto ">
        <a
                href="#/"
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
                    Create an account
                </h1>
                <form
                        on:submit|preventDefault={register}
                        class="space-y-4 md:space-y-6"
                        use:form
                >
                    <div>
                        <label
                                for="email"
                                class="block mb-2 font-medium text-gray-900 dark:text-white"
                        >Email</label
                        >
                        <input
                                bind:value={emailUser}
                                use:validators={[required, email]}
                                type="email"
                                name="email"
                                id="email"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="name@company.com"
                                required
                        />
                        {#if registered}
                            <div class="text-sm text-red-500 mt-1">
                                Email is already registered
                            </div>
                        {/if}
                        <HintGroup for="email">
                            <Hint on="required"
                            ><div class="text-sm mt-2 text-red-600">
                                {requiredMessage}
                            </div></Hint
                            >
                            <Hint on="email" hideWhenRequired
                            ><div class="text-sm mt-2 text-red-600">
                                This must be a valid email
                            </div></Hint
                            >
                        </HintGroup>
                    </div>
                    <div>
                        <label
                                for="name"
                                class="block mb-2 font-medium text-gray-900 dark:text-white"
                        >Name</label
                        >
                        <input
                                bind:value={username}
                                use:validators={[required]}
                                type="text"
                                name="name"
                                id="name"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Your Name"
                                required
                        />
                        <HintGroup for="name">
                            <Hint on="required"
                            ><div class="text-sm mt-2 text-red-600">
                                {requiredMessage}
                            </div></Hint
                            >
                        </HintGroup>
                    </div>
                    <div>
                        <label
                                for="role"
                                class="block mb-2 font-medium text-gray-900 dark:text-white"
                        >Role</label
                        >
                        <select
                                bind:value={role}
                                id="role"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                            <option value="mahasiswa">Mahasiswa</option>
                            <option value="dosen">Dosen</option>
                        </select>
                    </div>
                    <div>
                        <label
                                for="organization"
                                class="block mb-2 font-medium text-gray-900 dark:text-white"
                        >Organization</label
                        >
                        <input
                                bind:value={organization}
                                use:validators={[required]}
                                type="text"
                                name="organization"
                                id="organization"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder=""
                                required
                        />
                        <HintGroup for="organization">
                            <Hint on="required"
                            ><div class="text-sm mt-2 text-red-600">
                                {requiredMessage}
                            </div></Hint
                            >
                        </HintGroup>
                    </div>
                    <div>
                        <label
                                for="password"
                                class="block mb-2 font-medium text-gray-900 dark:text-white"
                        >Password</label
                        >
                        <input
                                use:validators={[required, minLength(8), containNumbers(2)]}
                                type="password"
                                name="password"
                                id="password"
                                placeholder="••••••••"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required
                        />
                        <HintGroup for="password">
                            <Hint on="required"
                            ><div class="text-sm mt-2 text-red-600">
                                {requiredMessage}
                            </div></Hint
                            >
                            <Hint on="minLength" hideWhenRequired let:value
                            ><div class="text-sm mt-2 text-red-600">
                                This field must have at least {value} characters.
                            </div></Hint
                            >
                            <Hint on="containNumbers" hideWhen="minLength" let:value>
                                <div class="text-sm mt-2 text-red-600">
                                    This field must contain at least {value} numbers.
                                </div>
                            </Hint>
                        </HintGroup>
                    </div>
                    <div>
                        <label
                                for="passwordConfirmation"
                                class="block mb-2 font-medium text-gray-900 dark:text-white"
                        >Confirm password</label
                        >
                        <input
                                bind:value={password}
                                use:validators={[required, passwordMatch]}
                                type="password"
                                name="passwordConfirmation"
                                id="passwordConfirmation"
                                placeholder="••••••••"
                                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required
                        />
                        <HintGroup for="passwordConfirmation">
                            <Hint on="required"
                            ><div class="text-sm mt-2 text-red-600">
                                {requiredMessage}
                            </div></Hint
                            >
                            <Hint on="passwordMatch" hideWhenRequired
                            ><div class="text-sm mt-2 text-red-600">
                                Passwords do not match
                            </div></Hint
                            >
                        </HintGroup><br />
                    </div>

                    <button
                            disabled={!$form.valid}
                            type="submit"
                            class="w-full {!$form.valid
              ? 'cursor-not-allowed'
              : ''} text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >Create an account</button
                    >
                    <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                        Already have an account? <a
                            href="login"
                            class="font-medium text-blue-600 hover:underline dark:text-blue-500"
                    >Login here</a
                    >
                    </p>
                </form>
            </div>
        </div>
    </div>
</section>

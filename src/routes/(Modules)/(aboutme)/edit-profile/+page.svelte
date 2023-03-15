<script>
    import {api_url,default_img} from "$lib/end-point.js";
    import {onMount} from "svelte";

    export let data;
    let alert,
        src,
        files,
        userData,
        name,
        role,
        nim,
        major,
        organization,
        city,
        dateBirth,
        gender,
        academicField,
        interest = "",
        maxImage;

    // preview profile picture
    function loadFile(e) {
        if (e.target.files[0].size <= 2 * 1024 * 1024) {
            src = URL.createObjectURL(e.target.files[0]);
            maxImage = false;
        } else {
            window.alert("Maximum image size is 2MB");
            maxImage = true;
        }
    }

    // get userId from localStorage
    let userId =data.user.userId ;

    getUser();


    // get data user
    async function getUser() {
        const response = await fetch(
            api_url + "/api/users/" + userId,
            {
                method: "GET",
            }
        );

        if (!response.ok) {
            document.location.href = "/login";
            localStorage.clear();
        }

        const data = await response.json();
        userData = data;
        name = userData.username;
        role = userData.role;
        nim = userData.nim;
        major = userData.major;
        organization = userData.organization;
        city = userData.city;
        academicField = userData.academicField;
        if (userData.dateBirth) {
            dateBirth = new Date(userData.dateBirth).toLocaleDateString("en-CA");
        } else {
            dateBirth = null;
        }

        if (userData.gender) {
            gender = userData.gender;
        } else {
            alert.classList.remove("hidden");
            gender = "";
        }
        userData.role ? (role = userData.role) : (role = "");
        interest = userData.interest ? userData.interest : " ";
        if (userData.profilePicture) {
            src = api_url + "/" + userData.profilePicture;
        } else {
            src = default_img;
        }
    }


    // update data user
    async function update() {
        if (maxImage) {
            window.alert("Maximum image size is 2MB");
        } else {
            let response;
            if (files) {
                var dataUpdate = new FormData();
                dataUpdate.append("userId", userId);
                dataUpdate.append("email", userData.email);
                dataUpdate.append("username", name);
                dataUpdate.append("role", role);
                dataUpdate.append("nim", nim);
                dataUpdate.append("major", major);
                dataUpdate.append("organization", organization);
                dataUpdate.append("city", city);
                dataUpdate.append("dateBirth", dateBirth);
                dataUpdate.append("gender", gender);
                dataUpdate.append("interest", interest);
                dataUpdate.append("academicField", academicField);
                dataUpdate.append("profilePicture", files[0]);

                response = await fetch(
                    api_url + "/api/users/" + userId,
                    {
                        method: "PUT",
                        body: dataUpdate,
                    }
                );
            } else {
                response = await fetch(
                    api_url + "/api/users/" + userId,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            userId: userId,
                            email: userData.email,
                            username: name,
                            role: role,
                            nim: nim,
                            major: major,
                            organization,
                            city: city,
                            dateBirth: dateBirth,
                            gender: gender,
                            interest: interest,
                            academicField,
                        }),
                    }
                );
            }

            if (!response.ok) {
                const data = await response.json();
                console.log(data);
            } else {
                window.location.href = "/profile";
            }
        }
    }
</script>

<section class="bg-white dark:bg-gray-900">
    <div class="max-w-2xl px-4 py-8 mx-auto lg:py-16">
        <div
                bind:this={alert}
                class="hidden p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
                role="alert"
        >
            <span class="font-medium">Please complete all details</span>
        </div>
        <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">
            Update Profile
        </h2>
        {#if userData}
            <form
                    action="#"
                    on:submit|preventDefault={update}
                    enctype="multipart/form-data"
            >
                <div class="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
                    <div>
                        <img
                                class="w-36 h-36 rounded-full mb-4 object-cover ring-2 ring-gray-200 p-1"
                                {src}
                                alt="Default avatar"
                        />
                        <input
                                bind:files
                                on:change={loadFile}
                                type="file"
                                accept=".jpg, .jpeg, .png"
                        />
                        <div class="text-sm mt-2 text-red-500">
                            *Maximum image size is 2MB
                        </div>
                    </div>
                    <div class="sm:col-span-2">
                        <label
                                for="name"
                                class="block mb-2 font-medium text-gray-900 dark:text-white"
                        >Name*</label
                        >
                        <input
                                bind:value={name}
                                type="text"
                                name="name"
                                id="name"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Type your name"
                                required
                        />
                    </div>
                    {#if role == "mahasiswa"}
                        <div class="w-full">
                            <label
                                    for="nim"
                                    class="block mb-2 font-medium text-gray-900 dark:text-white"
                            >NIM*</label
                            >
                            <input
                                    bind:value={nim}
                                    type="text"
                                    name="nim"
                                    id="nim"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Your NIM"
                                    required
                            />
                        </div>
                        <div class="w-full">
                            <label
                                    for="major"
                                    class="block mb-2 font-medium text-gray-900 dark:text-white"
                            >Major*</label
                            >
                            <input
                                    bind:value={major}
                                    type="text"
                                    name="major"
                                    id="major"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Your Major"
                                    required
                            />
                        </div>
                    {/if}
                    <div class="w-full">
                        <label
                                for="organization"
                                class="block mb-2 font-medium text-gray-900 dark:text-white"
                        >Organization*</label
                        >
                        <input
                                bind:value={organization}
                                type="text"
                                name="organization"
                                id="organization"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required
                        />
                    </div>
                    <div class="w-full">
                        <label
                                for="city"
                                class="block mb-2 font-medium text-gray-900 dark:text-white"
                        >City</label
                        >
                        <input
                                bind:value={city}
                                type="text"
                                name="city"
                                id="city"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Your city"
                        />
                    </div>
                    <div class="w-full">
                        <label
                                for="dateBirth"
                                class="block mb-2 font-medium text-gray-900 dark:text-white"
                        >Date of birth*</label
                        >
                        <input
                                bind:value={dateBirth}
                                type="date"
                                name="dateBirth"
                                required
                                id="dateBirth"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Your Major"
                        />
                    </div>
                    <div class="w-full">
                        <label
                                for="gender"
                                class="block mb-2 font-medium text-gray-900 dark:text-white"
                        >Gender*</label
                        >
                        <select
                                bind:value={gender}
                                id="gender"
                                required
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
                    <div class="w-full">
                        <label
                                for="role"
                                class="block mb-2 font-medium text-gray-900 dark:text-white"
                        >Role*</label
                        >
                        <select
                                bind:value={role}
                                id="role"
                                required
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                            <option value="dosen">Dosen</option>
                            <option value="mahasiswa">Mahasiswa</option>
                        </select>
                    </div>
                    {#if role == "mahasiswa"}
                        <div class="sm:col-span-2">
                            <label
                                    for="interest"
                                    class="block mb-2 font-medium text-gray-900 dark:text-white"
                            >Interest</label
                            >
                            <textarea
                                    bind:value={interest}
                                    id="interest"
                                    rows="8"
                                    class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Write your interest here..."
                            />
                        </div>
                    {:else}
                        <div class="sm:col-span-2">
                            <label
                                    for="academic-field"
                                    class="block mb-2 font-medium text-gray-900 dark:text-white"
                            >Academic Field</label
                            >
                            <textarea
                                    bind:value={academicField}
                                    id="academic-field"
                                    rows="5"
                                    class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Ex: Artificial Neural Network, Internet of Things, Software-Defined Networking"
                            />
                        </div>
                    {/if}
                </div>
                <div class="flex items-center justify-end space-x-4">
                    <button
                            type="submit"
                            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Update
                    </button>
                    {#if gender}
                        <button
                                type="button"
                                on:click={() => history.back()}
                                class="text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                        >
                            Cancel
                        </button>
                    {/if}
                </div>
            </form>
        {/if}
    </div>
</section>

<script>
    import MarkdownViewer from "$lib/components/MarkdownViewer.svelte";
    import {goto} from "$app/navigation";
    import {api_url} from "$lib/end-point.js";

    export let data;
     let userId =data.id;

    let userData,
        name,
        role,
        profilePicture,
        nim,
        major,
        organization,
        city,
        dateBirth,
        gender,
        interest,
        about,
        socmed,
        ig,
        linkedin,
        twitter,
        facebook,
        github,
        lastActivity,
        academicField,
        skills = [],
        blocks = [],
        dateLastActivity;

    // get data user
    async function getUser() {
        const response = await fetch(
            api_url + "/api/users/" + userId
        );

        if (!response.ok) {
            goto("/login");
            localStorage.clear();
        }

        const data = await response.json();
        userData = data;
        name = userData.username;
        role = userData.role;
        nim = userData.nim;
        major = userData.major;
        organization = userData.organization;
        city = userData.city != "undefined" ? userData.city : null;
        about = userData.about;
        socmed = userData.socialMedia;
        ig = socmed.instagram;
        linkedin = socmed.linkedin;
        twitter = socmed.twitter;
        github = socmed.github;
        facebook = socmed.facebook;
        skills = userData.skill;
        blocks = userData.blockProfile;
        academicField =
            userData.academicField != "undefined" ? userData.academicField : null;
        userData.gender ? (gender = userData.gender) : (gender = "male");
        interest = userData.interest;
        if (userData.dateBirth) {
            dateBirth = new Date(userData.dateBirth).toLocaleDateString("en", {
                day: "numeric",
                month: "long",
                year: "numeric",
            });
        } else {
            dateBirth = null;
        }
        if (userData.profilePicture) {
            profilePicture = api_url + "/" + userData.profilePicture;
        } else {
            profilePicture = "/icon-user.png";
        }
    }

    getUser();

    // get last post
    async function getLastActivity() {
        const response = await fetch(
            api_url + "/api/activities/last/" + userId,
            {
                method: "GET",
            }
        );

        if (!response.ok) {
            alert(response.statusText);
        }

        const data = await response.json();
        lastActivity = data;
        if (lastActivity) {
            if (lastActivity.endDate) {
                dateLastActivity = new Date(lastActivity.endDate);
            } else {
                dateLastActivity = new Date(lastActivity.startDate);
            }
        }
    }

    getLastActivity();
</script>

{#if userData}
    <div class="2xl:mx-60">
            <!-- tabs content -->
            <div class="md:container md:mx-auto">
                <div class="bg-gray-300 rounded-md p-4 mb-8">
                    <div class="flex justify-between align-middle mb-2">
                        <h2 class="font-bold text-xl">Personal Information</h2>
                    </div>
                    <div class="bg-white p-3 rounded-md">
                        <b>Name</b>: {name} <br />
                        {#if role == "mahasiswa"}
                            <b>Student ID</b>: {nim ? nim : ""}<br />
                            <b>Major</b>: {major ? major : ""}<br />
                        {:else}
                            <div class="">
                                <b>Academic Field</b>:
                                <span>{academicField ? academicField : ""}</span>
                            </div>
                        {/if}
                        <b>Organization</b>: {organization ? organization : ""} <br />
                        <b>City</b>: {city ? city : ""} <br />
                        <b>Date Of Birth</b>: {dateBirth ? dateBirth : ""}<br />
                        <b>Gender</b>:
                        <span class="capitalize">{gender ? gender : ""}</span><br />
                        <b>Role</b>:
                        <span class="capitalize">{role ? role : ""}</span>
                    </div>
                </div>

                <div class="bg-gray-300 rounded-md p-4 mb-8">
                    <div class="flex justify-between align-middle mb-2">
                        <h2 class="font-bold text-xl">About Me</h2>
                    </div>
                    <div class="bg-white p-3 rounded-md ">
                        {#if about}
                            <MarkdownViewer value="{about}"  --color-markdown-viewer-bg="theme(colors.white)"  />
                        {/if}
                    </div>
                </div>

                <div class="bg-gray-300 rounded-md p-4 mb-8">
                    <div class="flex justify-between align-middle mb-2">
                        <h2 class="font-bold text-xl">Newest Activity</h2>
                    </div>
                    <div class="bg-white p-3 rounded-md">
                        {#if lastActivity}
                            <a href="/activity/{lastActivity._id}">
                                <div class="font-light text-xs mb-3">
                                    {dateLastActivity
                                        ? dateLastActivity.toLocaleDateString("en", {
                                            day: "numeric",
                                            month: "long",
                                            year: "numeric",
                                        })
                                        : ""}
                                </div>
                                <div class="font-bold text-xl leading-tight">
                                    {lastActivity.title}
                                </div>
                            </a>
                        {:else}
                            <div class="font-bold">
                                {name} doesn't have any completed activities yet
                            </div>
                            <div class="text-sm">
                                Recent completed activity {name} share will be displayed here
                            </div>
                        {/if}
                    </div>
                    <div class="flex justify-center mt-2">
                        <a
                                href="/activities/{userId}"
                                class="inline-flex items-center font-medium text-gray-600 hover:underline"
                        >
                            Show All Activities
                            <svg
                                    aria-hidden="true"
                                    class="ml-1 w-5 h-5"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                        fill-rule="evenodd"
                                        d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                                        clip-rule="evenodd"
                                />
                            </svg>
                        </a>
                    </div>
                </div>

                <div class="bg-gray-300 rounded-md p-4 mb-8">
                    <div class="flex justify-between align-middle mb-2">
                        <h2 class="font-bold text-xl">Social Media</h2>
                    </div>
                    <div class="bg-white p-3 rounded-md">
                        <div class="flex flex-wrap">
                            {#if linkedin}
                                <a
                                        href={linkedin}
                                        target="_blank"
                                        rel="noreferrer"
                                        class="text-white bg-[#0077b5] hover:bg-[#0077b5]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 mr-2 my-2"
                                >
                                    <iconify-icon
                                            icon="akar-icons:linkedin-box-fill"
                                            class="mr-2"
                                    />
                                    LinkedIn
                                </a>
                            {/if}
                            {#if github}
                                <a
                                        href={github}
                                        target="_blank"
                                        rel="noreferrer"
                                        class="text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 mr-2 my-2"
                                >
                                    <svg
                                            class="mr-2 -ml-1 w-4 h-4"
                                            aria-hidden="true"
                                            focusable="false"
                                            data-prefix="fab"
                                            data-icon="github"
                                            role="img"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 496 512"
                                    >
                                        <path
                                                fill="currentColor"
                                                d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
                                        />
                                    </svg>
                                    Github
                                </a>
                            {/if}
                            {#if ig}
                                <a
                                        href={ig}
                                        target="_blank"
                                        rel="noreferrer"
                                        class="text-white bg-[#fb3958] hover:bg-[#fb3958]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 mr-2 my-2"
                                >
                                    <iconify-icon
                                            icon="akar-icons:instagram-fill"
                                            class="mr-2"
                                    />
                                    Instagram
                                </a>
                            {/if}
                            {#if facebook}
                                <a
                                        href={facebook}
                                        target="_blank"
                                        rel="noreferrer"
                                        class="text-white bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 mr-2 my-2"
                                >
                                    <iconify-icon
                                            icon="akar-icons:facebook-fill"
                                            class="mr-2"
                                    />
                                    Facebook
                                </a>
                            {/if}
                            {#if twitter}
                                <a
                                        href={twitter}
                                        target="_blank"
                                        rel="noreferrer"
                                        class="text-white bg-[#1da1f2] hover:bg-[#1da1f2]/90 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#1da1f2]/55 mr-2 my-2"
                                >
                                    <svg
                                            class="mr-2 -ml-1 w-4 h-4"
                                            aria-hidden="true"
                                            focusable="false"
                                            data-prefix="fab"
                                            data-icon="twitter"
                                            role="img"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 512 512"
                                    >
                                        <path
                                                fill="currentColor"
                                                d="M459.4 151.7c.325 4.548 .325 9.097 .325 13.65 0 138.7-105.6 298.6-298.6 298.6-59.45 0-114.7-17.22-161.1-47.11 8.447 .974 16.57 1.299 25.34 1.299 49.06 0 94.21-16.57 130.3-44.83-46.13-.975-84.79-31.19-98.11-72.77 6.498 .974 12.99 1.624 19.82 1.624 9.421 0 18.84-1.3 27.61-3.573-48.08-9.747-84.14-51.98-84.14-102.1v-1.299c13.97 7.797 30.21 12.67 47.43 13.32-28.26-18.84-46.78-51.01-46.78-87.39 0-19.49 5.197-37.36 14.29-52.95 51.65 63.67 129.3 105.3 216.4 109.8-1.624-7.797-2.599-15.92-2.599-24.04 0-57.83 46.78-104.9 104.9-104.9 30.21 0 57.5 12.67 76.67 33.14 23.72-4.548 46.46-13.32 66.6-25.34-7.798 24.37-24.37 44.83-46.13 57.83 21.12-2.273 41.58-8.122 60.43-16.24-14.29 20.79-32.16 39.31-52.63 54.25z"
                                        />
                                    </svg>
                                    Twitter
                                </a>
                            {/if}
                        </div>
                    </div>
                </div>

                <div class="bg-gray-300 rounded-md p-4 mb-8">
                    <div class="flex justify-between align-middle mb-2">
                        <h2 class="font-bold text-xl">Skills</h2>
                    </div>
                    <div class="bg-white p-3 rounded-md">
                        <div class="flex flex-wrap">
                            {#each skills as skill, i (skill)}
                                <div
                                        class="text-gray-900 bg-white border border-gray-300 focus:outline-none  focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-3 my-1.5"
                                >
                                    <a
                                            class="no-underline hover:underline"
                                            href="/discovery?search={skill}">{skill}</a
                                    >
                                </div>
                            {/each}
                        </div>
                    </div>
                </div>

                {#each blocks as block, i (block)}
                    <div class="bg-gray-300 rounded-md p-4 mb-8">
                        <div class="flex justify-between align-middle mb-2">
                            <h2 class="font-bold text-xl">{block.title}</h2>
                        </div>
                        <div class="bg-white p-3 rounded-md prose prose-neutral">
                            {#if about}
                                <MarkdownViewer value={block.desc} />
                            {/if}
                        </div>
                    </div>
                {/each}
            </div>
    </div>
{/if}



<!--  <main class="mx-5">-->
<!--    <section class="grid grid-cols-1 md:grid-cols-3 md:gap-6">-->
<!--      <div class="">-->
<!--        <ProfileBar active={"aboutme"} {userId} />-->
<!--      </div>-->

<!--      <div class="flex-initial  md:col-span-2">-->
<!--        &lt;!&ndash; tabs &ndash;&gt;-->
<!--        <div-->
<!--                class="mb-4 text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700"-->
<!--        >-->
<!--          <ul class="flex flex-wrap -mb-px">-->
<!--            <li class="mr-2">-->
<!--              <a-->
<!--                      href="/profile/{userId}"-->
<!--                      class="border-blue-600 text-blue-600 inline-block p-4 rounded-t-lg border-b-2 "-->
<!--              >About Me</a-->
<!--              >-->
<!--            </li>-->
<!--            <li class="mr-2">-->
<!--              <a-->
<!--                      href="/posts/{userId}"-->
<!--                      class="border-transparent hover:text-gray-600 hover:border-gray-300 inline-block p-4 rounded-t-lg border-b-2"-->
<!--                      aria-current="page">Posts</a-->
<!--              >-->
<!--            </li>-->
<!--            <li class="mr-2">-->
<!--              <a-->
<!--                      href="/articles/{userId}"-->
<!--                      class="border-transparent hover:text-gray-600 hover:border-gray-300 inline-block p-4 rounded-t-lg border-b-2 "-->
<!--              >Articles</a-->
<!--              >-->
<!--            </li>-->
<!--            <li class="mr-2">-->
<!--              <a-->
<!--                      href="/activities/{userId}"-->
<!--                      class="border-transparent hover:text-gray-600 hover:border-gray-300 inline-block p-4 rounded-t-lg border-b-2 "-->
<!--              >Activities</a-->
<!--              >-->
<!--            </li>-->
<!--            <li class="mr-2">-->
<!--              <a-->
<!--                      href="/projects/{userId}"-->
<!--                      class="border-transparent hover:text-gray-600 hover:border-gray-300 inline-block p-4 rounded-t-lg border-b-2 "-->
<!--              >Projects</a-->
<!--              >-->
<!--            </li>-->
<!--            <li class="mr-2">-->
<!--              <a-->
<!--                      href="/badges/{userId}"-->
<!--                      class="border-transparent hover:text-gray-600 hover:border-gray-300 inline-block p-4 rounded-t-lg border-b-2 "-->
<!--              >Badges</a-->
<!--              >-->
<!--            </li>-->
<!--          </ul>-->
<!--        </div>-->


<!--      </div>-->

<!--    </section>-->

<!--&lt;!&ndash;    <section>&ndash;&gt;-->
<!--&lt;!&ndash;      <div class="md:container md:mx-auto my-16">&ndash;&gt;-->


<!--&lt;!&ndash;        <div class="flex">&ndash;&gt;-->

<!--&lt;!&ndash;        </div>&ndash;&gt;-->
<!--&lt;!&ndash;      </div>&ndash;&gt;-->
<!--&lt;!&ndash;    </section>&ndash;&gt;-->
<!--  </main>-->

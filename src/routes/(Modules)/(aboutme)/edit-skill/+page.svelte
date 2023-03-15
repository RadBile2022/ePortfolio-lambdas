<script>
    import { skillsData } from "$lib/components/skillsData.js";
    import Skill from "$lib/components/Skill.svelte";
    import {goto} from "$app/navigation";
    import {onMount} from "svelte";
    import {api_url} from "$lib/end-point.js";
    export let data;


    let skills = [],
        userData;

    // get userId from localStorage
    let userId = data.user.userId;

    /* FILTERING countres DATA BASED ON INPUT */
    let filteredCountries = [];
    // $: console.log(filteredCountries)

    const filterCountries = () => {
        let storageArr = [];
        if (inputValue) {
            skillsData.forEach((country) => {
                if (country.toLowerCase().startsWith(inputValue.toLowerCase())) {
                    storageArr = [...storageArr, makeMatchBold(country)];
                }
            });
        }
        filteredCountries = storageArr;
    };

    /* HANDLING THE INPUT */
    let searchInput; // use with bind:this to focus element
    let inputValue = "";

    $: if (!inputValue) {
        filteredCountries = [];
        hiLiteIndex = null;
    }

    const clearInput = () => {
        inputValue = "";
        searchInput.focus();
    };

    const setInputVal = (countryName) => {
        inputValue = removeBold(countryName);
        filteredCountries = [];
        hiLiteIndex = null;
        // @ts-ignore
        document.querySelector("#country-input").focus();
    };

    const submitValue = () => {
        if (inputValue) {
            if (skills.indexOf(inputValue) !== -1) {
                alert(inputValue + " sudah ada");
            } else {
                skills.push(inputValue);
                skills = skills;
                setTimeout(clearInput, 100);
            }
        } else {
            alert("You didn't type anything.");
        }
    };

    const makeMatchBold = (str) => {
        // replace part of (country name === inputValue) with strong tags
        let matched = str.substring(0, inputValue.length);
        let makeBold = `<strong>${matched}</strong>`;
        let boldedMatch = str.replace(matched, makeBold);
        return boldedMatch;
    };

    const removeBold = (str) => {
        //replace < and > [search] characters between
        return str.replace(/<(.)*?>/g, "");
        // return str.replace(/<(strong)>/g, "").replace(/<\/(strong)>/g, "");
    };

    /* NAVIGATING OVER THE LIST OF COUNTRIES W HIGHLIGHTING */
    let hiLiteIndex = null;
    //$: console.log(hiLiteIndex);
    $: hiLitedSkill = filteredCountries[hiLiteIndex];

    const navigateList = (e) => {
        if (e.key === "ArrowDown" && hiLiteIndex <= filteredCountries.length - 1) {
            hiLiteIndex === null ? (hiLiteIndex = 0) : (hiLiteIndex += 1);
        } else if (e.key === "ArrowUp" && hiLiteIndex !== null) {
            hiLiteIndex === 0
                ? (hiLiteIndex = filteredCountries.length - 1)
                : (hiLiteIndex -= 1);
        } else if (e.key === "Enter") {
            setInputVal(filteredCountries[hiLiteIndex]);
        } else {
            return;
        }
    };

    // get data user
    async function getUser() {
        const response = await fetch(
            api_url + "/api/users/" + userId,
            {
                method: "GET",
            }
        );

        if (!response.ok) {
            goto("/login");
            localStorage.clear();
        }

        const data = await response.json();
        userData = data;
        skills = userData.skill;
    }
        getUser();

    // update data user
    async function update() {
        let response;

        response = await fetch(api_url + "/api/users/" + userId, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId: userId,
                skill: skills,
            }),
        });

        if (!response.ok) {
            alert(response.statusText);
            console.log(response.status);
            console.log(response.statusText);
        }

        const data = await response.json();
        document.location.href = "/profile";
    }

    // remove indexed value
    const handleRemove = (index) => {
        skills = [
            ...skills.slice(0, index),
            ...skills.slice(index + 1, skills.length),
        ];
    };
</script>

<svelte:window on:keydown={navigateList} />

{#if userData}
    <div class="max-w-2xl px-4 py-8 mx-auto lg:py-16">
        <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">
            Edit Skills
        </h2>
        <div class="flex">
            <div class="autocomplete w-full mr-4">
                <input
                        id="country-input"
                        type="text"
                        placeholder="Search Skill Names"
                        bind:this={searchInput}
                        bind:value={inputValue}
                        on:input={filterCountries}
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
            </div>

            <button
                    on:click={submitValue}
                    class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >Add</button
            >
        </div>

        <div class="relative">
            <div class="absolute top-0 w-full">
                <div class=" flex flex-wrap mt-4">
                    {#each skills as skill, i}
                        <div
                                class="inline-flex justify-between items-center text-gray-900 bg-white border border-gray-300 focus:outline-none  focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm py-2.5 mr-3 my-1.5"
                        >
                            <div class="ml-4 mr-2">{skill}</div>
                            <button
                                    on:click={() => handleRemove(i)}
                                    type="button"
                                    class="items-center flex text-red-600 mr-3"
                            >
                                <iconify-icon icon="material-symbols:close-rounded" />
                            </button>
                        </div>
                    {/each}
                </div>
                <div class="flex justify-end items-center mt-4 space-x-2">
                    <button
                            on:click={update}
                            type="button"
                            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                    >Update</button
                    >
                    <button
                            type="button"
                            on:click={() => history.back()}
                            class="text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                    >
                        Cancel
                    </button>
                </div>
            </div>

            <!-- FILTERED LIST OF COUNTRIES -->
            {#if filteredCountries.length > 0}
                <ul
                        id="autocomplete-items-list"
                        class="max-h-96 overflow-auto absolute top-0"
                >
                    {#each filteredCountries as country, i}
                        <Skill
                                itemLabel={country}
                                highlighted={i === hiLiteIndex}
                                on:click={() => setInputVal(country)}
                        />
                    {/each}
                </ul>
            {/if}
        </div>
    </div>
{/if}

<style>
    div.autocomplete {
        /*the container must be positioned relative:*/
        position: relative;
        display: inline-block;
    }
    input {
        background-color: #f1f1f1;
        padding: 10px;
        font-size: 16px;
        margin: 0;
    }
    input[type="text"] {
        background-color: #f1f1f1;
        width: 100%;
    }

    #autocomplete-items-list {
        position: relative;
        margin: 0;
        padding: 0;
        top: 0;
        width: 85%;
        border: 1px solid #ddd;
        background-color: #ddd;
    }
</style>

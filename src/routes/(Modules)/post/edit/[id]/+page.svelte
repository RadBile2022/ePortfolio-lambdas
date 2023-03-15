<script>
    import MarkdownEditor from "$lib/components/MarkdownEditor.svelte";
    import {createFormContext} from "@deboxsoft/svelte-form"
    import Form from "@deboxsoft/svelte-form/Form.svelte"
    import ComboBox from "@deboxsoft/svelte-form/ComboBoxField.svelte"
    import {goto} from "$app/navigation";
    import {api_url} from "$lib/end-point.js";
    import {onMount} from "svelte";
    const formContext = createFormContext({})
    const { fields } = formContext;
    let ready = false;
    export let data;
   let idPost =data.id ;

    let userId =data.user.userId;

    // get data post
    async function getPost() {
        const response = await fetch(
            api_url + "/api/posts/" + idPost
        );

        if (!response.ok) {
            alert(response.statusText);
        }
        const data = await response.json();
        fields.set({
            desc: data.desc,
            isPublic: data.isPublic ? "1" : "0"
        })
        ready = true;
    }

    // onMount(()=>{
    //     userId= localStorage.getItem("userId");
    //     idPost = localStorage.getItem("idPost")
    // })

    getPost();


    // update data post
    async function updatePost() {
        const response = await fetch(
            api_url + "/api/posts/" + idPost,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId: userId,
                    ...$fields,
                    isPublic: $fields.isPublic === "1"
                }),
            }
        );
        if (!response.ok) {
            alert(response.statusText);
        } else {
            localStorage.removeItem("idPost");
            document.location.href = "/posts";
            history.back();
        }
    }
    async function cancel (){
        localStorage.removeItem("idPost");

        goto("/posts")
    }
</script>

{#if ready}
    <section class="flex flex-1">
        <div class="flex flex-col py-8 px-4 w-full lg:py-8">
            <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                Edit post
            </h2>
            <Form  formContext="{formContext}">
                <MarkdownEditor class="flex-1" name="desc" placeholder="Posting" onSave="{updatePost}" onCancel="{() => goto('/')}" >
                    <div class="flex items-center m-4 space-x-2">
                        <ComboBox class="w-40" name="isPublic" items="{[{label: 'Public', value: '1'}, {label: 'Private', value: '0'}]}" valueId="value" />
                        <div class="flex-1" />
                        <button
                                type="button"
                                on:click={updatePost}
                                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                        >Update</button
                        >
                        <button
                                type="button"
                                on:click={cancel}
                                class="text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                        >
                            Cancel
                        </button>
                    </div>
                </MarkdownEditor>
            </Form>
        </div>
    </section>
{/if}

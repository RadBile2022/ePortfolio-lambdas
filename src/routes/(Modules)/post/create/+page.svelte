<script>
    // import { navigate } from "svelte-routing";
    import {goto} from "$app/navigation";
    import MarkdownEditor from "$lib/components/MarkdownEditor.svelte";
    import {createFormContext} from "@deboxsoft/svelte-form";
    import Form from "@deboxsoft/svelte-form/Form.svelte";
    import ComboBox from "@deboxsoft/svelte-form/ComboBoxField.svelte"
    import {api_url} from "$lib/end-point.js";
    import {onMount} from "svelte";
    export let data;
    const formContext = createFormContext({});
    const {fields} = formContext;
    let userId =data.user.userId;



    // add a post
    async function createPost() {
        const response = await fetch(api_url + "/api/posts/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId: userId,
                ...$fields,
                isPublic: $fields.isPublic === "1",
            }),
        });

        if (!response.ok) {
            alert(response.statusText);
        } else {
            goto("/posts");
        }
    }
</script>

<section class="flex flex-1">
    <div class="flex flex-col py-8 px-4 w-full lg:py-8">
        <h2 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">
            Add a new post
        </h2>
        <Form  formContext="{formContext}">
            <MarkdownEditor class="flex-1" name="desc" placeholder="Posting" onSave="{createPost}" onCancel="{() => goto('/')}" >
                <div class="flex justify-between items-center m-4 space-x-2">
                    <ComboBox class="w-40" name="isPublic" items="{[{label: 'Public', value: '1'}, {label: 'Private', value: '0'}]}" valueId="value" />
                    <div class="flex-1" />
                    <button
                            type="button"
                            on:click={createPost}
                            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                    >Post</button>
                    <button
                            type="button"
                            on:click={() => history.back()}
                            class="text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                    >
                        Cancel
                    </button>
                </div>
            </MarkdownEditor>
        </Form>
    </div>
</section>

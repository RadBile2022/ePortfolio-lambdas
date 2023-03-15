<script>
    import VideoPlayer from "svelte-video-player";
    import {goto} from "$app/navigation";
    import {api_url} from "$lib/end-point.js";
    export let data;

    let userId = data.user.userId;

    let files, src, extension, filename, filesize, type, maxFile, response;

    // preview file
    function loadFile(e) {
        if (e.target.files[0].size <= 10 * 1024 * 1024) {
            src = URL.createObjectURL(e.target.files[0]);

            const name = e.target.files[0].name;
            const lastDot = name.lastIndexOf(".");
            const fileName = name.substring(0, lastDot);
            const ext = name.substring(lastDot + 1);
            const fileSize = e.target.files[0].size;

            filename = fileName;
            extension = ext;
            filesize = fileSize;

            if (
                extension == "png" ||
                extension == "jpg" ||
                extension == "jpeg" ||
                extension == "gif" ||
                extension == "svg" ||
                extension == "webp"
            ) {
                type = "image";
            } else if (
                extension == "mov" ||
                extension == "mp4" ||
                extension == "ogg" ||
                extension == "webm"
            ) {
                type = "video";
            }
                // else if (
                //   extension == "docx" ||
                //   extension == "doc" ||
                //   extension == "xls" ||
                //   extension == "xlsx" ||
                //   extension == "ppt" ||
                //   extension == "pptx" ||
                //   extension == "pdf"
                // ) {
                //   type = "document";
            // }
            else {
                alert("Extension not supported");
                type = null;
            }
            maxFile = false;
        } else {
            alert("Maximum file size is 10MB");
            maxFile = true;
        }
    }

    // upload file
    async function uploadFile() {
        if (maxFile) {
            alert("Maximum file size is 10MB");
        } else if (!type) {
            alert("Extension not supported");
            src = null;
        } else {
            var dataUpdate = new FormData();
            // let dataFile = {
            //   userId: userId,
            //   filename,
            //   filesize,
            //   type,
            // };
            dataUpdate.append("fileAlbum", files[0]);
            dataUpdate.append("userId", userId);
            dataUpdate.append("filename", filename);
            dataUpdate.append("filesize", filesize);
            dataUpdate.append("type", type);
            // dataUpdate.append("data", JSON.stringify(dataFile));

            if (type == "image") {
                response = await fetch(api_url + "/api/album/", {
                    method: "POST",
                    body: dataUpdate,
                });
            } else {
                response = await fetch(api_url + "/api/album/video", {
                    method: "POST",
                    body: dataUpdate,
                });
            }

            if (!response.ok) {
                const data = await response.json();
                alert(data);
            } else {
                goto("/album");
            }
        }
    }
</script>

<main class=" mx-4">
    <div class="md:container md:mx-auto my-5 md:my-16">
        <div>
            <label
                    for="file"
                    class="block mb-2 font-medium text-gray-900 dark:text-white"
            >Upload File</label
            >

            <input bind:files on:change={loadFile} type="file" required />
            <div class="text-sm mt-2 text-red-500">*Maximum file size is 10MB</div>
        </div>
        <!-- image -->
        <div>
            {#if type == "image"}
                <img
                        class="w-auto h-auto rounded-lg mb-4 object-cover"
                        {src}
                        alt="Default avatar"
                />
            {/if}
        </div>

        <!-- video -->
        <div>
            {#if type == "video"}
                <VideoPlayer source={src} />
            {/if}
        </div>

        <div class="flex justify-end items-center mt-3 space-x-2">
            <button
                    on:click={uploadFile}
                    type="button"
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
            >Upload</button
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
</main>

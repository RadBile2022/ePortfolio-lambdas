<script>
    export let active;
    export let userId;
</script>

<div
        class=" my-5 text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700"
>
    <ul class="grid grid-cols-3 md:grid-cols-7 ">
        <li class="mr-2">
            <a
                    href="/{userId}/profile"
                    class="{active == 'aboutme'
          ? 'border-blue-600 text-blue-600'
          : 'border-transparent hover:text-gray-600 hover:border-gray-300'} inline-block p-4 rounded-t-lg border-b-2 "
            >About Me</a
            >
        </li>
        <li class="mr-2">
            <a
                    href="/{userId}/posts"
                    class="{active == 'posts'
          ? 'border-blue-600 text-blue-600'
          : 'border-transparent hover:text-gray-600 hover:border-gray-300'} inline-block p-4 rounded-t-lg border-b-2"
                    aria-current="page">Posts</a
            >
        </li>
        <li class="mr-2">
            <a
                    href="/{userId}/articles"
                    class="{active == 'articles'
          ? 'border-blue-600 text-blue-600'
          : 'border-transparent hover:text-gray-600 hover:border-gray-300'} inline-block p-4 rounded-t-lg border-b-2 "
            >Articles</a
            >
        </li>
        <li class="mr-2">
            <a
                    href="/{userId}/activities"
                    class="{active == 'activities'
          ? 'border-blue-600 text-blue-600'
          : 'border-transparent hover:text-gray-600 hover:border-gray-300'} inline-block p-4 rounded-t-lg border-b-2"
            >Activities</a
            >
        </li>
        <li class="mr-2">
            <a
                    href="/{userId}/projects"
                    class="{active == 'projects'
          ? 'border-blue-600 text-blue-600'
          : 'border-transparent hover:text-gray-600 hover:border-gray-300'} inline-block p-4 rounded-t-lg border-b-2"
            >Projects</a
            >
        </li>
        <li class="mr-2">
            <a
                    href="/{userId}/badges"
                    class="{active == 'badges'
          ? 'border-blue-600 text-blue-600'
          : 'border-transparent hover:text-gray-600 hover:border-gray-300'} inline-block p-4 rounded-t-lg border-b-2"
            >Badges</a
            >
        </li>
        <li class="mr-2">
            <a
                    href="/{userId}/album"
                    class="{active == 'album'
          ? 'border-blue-600 text-blue-600'
          : 'border-transparent hover:text-gray-600 hover:border-gray-300'} inline-block p-4 rounded-t-lg border-b-2"
            >Album</a
            >
        </li>
    </ul>
</div>

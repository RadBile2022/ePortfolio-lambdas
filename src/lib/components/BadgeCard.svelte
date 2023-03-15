<script>
  export let badge;
  let date = new Date(badge.earnedDate);
</script>

<div>
  <a
    href="/badge/{badge._id}"
    class="block text-center p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100"
  >
    <div class="flex justify-center">
      <img
        class="w-16 h-16 rounded-full mb-3 object-cover"
        src={badge.imgBadge}
        alt="Rounded avatar"
      />
    </div>
    <h5 class="text-xl font-bold tracking-tight text-gray-900 truncate">
      {badge.title}
    </h5>
    <p class="font-light dark:text-gray-400 mb-4 truncate">
      {badge.issuer}
    </p>
    <p>
      {date.toLocaleDateString("en", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })}
    </p>
  </a>
</div>

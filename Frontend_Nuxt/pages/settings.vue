<template>
  <div class="flex min-h-screen bg-white">
    <Sidebar/>
    <main class="flex-1 mt-10 lg:ml-4 m-2 md:w-full">
      <div class="text-sm md:text-sm lg:text-xl rounded-lg p-4 mb-6 mx-auto md:w-2/3 lg:w-3/5">
        <BlogUpdate />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
});
</script>

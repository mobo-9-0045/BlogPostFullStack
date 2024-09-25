<template>
  <div class="flex min-h-screen bg-white">
    <Sidebar/>
    <main class="flex-1 ml-64 max-w-3xl px-4 py-8">
      <div class="text-sm md:text-sm lg:text-xl rounded-lg p-4 mb-6 mx-auto w-full">
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

<template>
  <div class="bg-white p-3 rounded-lg">
    <h2 class="text-md font-semibold text-gray-800">{{ title }}</h2>
    <p class="m-3 text-gray-600 text-left">{{ description }}</p>
  </div>
</template>

<script setup lang="ts">
  defineProps({
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    }
  });
</script>

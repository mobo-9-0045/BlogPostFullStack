<template>
    <div v-if="props.showToast" class="fixed bottom-4 right-4 bg-green-500 text-white p-2 rounded shadow-lg">
      {{ props.content }}
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import { defineProps } from 'vue';

    const props = defineProps<{
        showToast: boolean,
        content: string,
    }>();
</script>
<template>
    <div class="flex flex-col justify-center items-center">
        <h1>this is index page</h1>
        <button @click="navigate" class="bg-gray-500 p-3 rounded-md">Go to login</button>
    </div>
</template>

<script setup lang="ts">
    function navigate() {
        return navigateTo('/login')
    }
</script>
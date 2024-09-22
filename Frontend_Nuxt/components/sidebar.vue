<template>
    <div class="w-2/6 md:w-1/6 lg:w-1/6 p-5 fixed left-0 top-0 bg-gray-100 border border-gray-100 h-screen md:block" :class="{ 'hidden': !showSidebar }">
        <h2 class="text-sm md:text-md lg:text-xl xl:text-2xl font-bold mb-4">X BlogPost</h2>

        <ul class="flex flex-col justify-between">
          <li class="text-center text-sm md:text-md lg:text-xl font-bold w-full p-4 flex items-center justify-around" @click="navTo('/home')">
            <Icon name="uil:home" size="1em" class="md:p-1"/>
            <h2>Home</h2>
          </li>
          <li class="text-center text-sm md:text-md lg:text-xl font-bold w-full p-4 flex items-center justify-around" @click="navTo('/settings')">
            <Icon name="uil:setting" size="1em" class="md:p-1"/>
            <h2>Setting</h2>
          </li>
          <li class="text-center text-sm md:text-md lg:text-xl font-bold w-full p-4 flex items-center justify-around" @click="navTo('/Post')">
            <Icon name="uil:file-alt" size="1em" class="md:p-1"/>
            <h2>Post</h2>
          </li>
        </ul>
    </div>
    <button class="md:hidden fixed top-0 m-4 bg-blue-500 text-white px-6 p-1 rounded" @click="toggleSidebar" :class="{ 'left-0': !showSidebar, 'left-24': showSidebar, 'ml-7': showSidebar }">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
    </button>
    
</template>

<script setup  lang="ts">
    const showSidebar = ref(false);
    const toggleSidebar = () => {
        showSidebar.value = !showSidebar.value;
    };
    const navTo = (targetPage: string) => {
        return navigateTo(targetPage);
    }
</script>
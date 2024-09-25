<template>
  <div class="fixed h-screen w-64 bg-black text-white p-4 flex flex-col justify-between">
    <!-- Logo -->
    <div>
      <Icon name="uil:twitter" size="2em" class="text-white mb-4" />
      <h1>Blog Post</h1>
      
      <nav class="space-y-2">
        <button @click="navTo('/home')" class="flex items-center space-x-4 hover:bg-gray-900 rounded-full p-3 w-full transition duration-200">
          <Icon name="uil:home" size="1.5em" />
          <span class="text-xl">Home</span>
        </button>
        <button @click="navTo('/Post')" class="flex items-center space-x-4 hover:bg-gray-900 rounded-full p-3 w-full transition duration-200">
          <Icon name="uil:file-alt" size="1.5em" />
          <span class="text-xl">Post</span>
        </button>
        <button @click="navTo('/settings')" class="flex items-center space-x-4 hover:bg-gray-900 rounded-full p-3 w-full transition duration-200">
          <Icon name="uil:setting" size="1.5em" />
          <span class="text-xl">Settings</span>
        </button>
      </nav>
    </div>

    <div class="mb-4">
      <button class="flex items-center space-x-2 p-3 w-full transition duration-200">
        <Icon name="uil:user" size="1.5em" />
        <div class="flex-grow text-left">
          <div class="font-bold">{{ userStore.username }}</div>
          <div class="text-gray-500 text-sm">{{ userStore.email }}</div>
        </div>
        <Icon name="uil:ellipsis-h" size="1.5em" />
      </button>
      <button @click="logout" class="flex items-center space-x-2 hover:bg-gray-900 rounded-full p-3 w-full transition duration-200">
        <Icon name="uil:sign-out-alt" size="1.5em" />
        <span class="text-xl">Logout</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const showSidebar = ref(false)

const toggleSidebar = () => {
  showSidebar.value = !showSidebar.value
}

const navTo = (targetPage: string) => {
  showSidebar.value = false
  return navigateTo(targetPage)
}

const logout = () => {
  localStorage.removeItem('token')
  return navigateTo('/login')
}

const userStore = useUserStore();
</script>
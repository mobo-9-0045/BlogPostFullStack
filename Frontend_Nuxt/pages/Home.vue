<template>
    <div class="flex p-2 justify-center">
      <Sidebar/>
      <!-- Main Content -->
      <main class="flex-1 mt-10 lg:ml-4 m-2 md:w-full">
        <div class="shadow-md text-sm lg:text-xl rounded-lg p-4 mb-6 mx-auto md:w-2/3 lg:w-3/5">
          <div
            class="post bg-white rounded-lg p-4 w-full border-gray-200 border m-2"
            v-for="blog in blogs"
            :key="blog.id"
            style="width: 100%;"
          >
            <h2 class="text-sm lg:text-xl md:text-md font-semibold">{{ blog.title }}</h2>
            <p class="text-gray-900 text-sm lg:text-xl md:text-md">{{ blog.content }}</p>
            <div class="post-footer mt-2 text-gray-500">
              <span>Posted by: {{ blog.id }}</span>
            </div>
            <div class="mt-4 flex justify-between items-center">
                <input
                    v-model="newComment[blog.id]"
                    class="w-5/6 p-2 border rounded-md"
                    placeholder="Add a comment..."
                ></input>
                <button
                    
                    class="w-1/6 ml-2 bg-blue-600 text-white p-2 rounded"
                >
                post
                </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  </template>
  
<script setup lang="ts">
import { ref, computed } from 'vue';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
const newComment = ref<{ [key: number]: string }>({});

onMounted(() => {
  userStore.fetchUser();
  userStore.getBlogs();
});

const blogs = computed(() => userStore.blogs);


</script>

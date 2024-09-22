<template>
  <div class="flex p-2">
    <Sidebar/>
    <!-- Main Content -->
    <main class="flex-1 mt-10 lg:ml-4 m-2">
      <!-- Blog Posts -->
      <div class="bg-white shadow-md text-sm md:text-sm lg:text-xl rounded-lg p-4 mb-6 mx-auto max-w-md">
          <h2 class="text-xl lg:text-2xl xl:text-3xl font-semibold">What's happening?</h2>
          <textarea class="w-full p-2 border rounded-md" rows="3" placeholder="Share your thoughts..."></textarea>
          <button class="mt-2 bg-blue-600 text-white py-2 px-4 rounded">Post</button>
        </div>
      </main>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
const newBlogPost = ref('');

// Fetch blogs when the component is mounted
onMounted(() => {
  userStore.fetchUser(); // Ensure user is fetched first
  userStore.getBlogs(); // Fetch blogs
});

// Computed property to access blogs from the store
const blogs = computed(() => userStore.blogs);

// Function to add a new blog post
const addBlogPost = () => {
  if (newBlogPost.value) {
    // Assuming there's a method in the userStore to add a new blog post
    // userStore.addBlogPost(newBlogPost.value);
    newBlogPost.value = ''; // Clear the input after adding
  }
};
</script>

<style scoped>
/* No additional styles needed as Tailwind CSS is used */
</style>

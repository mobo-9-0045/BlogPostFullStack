<template>
    <div class="flex p-2">
      <Sidebar/>
      <!-- Main Content -->
      <main class="flex-1 mt-10 lg:ml-4 m-2">
        <!-- Post Creation Area -->
        <div class="bg-white shadow-md text-sm md:text-sm lg:text-xl rounded-lg p-4 mb-6 mx-auto max-w-md">
          <h2 class="text-xl lg:text-2xl xl:text-3xl font-semibold">What's happening?</h2>
          <textarea class="w-full p-2 border rounded-md" rows="3" placeholder="Share your thoughts..."></textarea>
          <button class="mt-2 bg-blue-600 text-white py-2 px-4 rounded">Post</button>
        </div>
  
        <!-- Blog Posts -->
        <div class="flex flex-col items-center justify-center mx-auto max-w-3xl">
          <div
            class="post bg-white rounded-lg p-4 w-full border-gray-200 border m-2"
            v-for="blog in blogs"
            :key="blog.id"
            style="width: 100%;"
          >
            <h2 class="text-sm md:text-md lg:text-xl font-semibold">{{ blog.title }}</h2>
            <p class="text-gray-700">{{ blog.content }}</p>
            <div class="post-footer mt-2 text-gray-500">
              <span>Posted by: {{ blog.username }}</span>
            </div>
            <div class="mt-4 flex justify-between items-center">
                <input
                    v-model="newComment[blog.id]"
                    class="w-5/6 p-2 border rounded-md"
                    placeholder="Add a comment..."
                ></input>
                <button
                    @click="addComment(blog.id)"
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
const newComment = ref<{ [key: number]: string }>({}); // Store new comments for each blog post

// Fetch blogs when the component is mounted
onMounted(() => {
  userStore.fetchUser(); // Ensure user is fetched first
  userStore.getBlogs(); // Fetch blogs
});


// Computed property to access blogs from the store
const blogs = computed(() => userStore.blogs);

// Function to add a comment
const addComment = (blogId: number) => {
  if (newComment.value[blogId]) {
    const blog = blogs.value.find(b => b.id === blogId);
    if (blog) {
      // Add the new comment to the blog's comments array
      blog.comments = blog.comments || [];
      blog.comments.push(newComment.value[blogId]);
      newComment.value[blogId] = ''; // Clear the input after adding
    }
  }
};

</script>

  
  <style scoped>
  /* No additional styles needed as Tailwind CSS is used */
  </style>
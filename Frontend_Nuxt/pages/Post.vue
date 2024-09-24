<template>
  <div class="flex">
    <Sidebar/>
    <!-- Main Content -->
    <main class="flex-1 mt-10 lg:ml-4 m-2 md:w-full">
      <div class="shadow-md text-sm md:text-sm lg:text-xl rounded-lg p-4 mb-6 mx-auto md:w-2/3 lg:w-3/5 h-full">
        <h2 class="text-xl font-bold mb-4">Add New Blog</h2>

        <div class="mb-4">
          <label for="newProjectName" class="block text-sm font-medium text-gray-700">Blog Name:</label>
          <input
            type="text"
            v-model="newBlog.title"
            class="block w-full px-3 py-2 mt-1 border border-gray-300 rounded shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>

        <div class="mb-4">
          <label for="newProjectDescription" class="block text-sm font-medium text-gray-700">Blog Description:</label>
          <textarea
            v-model="newBlog.content"
            class="block w-full px-3 py-2 mt-1 border border-gray-300 rounded shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
            rows="16"
          ></textarea>
        </div>

        <!-- Modal Action Buttons -->
        <div class="flex justify-end space-x-2">
          <button
            class="px-4 py-2 text-white bg-gray-600 rounded hover:bg-gray-700"
            @click="showAddProjectModal = false"
          >
            Cancel
          </button>
          <button
            class="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
            @click="addBlog"
          >
            Save
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue';
  import { useUserStore } from '@/stores/user';
  import axios from 'axios';
  import Swal from 'sweetalert2';
  
  const userStore = useUserStore();

  const newBlog = ref({
    title: '',
    content: '',
  });
  const showAddProjectModal = ref(true);

  definePageMeta({
    middleware: ["auth"],
  });

  onMounted(() => {
    userStore.fetchUser();
    userStore.getBlogs();
  });

const addBlog = async () => {
  const token = localStorage.getItem('token');
  try {
    const res = await axios.post(
      'http://localhost:8000/api/blogs/create/',
      {
        title: newBlog.value.title,
        content: newBlog.value.content,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (res.status == 201){
      Swal.fire({
        'title': 'Success!',
        'text': 'Your Blog created',
        'icon': 'success',
        'confirmButtonText': 'Ok',
        'confirmButtonColor': 'green'
      });
    }
    showAddProjectModal.value = false;
  } catch (error) {
    console.log('error');
  }
}
</script>

<style scoped>
/* No additional styles needed as Tailwind CSS is used */
</style>

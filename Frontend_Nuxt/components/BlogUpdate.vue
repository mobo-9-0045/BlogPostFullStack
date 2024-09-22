<template>
  <div class="grid grid-cols-1 h-full items-center justify-center w-full bg-white">
    <div class="w-full p-8 rounded h-auto">
      <h1 class="text-2xl font-bold text-center mb-6">Feel free to edit or delete your blogs</h1>

      <div
        v-for="(blog, index) in blogs"
        :key="index"
        class="p-4 border border-gray-300 rounded-md mb-4 bg-white"
      >
        <h2 class="text-lg font-semibold mb-2">Blog {{ index + 1 }}</h2>
        <div class="mb-4">
          <label for="projectName" class="block text-sm font-medium text-gray-700">Blog Title:</label>
          <input
            type="text"
            v-model="blog.title"
            class="block w-full px-3 py-2 mt-1 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>

        <div class="mb-4">
          <label for="projectDescription" class="block text-sm font-medium text-gray-700">Blog Description:</label>
          <textarea
            v-model="blog.content"
            class="block w-full px-3 py-2 mt-1 border border-gray-300 rounded shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          ></textarea>
        </div>

        <div class="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
          <button
            class="w-full sm:w-auto px-4 py-2 font-bold text-white bg-green-600 rounded hover:bg-green-700 focus:ring-4 focus:ring-green-500"
            @click="updatBlog(blog)"
          >
            Update
          </button>
          <button
            class="w-full sm:w-auto px-4 py-2 font-bold text-white bg-red-600 rounded hover:bg-red-700 focus:ring-4 focus:ring-red-500"
            @click="deleteBlog(blog.id)"
          >
            Delete
          </button>
        </div>
      </div>

      <div class="space-y-4 mt-8">
        <button
          class="w-full px-4 py-2 font-bold text-white bg-gray-400 rounded hover:bg-gray-700 focus:ring-4 focus:ring-indigo-500"
          @click="navigateToHome"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore, type Blog } from '../stores/user';
import { useRouter } from 'vue-router';
import axios from 'axios';
import Swal from 'sweetalert2';

const UserStore = useUserStore();
const router = useRouter();
const blogs = ref(UserStore.blogs);

const updatBlog = async (blog: Blog) => {
  const token = localStorage.getItem('token');
  try {
    const res = await axios.post(
      `http://localhost:8000/api/blogs/update/${blog.id}`,
      {
        title: blog.title,
        content: blog.content,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (res.status == 200){
      Swal.fire({
        'title': 'Success!',
        'text': 'Your blog was updated',
        'icon': 'success',
        'confirmButtonText': 'Ok',
        'confirmButtonColor': 'green'
      });
    }
  } catch (error) {
    console.log('Error updating project:', error);
  }
};

const deleteBlog = async (id: number) => {
  const token = localStorage.getItem('token');
  try {
    const res = await axios.delete(
      `http://localhost:8000/api/blogs/delete/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (res.status == 200){
      showSuccess('Your blog deleted');
    }
    console.log('Blog deleted:', res);
  } catch (error) {
    console.log('Error deleting project:', error);
  }
};

const showSuccess =(messsge: string) =>{
  Swal.fire({
    'title': 'Success!',
    'text': messsge,
    'icon': 'success',
    'confirmButtonText': 'Ok',
    'confirmButtonColor': 'green'
  })
}

const navigateToHome = () => {
  router.push('/home');
};

</script>
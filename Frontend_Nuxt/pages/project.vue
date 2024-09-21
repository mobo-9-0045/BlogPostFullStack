<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="bg-white p-8 rounded shadow-md w-full max-w-lg">
      <h1 class="text-2xl font-bold text-gray-700 mb-6">Create a Project</h1>
      <form @submit.prevent="submitProject">
        <div class="mb-4">
          <label for="title" class="block text-gray-700 text-sm font-bold mb-2">
            Project Title
          </label>
          <input
            type="text"
            id="title"
            v-model="project.title"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter project title"
          />
        </div>

        <div class="mb-6">
          <label
            for="description"
            class="block text-gray-700 text-sm font-bold mb-2"
          >
            Project Description
          </label>
          <textarea
            id="description"
            v-model="project.description"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter project description"
          ></textarea>
        </div>

        <div class="flex items-center justify-between">
          <button
            type="submit"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Create Project
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const project = ref({
  title: '',
  description: '',
});

const router = useRouter();

const submitProject = async () => {
  try {
    const token = localStorage.getItem('token'); // Retrieve token from local storage
    const res = await axios.post('http://127.0.0.1:3000/projects/createProject',{
        pojectName: project.value.title,
        projectDesciption: project.value.description,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include the Authorization token in the headers
        },
      }
    );

    if (res.status === 201) {
      console.log('project :', res.data);
      router.push('/profile');
    }
  } catch (err) {
    console.error('Error:', err);
  }
};
</script>

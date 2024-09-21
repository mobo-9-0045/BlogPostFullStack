<template>
    <div class="grid grid-cols-1 h-full items-center justify-center w-full">
      <div class="w-full p-8 rounded h-auto">
        <h1 class="text-2xl font-bold text-center mb-6">Edit Cetificates</h1>
  
        <!-- Add Project Button -->
        <div class="mb-4">
          <button
            class="w-full sm:w-auto px-4 py-2 font-bold text-white bg-blue-600 rounded hover:bg-blue-700 focus:ring-4 focus:ring-blue-500"
            @click="showAddSkillModal = true"
          >
            Add Certificat
          </button>
        </div>
  
        <!-- Add Project Modal -->
        <div v-if="showAddSkillModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div class="bg-white p-6 rounded shadow-lg max-w-lg w-full">
            <h2 class="text-xl font-bold mb-4">Add New Certificate</h2>
  
            <!-- New Project Name -->
            <div class="mb-4">
              <label for="newProjectName" class="block text-sm font-medium text-gray-700">Certificate Name:</label>
              <input
                type="text"
                v-model="newCertificat.certificatName"
                class="block w-full px-3 py-2 mt-1 border border-gray-300 rounded shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
  
            <!-- New Project Description -->
            <div class="mb-4">
              <label for="newProjectDescription" class="block text-sm font-medium text-gray-700">Certificate Description:</label>
              <textarea
                v-model="newCertificat.certificatDescription"
                class="block w-full px-3 py-2 mt-1 border border-gray-300 rounded shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              ></textarea>
            </div>
  
            <!-- Modal Action Buttons -->
            <div class="flex justify-end space-x-2">
              <button
                class="px-4 py-2 text-white bg-gray-600 rounded hover:bg-gray-700"
                @click="showAddSkillModal = false"
              >
                Cancel
              </button>
              <button
                class="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
                @click="addCertificat"
              >
                Save
              </button>
            </div>
          </div>
        </div>
  
        <!-- Loop through existing projects row by row -->
        <div
          v-for="(certificat, index) in certificats"
          :key="index"
          class="p-4 border border-gray-300 rounded-md mb-4 bg-white"
        >
          <h2 class="text-lg font-semibold mb-2">Project {{ index + 1 }}</h2>
  
          <!-- Project Name -->
          <div class="mb-4">
            <label for="projectName" class="block text-sm font-medium text-gray-700">Project Name:</label>
            <input
              type="text"
              v-model="certificat.certificatName"
              class="block w-full px-3 py-2 mt-1 border border-gray-300 rounded shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
  
          <!-- Project Description -->
          <div class="mb-4">
            <label for="projectDescription" class="block text-sm font-medium text-gray-700">Project Description:</label>
            <textarea
              v-model="certificat.certificatDescription"
              class="block w-full px-3 py-2 mt-1 border border-gray-300 rounded shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            ></textarea>
          </div>
  
          <!-- Action Buttons: Update and Delete -->
          <div class="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
            <button
              class="w-full sm:w-auto px-4 py-2 font-bold text-white bg-green-600 rounded hover:bg-green-700 focus:ring-4 focus:ring-green-500"
              @click="updateSkill(certificat)"
            >
              Update
            </button>
            <button
              class="w-full sm:w-auto px-4 py-2 font-bold text-white bg-red-600 rounded hover:bg-red-700 focus:ring-4 focus:ring-red-500"
              @click="deleteSkill(certificat.id)"
            >
              Delete
            </button>
          </div>
        </div>
  
        <!-- Cancel and Go Back Button -->
        <div class="space-y-4 mt-8">
          <button
            class="w-full px-4 py-2 font-bold text-white bg-gray-400 rounded hover:bg-gray-700 focus:ring-4 focus:ring-indigo-500"
            @click="navigateToProfile"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { useUserStore, type Certificat } from '../stores/user';
  import { useRouter } from 'vue-router';
  import axios from 'axios';
  
  const UserStore = useUserStore();
  const router = useRouter();
  
  // Bind the projects from the store
  const certificats = ref(UserStore.certificats);
  
  // New project data
  const newCertificat = ref({
    certificatName: '',
    certificatDescription: '',
  });
  
  // State for showing the Add Project modal
  const showAddSkillModal = ref(false);
  
  // Function to add a new project
  
  // Function to update a single project
  const updateSkill = async (certificat: Certificat) => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.put(
        `http://127.0.0.1:3000/certificats/updateCertificat/${certificat.id}`,
        {
            certificatName: certificat.certificatName,
            certificatDescription: certificat.certificatDescription,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      showAddSkillModal.value = false;
      console.log('Project updated:', res);
    } catch (error) {
      console.log('Error updating project:', error);
    }
  };
  
  // Function to delete a single project
  const deleteSkill = async (id: number) => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.delete(
        `http://127.0.0.1:3000/certificats/deleteCertificat/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      showAddSkillModal.value = false;
    } catch (error) {
      console.log('Error deleting project:', error);
    }
  };
  
  // Navigate to profile page
  const navigateToProfile = () => {
    router.push('/profile');
  };
  
  const addCertificat = () =>{
    const token = localStorage.getItem('token');
    try{
      const res = axios.post('http://127.0.0.1:3000/certificats/createCertificat',{
        certificatName: newCertificat.value.certificatName,
        certificatDescription: newCertificat.value.certificatDescription,
      },
      {
        headers:{
          Authorization: `Bearer ${token}`,
        }
      });
      console.log('res : ', res);
      showAddSkillModal.value = false;
    }
    catch(error){
      console.log('error : ', error);
    }
  }
  
  </script>
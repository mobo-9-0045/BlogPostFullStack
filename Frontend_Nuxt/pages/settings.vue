<template>
  <div class="flex min-h-screen bg-gray-100">
    <!-- Sidebar -->
    <div class="h-screen w-1/5 p-4 flex flex-col justify-between bg-white shadow-md">
      <div>
        <h1 class="text-black text-xl text-center m-4 font-bold">Settings</h1>
        <div class="flex flex-col space-y-4">
          <div class="flex flex-row justify-start items-center hover:bg-gray-300 p-1 rounded-lg">
            <Icon name="uil:edit" size="1em"/>
            <button class="w-full px-4 py-2 font-bold text-black rounded-md text-start" @click="currentView = 'profile'">Profile Update</button>
          </div>
          <div class="flex flex-row justify-start items-center hover:bg-gray-300 p-1 rounded-lg">
            <Icon name="uil:edit" size="1em"/>
            <button class="w-full px-4 py-2 font-bold text-black rounded-md text-start" @click="currentView = 'password'">Change Password</button>
          </div>
          <div class="flex flex-row justify-start items-center hover:bg-gray-300 p-1 rounded-lg">
            <Icon name="uil:edit" size="1em"/>
            <button class="w-full px-4 py-2 font-bold text-black rounded-md text-start" @click="currentView = 'otp'">OTP Verification</button>
          </div>
          <div class="flex flex-row justify-start items-center hover:bg-gray-300 p-1 rounded-lg">
            <Icon name="uil:edit" size="1em"/>
            <button class="w-full px-4 py-2 font-bold text-black rounded-md text-start" @click="currentView = 'project'">Projects</button>
          </div>
          <div class="flex flex-row justify-start items-center hover:bg-gray-300 p-1 rounded-lg">
            <Icon name="uil:edit" size="1em"/>
            <button class="w-full px-4 py-2 font-bold text-black rounded-md text-start" @click="currentView = 'skill'">Skills</button>
          </div>
          <div class="flex flex-row justify-start items-center hover:bg-gray-300 p-1 rounded-lg">
            <Icon name="uil:edit" size="1em"/>
            <button class="w-full px-4 py-2 font-bold text-black rounded-md text-start" @click="currentView = 'certificat'">Certificates</button>
          </div>
          <div class="flex flex-row justify-start items-center hover:bg-gray-300 p-1 rounded-lg">
            <Icon name="uil:edit" size="1em"/>
            <button class="w-full px-4 py-2 font-bold text-black rounded-md text-start" @click="currentView = 'hobbie'">Hobbies</button>
          </div>
        </div>
      </div>

      <!-- Logout Button at Bottom -->
      <div>
        <button class="w-full px-4 py-2 font-bold text-red-400 bg-white rounded hover:bg-gray-100 focus:ring-4 focus:ring-indigo-500" @click="logout">Logout</button>
      </div>
    </div>

    <!-- Settings Content -->
    <div class="flex-1 p-8 space-y-6 bg-white rounded shadow-lg">
      <h1 class="text-2xl font-bold text-center">Settings</h1>
      <component :is="currentComponent" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import ProfileUpdate from '@/components/ProfileUpdate.vue';
import PasswordUpdate from '@/components/PasswordUpdate.vue';
import OtpVerification from '@/components/OtpVerification.vue';
import Defautl from '~/components/Defautl.vue';
import ProjectUpdate from '~/components/ProjectUpdate.vue';
import skillUpdate from '~/components/skillUpdate.vue';
import certificateUpdate from '~/components/certificateUpdate.vue';
import HobbieUpdate from '~/components/HobbieUpdate.vue';

const currentView = ref('');

const currentComponent = computed(() => {
  switch (currentView.value) {
    case 'profile':
      return ProfileUpdate;
    case 'password':
      return PasswordUpdate;
    case 'otp':
      return OtpVerification;
    case 'project':
      return ProjectUpdate;
    default:
      return Defautl;
  }
});
const logout = () => {
  localStorage.removeItem('token');
  return navigateTo('/login');
};
</script>

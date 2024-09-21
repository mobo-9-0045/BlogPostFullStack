<template>
    <div class="flex items-center justify-center min-h-screen">
        <div class="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-lg">
        <h1 class="text-2xl font-bold text-center">Verify Your Email</h1>
        <div class="space-y-6">
            <div>
            <label for="otp" class="block text-sm font-medium text-gray-700">OTP:</label>
            <input
                type="text"
                v-model="otp"
                class="block w-full px-3 py-2 mt-1 border border-gray-300 rounded shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
            />
            </div>
            <button class="w-full px-4 py-2 font-bold text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-500" @click="verifyOtp">Verify</button>
        </div>
        </div>
    </div>
</template>
  
<script setup lang="ts">
    import { ref, onMounted } from 'vue';
    import { useUserStore } from '@/stores/user'; // Adjust the import according to your store path

    const otp = ref('');
    const userStore = useUserStore();

    const verifyOtp = async () => {
        await userStore.verifyOtp(otp.value);
    };

    // onMounted(async () => {
    //     await userStore.getOtp();
    // });
</script>
  
<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
        <div class="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-lg">
            <h1 class="text-2xl font-bold text-center">Settings</h1>
            <div class="space-y-6">
                <div>
                    <label for="oldpassword" class="block text-sm font-medium text-gray-700">Old Password:</label>
                    <input
                        type="text"
                        v-model="oldpassword"
                        class="block w-full px-3 py-2 mt-1 border border-gray-300 rounded shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                    />
                </div>
                <div>
                    <label for="newpassword" class="block text-sm font-medium text-gray-700">New Password:</label>
                    <input
                        type="text"
                        v-model="newpassword"
                        class="block w-full px-3 py-2 mt-1 border border-gray-300 rounded shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                    />
                </div>
                <div>
                    <label for="password" class="block text-sm font-medium text-gray-700">Re-enter password:</label>
                    <input
                        type="password"
                        v-model="repassword"
                        class="block w-full px-3 py-2 mt-1 border border-gray-300 rounded shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                    />
                </div>
                
                <button class="w-full px-4 py-2 font-bold text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-500" @click="changePassword">Change</button>
                <button class="w-full px-4 py-2 font-bold text-white bg-gray-400 rounded hover:bg-gray-700 focus:ring-4 focus:ring-indigo-500" @click="navigateToLogin">Login</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

    const userStore = useUserStore();
    const oldpassword = ref('')
    const newpassword = ref('')
    const repassword = ref('')
    const changePassword = async () => {
        console.log('username : ', userStore.username);
        if (newpassword.value == repassword.value){
            userStore.updatePassword(newpassword.value, oldpassword.value);
        }
    }

    onMounted(async () => {
        await userStore.fetchUser();
    });

    function navigateToLogin(){
        return navigateTo('/login');
    }
</script>
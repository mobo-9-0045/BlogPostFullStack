<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
        <div class="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-lg">
            <h1 class="text-2xl font-bold text-center">Edit</h1>
            <div class="space-y-6">
                <div>
                    <label for="name" class="block text-sm font-medium text-gray-700">Name:</label>
                    <input
                        type="text"
                        v-model="name"
                        class="block w-full px-3 py-2 mt-1 border border-gray-300 rounded shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                    />
                </div>
                <div>
                    <label for="lastname" class="block text-sm font-medium text-gray-700">lastname:</label>
                    <input
                        type="text"
                        v-model="lastname"
                        class="block w-full px-3 py-2 mt-1 border border-gray-300 rounded shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                    />
                </div>
                <div>
                    <label for="username" class="block text-sm font-medium text-gray-700">Username:</label>
                    <input
                        type="text"
                        v-model="username"
                        class="block w-full px-3 py-2 mt-1 border border-gray-300 rounded shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                    />
                </div>
                <button class="w-full px-4 py-2 font-bold text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-500" @click="update">Update</button>
                <button class="w-full px-4 py-2 font-bold text-white bg-gray-400 rounded hover:bg-gray-700 focus:ring-4 focus:ring-indigo-500" @click="navigateToProfile">Cancel</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    
    const UserStore = useUserStore();
    const name = ref("")
    const lastname = ref('')
    const username = ref('')
    const update = async () => {
        UserStore.updateUser(name.value, lastname.value, username.value);
    }
    function navigateToProfile(){
        return navigateTo('/profile');
    }
</script>
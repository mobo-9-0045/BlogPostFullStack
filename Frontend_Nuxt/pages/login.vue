<template>
    <toastComponent :showToast="showToast" content="Login successful"/>
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
        <div class="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-lg">
            <h1 class="text-2xl font-bold text-center">Login</h1>
            <div class="space-y-6">
                <div>
                    <label for="username" class="block text-sm font-medium text-gray-700">Username:</label>
                    <input
                        type="text"
                        v-model="username"
                        class="block w-full px-3 py-2 mt-1 border border-gray-300 rounded shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                    />
                </div>
                <div>
                    <label for="password" class="block text-sm font-medium text-gray-700">Password:</label>
                    <input
                        type="password"
                        v-model="password"
                        class="block w-full px-3 py-2 mt-1 border border-gray-300 rounded shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                    />
                </div>
                <button class="w-full px-4 py-2 font-bold text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-500" @click="login">Login</button>
                <button class="w-full px-4 py-2 font-bold text-white bg-gray-400 rounded hover:bg-gray-700 focus:ring-4 focus:ring-indigo-500" @click="navigateToRegister">Register</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import axios from "axios";
    import { ref } from "vue";

    const username = ref('')
    const password = ref('')
    const showToast = ref(false);
    const login = async () => {
        try{
            const res = await axios.post('http://localhost:8000/api/auth/login/',{
                username: username.value,
                password: password.value,
            })
            console.log('res: ', res);
            if (res.status == 200){
                showToast.value = true;
                localStorage.setItem('token', res.data.access);
                return navigateTo('/home');
            }
        }
        catch(err){
            console.log(err);
        }
    }

    function navigateToRegister(){
        return navigateTo('/register');
    }
</script>

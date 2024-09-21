<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
        <div class="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-lg">
            <h1 class="text-2xl font-bold text-center">Login</h1>
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
                    <label for="email" class="block text-sm font-medium text-gray-700">email:</label>
                    <input
                        type="text"
                        v-model="email"
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
                <div>
                    <label for="password" class="block text-sm font-medium text-gray-700">Password:</label>
                    <input
                        type="password"
                        v-model="password"
                        class="block w-full px-3 py-2 mt-1 border border-gray-300 rounded shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                    />
                </div>
                <button class="w-full px-4 py-2 font-bold text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-500" @click="register">Register</button>
                <button class="w-full px-4 py-2 font-bold text-white bg-gray-400 rounded hover:bg-gray-700 focus:ring-4 focus:ring-indigo-500" @click="navigateToLogin">Login</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import axios from "axios";

    const username = ref('')
    const email = ref('')
    const name = ref('')
    const lastname = ref('')
    const password = ref('')
    const register = async () => {
        try{
            const res = await axios.post('http://localhost:8000/auth/register/',{
                username: username.value,
                email: email.value,
                password: password.value,
                password2: password.value,
                first_name: name.value,
                last_name: lastname.value,
            })
            console.log('res: ', res);
            if (res.status == 201){
                return navigateTo('/login');
            }
        }
        catch(err){
            console.log(err);
        }
    }
    function navigateToLogin(){
        return navigateTo('/login');
    }
</script>
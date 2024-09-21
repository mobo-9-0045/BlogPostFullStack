<template>
    <div>
      <h1>Welcome!</h1>
      <p>Your login was successful. You are now authenticated.</p>
    </div>
  </template>
  
<script setup lang="ts">

    const userStore = useUserStore();
    onMounted( async () => {
        const query = new URLSearchParams(window.location.search);
        const token = query.get('token');
        if (token) {
            localStorage.setItem('token', token);
            return navigateTo('/profile');
        } else {
            return navigateTo('/login');
        }
    });
</script>
  
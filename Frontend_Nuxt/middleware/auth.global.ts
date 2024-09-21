import  {useUserStore}  from '../stores/user'

export default defineNuxtRouteMiddleware(to =>{
    
    if (process.client) {
        console.log('middleware');
        const userStore = useUserStore();
        userStore.fetchUser();
    }
})
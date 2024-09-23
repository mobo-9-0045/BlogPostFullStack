<template>
    <div class="mt-4 flex justify-between items-center">
        <input
            v-model="localContent"
            class="w-5/6 p-2 border rounded-md"
            placeholder="Add a comment..."
        ></input>
        <button
            @click="addComment(props.blog)"
            class="w-1/6 ml-2 bg-blue-600 text-white p-2 rounded"
        >
        post
        </button>
    </div>
</template>

<script setup lang="ts">
    import { ref, watch } from 'vue';
    import { useUserStore } from '~/stores/user';
    import axios from 'axios';

    const userStore = useUserStore();
    const props = defineProps<{
        content: string,
        blog: Blog,
    }>();

    
    const localContent = ref(props.content);

    watch(() => props.content, (newValue) => {
        localContent.value = newValue;
    });


    const addComment = async (blog: Blog) =>{
        const token = await userStore.getToken();
        try{
        const res = axios.post('http://localhost:8001/create/comments/',{
            content: localContent.value,
            user_id: userStore.id,
            blogpost_id: blog.id,
            username: userStore.username,
        },{
            headers:{
                Authorization: `${token}`,
            }
        });
        }
        catch(error){
            console.log('error', error);
        }
    }
</script>
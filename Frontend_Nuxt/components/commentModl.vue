<template>
    <div v-if="isVisible" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div class="bg-white p-6 rounded-lg shadow-lg w-96">
        <h3 class="text-lg font-semibold mb-4">Update Comment</h3>
        <input 
          v-model="commentContent" 
          placeholder="Update your comment" 
          class="w-full p-2 border border-gray-300 rounded mb-4"
        />
        <div class="flex justify-end">
          <button @click="updateComment(props.commentId, commentContent)" class="bg-blue-500 text-white px-4 py-2 rounded mr-2">Update</button>
          <button @click="close" class="bg-gray-300 text-gray-700 px-4 py-2 rounded">Cancel</button>
        </div>
      </div>
    </div>
  </template>
  
<script setup lang="ts">
    import axios from 'axios';
    import Swal from 'sweetalert2';
    import { ref } from 'vue';
    import { defineEmits } from 'vue';
  
    const userStore = useUserStore()
  const props = defineProps<{
    isVisible: boolean;
    commentId: number;
    currentContent: string;
  }>();
  
  const emit = defineEmits(['updateComment', 'close']);
  
  const commentContent = ref(props.currentContent);
  
  const updateComment = async (comment_id: number, commentContent: string) =>{
    try{
      const res = await axios.put(`http://localhost:8001/update/comment/${userStore.id}/${comment_id}`,{
        content: commentContent,
      })
      if (res.status == 200){
        Swal.fire({
          'title': 'Updated',
          'icon': 'success',
          'text': 'comment Updated',
          'confirmButtonText': 'Ok',
          'confirmButtonColor': 'green'
        });
      }
      else{
        Swal.fire({
          'title': 'Failed',
          'icon': 'error',
          'text': 'error occured',
          'confirmButtonText': 'Ok',
          'confirmButtonColor': 'red'
        });
      }
    }
    catch(error){
      Swal.fire({
          'title': 'Failed',
          'icon': 'error',
          'text': 'error occured',
          'confirmButtonText': 'Ok',
          'confirmButtonColor': 'red'
        });
    }
  }
  const close = () => {
    emit('close');
  };
  
</script>  
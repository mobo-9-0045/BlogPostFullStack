<template>
    <div class="flex p-2 justify-center">
      <Sidebar/>
      <!-- Main Content -->
      <main class="flex-1 mt-10 lg:ml-4 m-2 md:w-full">
        <div class="shadow-md text-sm lg:text-xl rounded-lg p-4 mb-6 mx-auto md:w-2/3 lg:w-3/5">
          <div
            class="post bg-white rounded-lg p-4 w-full border-gray-200 border m-2"
            v-for="blog in blogs"
            :key="blog.id"
            style="width: 100%;"
          >
            <h2 class="text-sm lg:text-xl md:text-md font-semibold">{{ blog.title }}</h2>
            <p class="text-gray-900 text-sm lg:text-xl md:text-md">{{ blog.content }}</p>
            <div class="post-footer mt-2 text-gray-500">
              <span>Posted by: {{ blog }}</span>
            </div>
            <CommentInput :blog="blog" :content="newComment.content"/>
            <div class="comments mt-4">
                <ul class="border border-gray-200">
                    <li v-for="comment in publicStore.getCommentsForBlog(blog.id)" class="flex flex-col">
                      <div class="flex flex-row justify-between">
                        <div>
                          <h3 class="text-black font-bold text-left m-1">{{ comment.username }}</h3>
                          <p class="text-gray-800  text-left ml-6">{{ comment.content }}</p>
                        </div>
                        <div class="flex flex-row justify-around">
                          <button @click="deleteComment(comment.id)" class="text-red-500 mt-2">
                            <Icon name="uil:trash" size="1.5em" class="md:p-1"/>
                          </button>
                          <button @click="openModal(comment)" class="text-blue-500 mt-2">
                            <Icon name="uil:file-alt" size="1.5em" class="md:p-1"/>
                          </button>
                        </div>
                      </div>
                    </li>
                </ul>
            </div>
          </div>
        </div>
        <commentModl 
          :isVisible="isModalVisible" 
          :commentId="selectedCommentId" 
          :currentContent="selectedCommentContent"
          @close="closeModal" 
        />
      </main>
    </div>
  </template>
  
<script setup lang="ts">
  import { ref, computed } from 'vue';
  import { useUserStore, type Blog } from '@/stores/user';
  import { usePublicContentStore } from '~/stores/public_content';
  import CommentInput from '~/components/commentInput.vue';
  import axios from 'axios';
  import Swal from 'sweetalert2';

  const userStore = useUserStore();
  const publicStore = usePublicContentStore();
  const newComment = ref({
    user_id: '',
    content: '',
    blogpost_id: ''

  });

  const isModalVisible = ref(false);
  const selectedCommentId = ref(0);
  const selectedCommentContent = ref('');
  const openModal = (comment: any) => {
    selectedCommentId.value = comment.id;
    selectedCommentContent.value = comment.content;
    isModalVisible.value = true;
  };
    const closeModal = () => {
    isModalVisible.value = false;
  };
  onMounted(() => {
    userStore.fetchUser();
    // userStore.getBlogs();
    publicStore.fetchAllPublicContent();
  });

  const deleteComment = async (comment_id: number) =>{
    try{
      const res = await axios.delete(`http://localhost:8001/delete/comment/${userStore.id}/${comment_id}`)
      if (res.status == 200){
        Swal.fire({
          'title': 'Deleted',
          'icon': 'success',
          'text': 'comment deleted',
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
  const blogs = computed(() => publicStore.blogs);
</script>

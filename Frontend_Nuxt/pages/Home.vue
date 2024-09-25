<template>
  <div class="flex bg-gray-100 min-h-screen">
    <Sidebar class="fixed h-screen w-64 border-r border-gray-200" />
    <main class="flex-1 ml-64 max-w-3xl px-4 py-8">
      <header class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Blog Posts</h1>
      </header>

      <div class="space-y-8">
        <article v-for="blog in blogs" :key="blog.id" class="bg-white shadow-md rounded-lg overflow-hidden">
          <div class="p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-2">{{ blog.title }}</h2>
            <p class="text-gray-600 mb-4">{{ truncateContent(blog.content) }}</p>
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-4 text-sm text-gray-500">
                <span class="flex items-center">
                  <Icon name="uil:calendar-alt" size="1.2em" class="mr-1" />
                  {{ formatDate(blog.created_at) }}
                </span>
                <span class="flex items-center">
                  <Icon name="uil:comment" size="1.2em" class="mr-1" />
                  {{ publicStore.getCommentsForBlog(blog.id).length }} Comments
                </span>
              </div>
              <button @click="expandBlog(blog.id)" class="text-blue-600 hover:text-blue-800 font-medium">
                Read More
              </button>
            </div>
          </div>

          <div v-if="expandedBlogId === blog.id" class="p-6 border-t border-gray-200">
            
            <div class="mt-8">
              <h3 class="text-xl font-bold text-gray-900 mb-4">Comments</h3>
              <CommentInput :blog="blog" :content="newComment.content" class="mb-6" />
              
              <div class="space-y-4">
                <div v-for="comment in publicStore.getCommentsForBlog(blog.id)" :key="comment.id" class="bg-gray-50 p-4 rounded-lg">
                  <div class="flex justify-between items-start">
                    <div>
                      <p class="font-medium text-gray-900">{{ comment.username }}</p>
                      <p class="text-gray-600 mt-1">{{ comment.content }}</p>
                    </div>
                    <div class="flex space-x-2">
                      <button @click="deleteComment(comment.id)" class="text-red-600 hover:text-red-800">
                        <Icon name="uil:trash" size="1.2em" />
                      </button>
                      <button @click="openModal(comment)" class="text-blue-600 hover:text-blue-800">
                        <Icon name="uil:edit" size="1.2em" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </main>

    <!-- Right Sidebar -->
    <aside class="hidden xl:block w-80 p-6">
      <div class="bg-white shadow-md rounded-lg p-6">
        <h2 class="text-xl font-bold text-gray-900 mb-4">Categories</h2>
        <ul class="space-y-2">
          <li v-for="category in ['Technology', 'Travel', 'Food', 'Lifestyle', 'Health']" :key="category">
            <a href="#" class="text-gray-600 hover:text-blue-600">{{ category }}</a>
          </li>
        </ul>
      </div>
    </aside>
  </div>

  <commentModl 
    :isVisible="isModalVisible" 
    :commentId="selectedCommentId" 
    :currentContent="selectedCommentContent"
    @close="closeModal" 
  />
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useUserStore, type Blog } from '@/stores/user';
import { usePublicContentStore } from '~/stores/public_content';
import CommentInput from '~/components/commentInput.vue';
import axios from 'axios';
import Swal from 'sweetalert2';

definePageMeta({
  middleware: ["auth"],
})

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
const expandedBlogId = ref(null);

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
  publicStore.fetchAllPublicContent();
});

const deleteComment = async (comment_id: number) => {
  try {
    const res = await axios.delete(`http://localhost:8001/delete/comment/${userStore.id}/${comment_id}`)
    if (res.status == 200) {
      Swal.fire({
        'title': 'Deleted',
        'icon': 'success',
        'text': 'Comment deleted',
        'confirmButtonText': 'Ok',
        'confirmButtonColor': 'green'
      });
      await publicStore.fetchAllPublicContent();
    } else {
      Swal.fire({
        'title': 'Failed',
        'icon': 'error',
        'text': 'An error occurred',
        'confirmButtonText': 'Ok',
        'confirmButtonColor': 'red'
      });
    }
  } catch(error) {
    Swal.fire({
      'title': 'Failed',
      'icon': 'error',
      'text': 'An error occurred',
      'confirmButtonText': 'Ok',
      'confirmButtonColor': 'red'
    });
  }
}

const blogs = computed(() => publicStore.blogs);

const truncateContent = (content: string, maxLength: number = 150) => {
  if (content.length <= maxLength) return content;
  return content.slice(0, maxLength) + '...';
};

const formatDate = (date: string | number | Date) => {
  return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};

const expandBlog = (blogId: number) => {
  expandedBlogId.value = expandedBlogId.value === blogId ? null : blogId;
};
</script>
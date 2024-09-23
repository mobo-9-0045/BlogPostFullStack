<template>
    <div class="comments mt-4">
        <h3 class="text-md font-semibold">Comments:</h3>
        <ul>
            <li v-for="comment in publicStore.getCommentsForBlog(props.blog.id)" class="flex flex-col border font-semibold">
                <h2 class="m-1">{{ comment.user_id }}</h2>
                <p class="text-left m-2 text-gray-900">{{ comment.content }}</p>
            </li>
        </ul>
    </div>
</template>

<script lang="ts" setup>
    import { usePublicContentStore } from '~/stores/public_content';

    const publicStore = usePublicContentStore();
    const props = defineProps<{
        blog: Blog,
    }>();
</script>
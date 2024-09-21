<template>
    <div class="relative flex h-full justify-center bg-white">
        <div class="w-full min-h-full p-8 bg-gray-300">
            <div class="flex flex-row justify-end p-2 m-2">
                <Icon name="uil:cog" @click="settings" size="2em"/>
                <p class="text-xl" @click="settings">settings</p>
            </div>
            <!-- Cover Photo -->
            <div class="relative h-60 rounded-lg mb-8">
                <img src="../ommane.png" alt="Profile Picture" class="w-full h-full object-cover rounded-3xl"/>
                <!-- Profile Picture -->
                <div class="absolute -bottom-12 left-8 w-24 h-24 rounded-full border-4 border-white overflow-hidden">
                    <img src="../ommane.jpg" alt="Profile Picture" class="w-full h-full object-cover" />
                </div>
            </div>

            <!-- User Info and Status -->
            <div class="flex justify-between items-center mb-8 px-8">
                <div class="flex items-center space-x-4">
                    <div class="ml-32">
                        <h1 class="text-2xl font-bold text-gray-900">{{ User.username }}</h1>
                        <p class="text-lg text-gray-700">{{ User.name }}</p>
                    </div>
                </div>
                <div class="text-right">
                    <p :class="statusClass" class="text-lg font-bold">{{ status }}</p>
                </div>
            </div>

            <!-- Squares Layout: 2 columns, 3 rows -->
            <!-- Squares Layout: 2 columns, 3 rows -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 px-8">
                <!-- Projects -->
                <div class="bg-white p-6 rounded-lg shadow-lg">
                    <h2 class="text-xl font-semibold text-gray-800">Blogs</h2>
                    <div v-if="User.blogs && User.blogs.length">
                        <ProfileCards v-for="(blog, index) in visibleProjects" :key="index" :title="blog.title" :description="blog.content"/>
                        <button v-if="showSeeAllProjects" @click="showPopup('blogs')" class="text-blue-600 mt-4">See All Projects</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Popup Modal for all items (Projects, Skills, etc.) -->
        <div v-if="isPopupVisible" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div class="bg-white p-8 rounded-lg shadow-lg w-3/5 h-4/5 max-w-4xl max-h-4/5 overflow-auto">
                <h2 class="text-2xl font-bold mb-4">{{ popupTitle }}</h2>
                <div class="max-h-4/5 overflow-y-auto">
                    <ProfileCards v-for="(item, index) in popupItems" :key="index" :title="itemTitle(item)" :description="itemDescription(item)"/>
                </div>
                <button @click="closePopup" class="mt-4 text-blue-600">Close</button>
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useUserStore } from '~/stores/user';
import { ref, computed, onMounted } from 'vue';

const User = useUserStore();
const router = useRouter();

// For handling popups
const isPopupVisible = ref(false);
const popupItems = ref<any[]>([]);
const popupTitle = ref('');
const currentPopupType = ref('');

// Show first two items for each section by default
const visibleProjects = computed(() => User.blogs.slice(0, 2));

// Determine if the "See All" button should be shown
const showSeeAllProjects = computed(() => User.blogs.length > 2);

// Show popup for the corresponding section
const showPopup = (type: string) => {
    currentPopupType.value = type;
    if (type === 'blogs') {
        popupTitle.value = 'All Projects';
        popupItems.value = User.blogs;
    }
    isPopupVisible.value = true;
};

const closePopup = () => {
    isPopupVisible.value = false;
};

const itemTitle = (item: any) => {
    if (currentPopupType.value === 'blogs') return item.title
};

const itemDescription = (item: any) => {
    if (currentPopupType.value === 'blogs') return item.content;
};

const fetchUser = async () => {
    await User.fetchUser();
};

onMounted(() => fetchUser());

let status: any;
let statusClass: any;
if (User.isActive) {
    status = 'Active';
    statusClass = 'text-green-600';
} else {
    status = 'Inactive';
    statusClass = 'text-red-600';
}

const settings = () => {
    router.push('/settings');
};
</script>

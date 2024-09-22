import axios from 'axios';
import { defineStore } from 'pinia';

export interface Comment{
    content: string;
    user_id: number;
    blogpost_id: number;
}

export const usePublicContentStore = defineStore('publicContent', {
    state: () => ({
        blogs: [] as Blog[],
        comments: [] as Comment[],
    }),
    actions: {
        async fetchPublicBlogs() {
            const token = localStorage.getItem('token');
            console.log('token in blogs: ', token);
            try {
                const res = await axios.get("http://localhost:8000/api/blogs/getblogs/",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log('res: ', res);
                this.blogs = res.data;
            } 
            catch (error) {
                console.log('Error updating project:', error);
            }
        },
        async fetchPublicComments() {
            console.log('this is called');
            try{
                const res = await axios.get(`http://localhost:8001/getall/comments/`);
                console.log('comments res: ', res.data);
                this.comments = res.data;
                console.log('comments: ', this.comments);
            }
            catch(error){
                console.log('error');
            }
        },
        async fetchAllPublicContent(){
            await Promise.all([this.fetchPublicBlogs(), this.fetchPublicComments()])
        }
    },
    getters: {
        getPublicBlogs: (state) => state.blogs,
        getPublicComments: (state) => state.comments,
        getCommentsForBlog: (state) => (blogpost_id: number) => {
            return state.comments.filter(comment => comment.blogpost_id === blogpost_id);
        },
    },
});
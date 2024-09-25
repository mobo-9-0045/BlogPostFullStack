import axios, { type AxiosResponse } from 'axios';
import { defineStore } from 'pinia';

export interface Blog{
    title: string;
    content: string;
    id: number;
    created_at: string;
}

export const useUserStore = defineStore('userStore',{
    state: () => ({
        username: '',
        id: 0,
        name: '',
        lastname: '',
        isActive: '',
        blogs : [] as Blog[],
        projects: [] as Project[],
        skills: [] as Skill[],
        certificats: [] as Certificat[],
        hobbies: [] as Hobbie[],
    }),
    actions: {
        async getToken(){
            const token = localStorage.getItem('token');
            if (!token){
                return navigateTo('/login');
            }
            return token;
        },
        async fetchUser() {
            const token = await this.getToken();
            try{
                const res = await axios.get('http://localhost:8000/api/auth/user/details/',{
                    headers:{
                        Authorization: `Bearer ${token}`,
                    }
                });
                if (res.status == 200){
                    this.username = res.data.username;
                    this.id = res.data.id;
                    this.name = res.data.name;
                    this.lastname = res.data.lastname;
                    this.email = res.data.email;
                    await this.getBlogs();
                }
            }
            catch(erro: any){
                return navigateTo('/login')
            }
        },

        async getBlogs(){
            const token = localStorage.getItem('token');
            try {
                const res = await axios.get(`http://localhost:8000/api/blogs/getUserBlogs/${this.id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                this.blogs = res.data;
            } 
            catch (error) {
                console.log(error);
            }
        },
        updateState(res: AxiosResponse){
            this.name = res.data.name;
            this.lastname = res.data.lastname;
            this.username = res.data.username;
        },
    },
})

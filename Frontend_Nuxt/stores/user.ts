import axios, { type AxiosResponse } from 'axios';
import { defineStore } from 'pinia';

export interface Project {
    projectName: string;
    projectDescription: string;
    id: number;
}

export interface Skill {
    skillName: string;
    skillDescription: string;
    id: number;
}

export interface Certificat {
    certificatName: string;
    certificatDescription: string;
    id: number;
}

export interface Hobbie {
    hobbieName: string;
    hobbieDescription: string;
    id: number;
}

export interface Blog{
    title: string;
    content: string;
    id: number;
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
            console.log('token: ', token);
            try{
                const res = await axios.get('http://localhost:8000/api/auth/user/details/',{
                    headers:{
                        Authorization: `Bearer ${token}`,
                    }
                });
                console.log('user details: ', res);
                if (res.status == 200){
                    this.username = res.data.username;
                    this.id = res.data.id;
                    await this.getBlogs();
                }
            }
            catch(erro: any){
                return navigateTo('/login')
            }
        },

        async getBlogs(){
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

        async getUserById(id: number){
            const token = await this.getToken();
            try{
                const res = await axios.get(`http://127.0.0.1:3000/users/user/${id}`,{
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                });
                if (res.status == 200){
                    this.updateState(res);
                }
            }
            catch(erro){
                return navigateTo('/login');
            }
        },

        async updateUser(name: string, lastname: string, username: string){
            const token = await this.getToken();
            try{
                const res = await axios.put(`http://127.0.0.1:3000/users/updateUser/${this.id}`,
                    {
                        name: name,
                        lastname: lastname,
                        username: username,
                    },
                    {
                        headers:{
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                if (res.status == 200){
                    this.updateState(res);
                    return navigateTo('/profile')
                }
            }
            catch(error){
                console.log(error);
            }
        },

        async updatePassword(newPassword: string, oldPassword: string){
            const token = await this.getToken();
            const res = await axios.put(`http://127.0.0.1:3000/users/changePassword/`,
                {
                    oldpassword: oldPassword,
                    username: this.username,
                    password: newPassword
                },
                {
                    headers:{
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (res.status == 200){
                this.updateState(res);
                return navigateTo('/profile')
            }
        },
        updateState(res: AxiosResponse){
            this.name = res.data.name;
            this.lastname = res.data.lastname;
            this.username = res.data.username;
            this.isActive = res.data.isActive;
            this.projects = res.data.projects;
            this.skills = res.data.skills;
            this.certificats = res.data.certificats;
            this.hobbies = res.data.hobbies;
        },
        async getOtp(){
            const token = await this.getToken();
            try{
                const res = await axios.get('http://127.0.0.1:3000/auth/email/getotp',{
                    headers:{
                        Authorization: `Bearer ${token}`,
                    }
                });
                console.log('res : ', res);
                if (res.status == 201){
                    return navigateTo('/profile');
                }
            }
            catch(err){
                console.log(err);
            }
        },
        async verifyOtp(otp: string){
            const token = await this.getToken();
            try {
                const res = await axios.post('http://127.0.0.1:3000/auth/email/verifyotp',{
                    email: 'mobo@man.com',
                    otp: otp,
                },
                {
                    headers:{
                        Authorization: `Bearer ${token}`,
                    }
                });
                if (res.status == 201){
                    return navigateTo('/profile');
                }
            } 
            catch (error) {
                console.log('error :', error);
            }
        }
    },
})

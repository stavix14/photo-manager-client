import axios from "axios";

export default {
    auth: async (credentials, path) => {
        const response = await axios.post(`/api/users/${path}`, { credentials });
        if (response.data.user) {
            sessionStorage.setItem("username", response.data.user.email);
            sessionStorage.setItem("token", response.data.user.token);
        }
        return response.data;
    },
    imageForm: async formData => {
        const response = await axios.post('/api/images', formData);
        return response.data;
    },
    getImages: async () => {
        const response = await axios.get('/api/images');
        return response.data;
    },
    postComment: async postComment => {
        const response = await axios.put('/api/images/comments', { postComment });
        return response.data;
    }
};
import axios from "axios";

export default {
    auth: async (credentials, path) => {
        const response = await axios.post(`/api/user/${path}`, { credentials });
        console.log(response);
        return response.data;
    },
    imageForm: async formData => {
        const response = await axios.post('/api/imageForm', formData);
        return response.data;
    },
    getImages: async () => {
        const response = await axios.get('/api/images');
        return response.data.imagePosts;
    },
    postComment: async postComment => {
        const response = await axios.post('/api/images/comment', { postComment });
        console.log(response.data);
        return response.data;
    }
};
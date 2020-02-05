import axios from "axios";

export default {
    auth: async (credentials, path) => {
        const response = await axios.post(`/api/user/${path}`, { credentials });
        return response.data;
    },
    imageForm: async formData => {
        const response = await axios.post('/api/imageForm', formData);
        return response.data;
    }
};
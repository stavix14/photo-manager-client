import axios from "axios";

export default {
    auth: async (credentials, path) => {
        const response = await axios.post(`/api/user/${path}`, { credentials });
        return response.data;
    }
};
import axios from 'axios';
const API_URL = "http://localhost:5000/api/tickets";

export const ticketService = {
    getAll: async (params) => {
        const query = new URLSearchParams(params).toString();
        const response = await axios.get(`${API_URL}/list?${query}`);
        return response.data?.tickets || [];
    },
    delete: async (id) => {
        return axios.delete(`${API_URL}/delete/${id}`);
    },
    update: async (id, data) => {
        return axios.put(`${API_URL}/update/${id}`, data);
    }
};
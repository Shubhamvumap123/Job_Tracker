import axios from 'axios';
const API_URL = "http://localhost:5000/api/tickets";

export const ticketService = {
    // fetch all tickets with optional search/filter params
    getAll: async (params) => {
        const query = new URLSearchParams(params).toString();
        const response = await axios.get(`${API_URL}/list?${query}`);
        return response.data?.tickets || [];
    },

    // create a new ticket
    create: async (data) => {
        return axios.post(`${API_URL}/create`, data);
    },

    // delete a specific ticket
    delete: async (id) => {
        return axios.delete(`${API_URL}/delete/${id}`);
    },

    // update ticket details
    update: async (id, data) => {
        return axios.put(`${API_URL}/update/${id}`, data);
    }
};
import axios from 'axios';
const API_URL = "https://ticket-support11.onrender.com/api/tickets";

// Helper to get auth header
const getAuthHeader = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
        return { Authorization: `Bearer ${user.token}` };
    }
    return {};
};

export const ticketService = {
    // fetch all tickets with optional search/filter params
    getAll: async (params) => {
        const query = new URLSearchParams(params).toString();
        const response = await axios.get(`${API_URL}/list?${query}`, { headers: getAuthHeader() });
        return response.data?.tickets || [];
    },

    // create a new ticket
    create: async (data) => {
        return axios.post(`${API_URL}/create`, data, { headers: getAuthHeader() });
    },

    // delete a specific ticket
    delete: async (id) => {
        return axios.delete(`${API_URL}/delete/${id}`, { headers: getAuthHeader() });
    },

    // update ticket details
    update: async (id, data) => {
        return axios.put(`${API_URL}/update/${id}`, data, { headers: getAuthHeader() });
    }
};
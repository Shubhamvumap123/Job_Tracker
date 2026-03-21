import axios from 'axios';
const isLocal = window.location.hostname === 'localhost';
const API_BASE_URL = isLocal
    ? "http://localhost:5000"
    : "https://ticket-support11.onrender.com"; // Render placeholder URL, usually should be updated in deployment

const API_URL = `${API_BASE_URL}/api/jobs`;

// Helper to get auth header
const getAuthHeader = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
        return { Authorization: `Bearer ${user.token}` };
    }
    return {};
};

export const jobService = {
    // fetch all jobs with optional search/filter params
    getAll: async (params) => {
        const query = new URLSearchParams(params).toString();
        const response = await axios.get(`${API_URL}/list?${query}`, { headers: getAuthHeader() });
        return response.data?.tickets || response.data?.jobs || []; // Added optional .jobs support
    },

    // create a new job
    create: async (data) => {
        return axios.post(`${API_URL}/create`, data, { headers: getAuthHeader() });
    },

    // delete a specific job
    delete: async (id) => {
        return axios.delete(`${API_URL}/delete/${id}`, { headers: getAuthHeader() });
    },

    // update job details
    update: async (id, data) => {
        return axios.put(`${API_URL}/update/${id}`, data, { headers: getAuthHeader() });
    }
};
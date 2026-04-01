import axios from 'axios';
// Use Gateway relative route
const API_URL = '/api/tickets';
axios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

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
        const response = await axios.get(`${API_URL}?${query}`, { headers: getAuthHeader() });
        return response.data; // Response is already the array in microservice
    },

    // create a new job
    create: async (data) => {
        return axios.post(`${API_URL}`, data, { headers: getAuthHeader() });
    },

    // delete a specific job
    delete: async (id) => {
        return axios.delete(`${API_URL}/${id}`, { headers: getAuthHeader() });
    },

    // update job details
    update: async (id, data) => {
        return axios.put(`${API_URL}/${id}`, data, { headers: getAuthHeader() });
    }
};

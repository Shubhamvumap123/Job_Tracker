import axios from 'axios';

const isLocal = window.location.hostname === 'localhost';
const API_BASE_URL = isLocal
    ? "http://localhost:5000"
    : "https://ticket-support11.onrender.com";

// API Gateway route for users in monolithic server
const API_URL = `${API_BASE_URL}/api/users/`;

const register = async (userData) => {
    const response = await axios.post(API_URL, userData);
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
};

const login = async (userData) => {
    const response = await axios.post(API_URL + 'login', userData);
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
};

const logout = () => {
    localStorage.removeItem('user');
};

const authService = {
    register,
    login,
    logout
};

export default authService;

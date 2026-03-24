import axios from 'axios';

// Since we use Nginx on port 80 (or localhost), we just hit the relative path (or absolute to /api/tickets)
// In a Docker environment, the request naturally routes through the gateway.
const API_URL = '/api/tickets/';

// Config for sending token
const getConfig = (token) => ({
    headers: {
        Authorization: `Bearer ${token}`
    }
});

const getTickets = async (token) => {
    const response = await axios.get(API_URL, getConfig(token));
    return response.data;
};

const createTicket = async (ticketData, token) => {
    const response = await axios.post(API_URL, ticketData, getConfig(token));
    return response.data;
};

const updateTicket = async (ticketId, ticketData, token) => {
    const response = await axios.put(API_URL + ticketId, ticketData, getConfig(token));
    return response.data;
};

const ticketService = {
    getTickets,
    createTicket,
    updateTicket
};

export default ticketService;

const Ticket = require("../model/Ticket.Model");

const createTicket = async (req, res) => {
    try {
        const { title, description, priority, status } = req.body;
        const ticket = await Ticket.create({ title, description, priority, status });
        res.status(201).json(ticket);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const getTicketList = async (req, res) => {
    try {
        const tickets = await Ticket.find();
        res.status(200).json(tickets);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const updateTicket = async (req, res) => {
    try {
        const { title, description, priority, status } = req.body;
        const ticket = await Ticket.findByIdAndUpdate(req.params.id, { title, description, priority, status });
        res.status(200).json(ticket);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const deleteTicket = async (req, res) => {
    try {
        const ticket = await Ticket.findByIdAndDelete(req.params.id);
        res.status(200).json(ticket);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
module.exports = {
    createTicket,
    getTicketList,
    updateTicket,
    deleteTicket
};
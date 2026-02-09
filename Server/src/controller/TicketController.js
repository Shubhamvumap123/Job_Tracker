const Ticket = require("../model/Ticket.Model");

// Create a new ticket with validation
const createTicket = async (req, res) => {
    try {
        const { title, description, priority, status } = req.body;
        const ticket = await Ticket.create({ title, description, priority, status });
        res.status(201).json(ticket);
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({ error: messages.join(', ') });
        }
        res.status(500).json({ error: error.message });
    }
};

// Get all tickets with optional filtering and search
const getTicketList = async (req, res) => {
    try {
        const { status, priority, search } = req.query;
        const filter = {};

        if (status) filter.status = status;
        if (priority) filter.priority = priority;
        if (search) {
            filter.title = { $regex: search, $options: 'i' };
        }

        const tickets = await Ticket.find(filter).sort({ createdAt: -1 });
        res.status(200).json({ success: true, tickets });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update existing ticket details
const updateTicket = async (req, res) => {
    try {
        const { title, description, priority, status } = req.body;
        const ticket = await Ticket.findByIdAndUpdate(
            req.params.id,
            { title, description, priority, status },
            { new: true, runValidators: true }
        );
        if (!ticket) {
            return res.status(404).json({ error: "Ticket not found" });
        }
        res.status(200).json(ticket);
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({ error: messages.join(', ') });
        }
        res.status(500).json({ error: error.message });
    }
};

// Remove a ticket from the database
const deleteTicket = async (req, res) => {
    try {
        const ticket = await Ticket.findByIdAndDelete(req.params.id);
        if (!ticket) {
            return res.status(404).json({ error: "Ticket not found" });
        }
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
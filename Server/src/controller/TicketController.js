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

module.exports = {
    createTicket
};
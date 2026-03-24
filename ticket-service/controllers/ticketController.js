const Ticket = require('../models/Ticket');
const Redis = require('ioredis');
// For local testing without docker, connect to localhost Redis. With docker, it will use REDIS_HOST env var.
const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

// @desc    Get all tickets
// @route   GET /api/tickets
// @access  Private
const getTickets = async (req, res) => {
    try {
        // If user is not admin/agent, only show their tickets
        let query = {};
        if (req.user && req.user.role === 'customer') {
            query.createdBy = req.user._id;
        }

        const tickets = await Ticket.find(query).sort({ createdAt: -1 });
        res.status(200).json(tickets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single ticket
// @route   GET /api/tickets/:id
// @access  Private
const getTicketById = async (req, res) => {
    try {
        const ticket = await Ticket.findById(req.params.id);

        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }

        if (req.user && req.user.role === 'customer' && ticket.createdBy.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        res.status(200).json(ticket);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create new ticket
// @route   POST /api/tickets
// @access  Private
const createTicket = async (req, res) => {
    try {
        const { title, description, priority } = req.body;

        if (!title || !description) {
            return res.status(400).json({ message: 'Please add title and description' });
        }

        const ticket = await Ticket.create({
            title,
            description,
            priority: priority || 'Low',
            status: 'Open',
            createdBy: req.user.id
        });

        // Publish event to Redis
        redis.publish('ticket_events', JSON.stringify({
            event: 'ticket_created',
            data: ticket
        }));

        res.status(201).json(ticket);
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({ message: messages.join(', ') });
        }
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update ticket
// @route   PUT /api/tickets/:id
// @access  Private
const updateTicket = async (req, res) => {
    try {
        const ticket = await Ticket.findById(req.params.id);

        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }

        if (req.user && req.user.role === 'customer' && ticket.createdBy.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized action' });
        }

        const updatedTicket = await Ticket.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        // Publish event to Redis
        redis.publish('ticket_events', JSON.stringify({
            event: 'ticket_updated',
            data: updatedTicket
        }));

        res.status(200).json(updatedTicket);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete ticket
// @route   DELETE /api/tickets/:id
// @access  Private
const deleteTicket = async (req, res) => {
    try {
        const ticket = await Ticket.findById(req.params.id);

        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }

        if (req.user && req.user.role === 'customer' && ticket.createdBy.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        await ticket.remove();

        // Publish event to Redis
        redis.publish('ticket_events', JSON.stringify({
            event: 'ticket_deleted',
            data: { id: req.params.id }
        }));

        res.status(200).json({ id: req.params.id });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getTickets,
    getTicketById,
    createTicket,
    updateTicket,
    deleteTicket
};

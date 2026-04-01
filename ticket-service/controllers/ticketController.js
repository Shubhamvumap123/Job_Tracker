const Ticket = require('../models/Ticket');
const Redis = require('ioredis');
const mongoose = require('mongoose');
// For local testing without docker, connect to localhost Redis. With docker, it will use REDIS_HOST env var.
const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379', {
    maxRetriesPerRequest: null,
    retryStrategy(times) {
        return Math.min(times * 200, 5000);
    }
});
redis.on('error', (err) => console.error('Redis Connection Error:', err.message));

// @desc    Get all tickets
// @route   GET /api/tickets
// @access  Private
const getTickets = async (req, res) => {
    try {
        const { search, status } = req.query;
        let query = {};

        // 🛡️ Security: If user is not admin/agent, only show their tickets
        if (req.user && req.user.role === 'customer') {
            // Explicitly cast to ObjectId for robust database matching
            query.createdBy = new mongoose.Types.ObjectId(req.user._id);
        }

        // 🔍 Filter by status if provided
        if (status) {
            query.status = status;
        }

        // 📝 Search across company, position, and location if provided
        if (search && search.trim()) {
            const searchRegex = { $regex: search.trim(), $options: 'i' };
            query.$or = [
                { company: searchRegex },
                { position: searchRegex },
                { location: searchRegex }
            ];
        }

        console.log(`[GET /api/tickets] Search: "${search || ''}", Status: "${status || ''}"`);

        const tickets = await Ticket.find(query).sort({ createdAt: -1 });
        console.log(`[DATABASE] Found ${tickets.length} jobs matching query:`, JSON.stringify(query));
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

// @desc    Create new ticket (Job)
// @route   POST /api/tickets
// @access  Private
const createTicket = async (req, res) => {
    try {
        const { company, position, status, location, salary, notes } = req.body;

        if (!company || !position) {
            return res.status(400).json({ message: 'Please add company and position' });
        }

        const ticket = await Ticket.create({
            company,
            position,
            status: status || 'Applied',
            location: location || 'Remote',
            salary,
            notes,
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
        const { company, position, status, location, salary, notes } = req.body;
        const ticket = await Ticket.findById(req.params.id);

        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }

        if (req.user && req.user.role === 'customer' && ticket.createdBy.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized action' });
        }

        const updatedTicket = await Ticket.findByIdAndUpdate(
            req.params.id,
            { company, position, status, location, salary, notes },
            { new: true, runValidators: true }
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

        await Ticket.findByIdAndDelete(req.params.id);

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

const Ticket = require("../model/Ticket.Model");
const { getIo } = require('../services/socketService');

// Helper to calculate SLA due date based on priority
const calculateSLA = (priority) => {
    const now = new Date();
    switch (priority) {
        case 'Critical': return new Date(now.getTime() + 4 * 60 * 60 * 1000); // 4 hours
        case 'High': return new Date(now.getTime() + 24 * 60 * 60 * 1000); // 24 hours
        case 'Medium': return new Date(now.getTime() + 48 * 60 * 60 * 1000); // 48 hours
        default: return new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000); // 5 days
    }
};

// Create a new ticket with enterprise features
const createTicket = async (req, res) => {
    try {
        const { title, description, priority, channel, tags, department } = req.body;

        const ticket = await Ticket.create({
            title,
            description,
            priority: priority || 'Low',
            status: 'New',
            channel: channel || 'Web',
            tags: tags || [],
            department: department || 'General',
            user: req.user.id,
            sla: {
                dueAt: calculateSLA(priority || 'Low')
            }
        });

        // Real-time: Emit event to all agents
        try {
            const io = getIo();
            io.emit('ticket_created', ticket);
        } catch (e) {
            console.error('Socket emission failed:', e.message);
        }

        res.status(201).json(ticket);
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({ message: messages.join(', ') });
        }
        res.status(500).json({ message: 'Server Error: ' + error.message });
    }
};

// Get all tickets with advanced filtering
const getTicketList = async (req, res) => {
    try {
        const { status, priority, search, department, assignedTo } = req.query;
        const filter = {};

        if (status) filter.status = status;
        if (priority) filter.priority = priority;
        if (department) filter.department = department;
        if (assignedTo) filter.assignedTo = assignedTo;

        if (search) {
            filter.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }

        // Access Control
        if (req.user.role === 'customer') {
            filter.user = req.user.id;
        } else if (req.user.role === 'agent') {
            // Agents see tickets assigned to them OR unassigned in their department
            // For simplicity in Phase 1, Agents see everything, or we can filter by department
            // filter.$or = [{ assignedTo: req.user.id }, { department: req.user.department }];
        }

        const tickets = await Ticket.find(filter)
            .populate('user', 'name email')
            .populate('assignedTo', 'name email')
            .sort({ createdAt: -1 })
            .lean(); // Performance: return plain JS objects instead of Mongoose documents

        res.status(200).json({ success: true, tickets });
    } catch (error) {
        res.status(500).json({ message: 'Server Error: ' + error.message });
    }
};

// Update existing ticket details
const updateTicket = async (req, res) => {
    try {
        const ticket = await Ticket.findById(req.params.id);

        if (!ticket) {
            return res.status(404).json({ message: "Ticket not found" });
        }

        // Check ownership/permissions
        // Customers can only update their own tickets (and maybe only reopen?)
        if (req.user.role === 'customer' && ticket.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized' });
        }

        const { title, description, priority, status, assignedTo, department } = req.body;

        // Update fields
        const updatedTicket = await Ticket.findByIdAndUpdate(
            req.params.id,
            { title, description, priority, status, assignedTo, department },
            { new: true, runValidators: true }
        ).populate('assignedTo', 'name');

        // Real-time: Emit update
        try {
            const io = getIo();
            io.to(req.params.id).emit('ticket_updated', updatedTicket); // To watchers
            io.emit('dashboard_update', { id: ticket._id, status, priority }); // For dashboards
        } catch (e) {
            console.error('Socket emission failed:', e.message);
        }

        res.status(200).json(updatedTicket);
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({ message: messages.join(', ') });
        }
        res.status(500).json({ message: 'Server Error: ' + error.message });
    }
};

// Remove a ticket
const deleteTicket = async (req, res) => {
    try {
        const ticket = await Ticket.findById(req.params.id);

        if (!ticket) {
            return res.status(404).json({ message: "Ticket not found" });
        }

        // Allow Admin or the Ticket Owner to delete
        // Check if ticket.user exists to avoid crash on old data
        const isOwner = ticket.user && ticket.user.toString() === req.user.id;
        const isAdmin = req.user.role === 'admin';
        // Allow deletion if ticket has no owner (orphan cleanup)
        const isOrphan = !ticket.user;

        if (!isAdmin && !isOwner && !isOrphan) {
            return res.status(401).json({ message: 'Only Admins or Ticket Owners can delete tickets' });
        }

        await ticket.deleteOne();

        try {
            getIo().emit('ticket_deleted', req.params.id);
        } catch (e) { }

        res.status(200).json({ id: req.params.id });
    } catch (error) {
        res.status(500).json({ message: 'Server Error: ' + error.message });
    }
};

module.exports = {
    createTicket,
    getTicketList,
    updateTicket,
    deleteTicket
};
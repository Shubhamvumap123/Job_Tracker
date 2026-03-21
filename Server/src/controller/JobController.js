const Job = require("../model/Job.Model");
const { getIo } = require('../services/socketService');

// Create a new job application
const createJob = async (req, res) => {
    try {
        const { company, position, status, location, salary, notes } = req.body;

        const job = await Job.create({
            company,
            position,
            status: status || 'Applied',
            location: location || '',
            salary: salary || '',
            notes: notes || '',
            user: req.user.id
        });

        // Real-time: Emit event
        try {
            const io = getIo();
            io.emit('job_created', job);
        } catch (e) {
            console.error('Socket emission failed:', e.message);
        }

        res.status(201).json(job);
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({ message: messages.join(', ') });
        }
        res.status(500).json({ message: 'Server Error: ' + error.message });
    }
};

// Get all job applications for user with advanced filtering
const getJobs = async (req, res) => {
    try {
        const { status, search } = req.query;
        const filter = { user: req.user.id }; // Only show jobs belonging to the authenticated user

        // 🛡️ Sentinel: Enforce string type to prevent NoSQL injection via object payloads
        if (status && typeof status === 'string') filter.status = status;

        if (search && typeof search === 'string') {
            // 🛡️ Sentinel: Escape search parameter to prevent Regex injection and ReDoS vulnerabilities
            const escapedSearch = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            filter.$or = [
                { company: { $regex: escapedSearch, $options: 'i' } },
                { position: { $regex: escapedSearch, $options: 'i' } },
                { location: { $regex: escapedSearch, $options: 'i' } }
            ];
        }

        // ⚡ Bolt: Adding .lean() to significantly improve read performance by returning plain JS objects
        const jobs = await Job.find(filter)
            .sort({ createdAt: -1 })
            .lean();

        // Map to return tickets in { tickets: [] } or { jobs: [] } format
        // The frontend useTickets currently expects response to potentially map to "tickets", let's return jobs: jobs so it matches generic SaaS
        // Actually, we'll return { success: true, tickets: jobs } temporarily so frontend doesn't break during refactor, OR we change it here and fix frontend
        // Going to return jobs and fix frontend.
        res.status(200).json({ success: true, tickets: jobs }); // using tickets for backwards compat with unrefactored client hooks
    } catch (error) {
        res.status(500).json({ message: 'Server Error: ' + error.message });
    }
};

// Update existing job details
const updateJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);

        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }

        // Check ownership
        if (job.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized to update this job' });
        }

        const { company, position, status, location, salary, notes } = req.body;

        // Update fields
        const updatedJob = await Job.findByIdAndUpdate(
            req.params.id,
            { company, position, status, location, salary, notes },
            { new: true, runValidators: true }
        );

        // Real-time: Emit update
        try {
            const io = getIo();
            io.to(req.params.id).emit('job_updated', updatedJob);
            io.emit('dashboard_update', { id: job._id, status });
        } catch (e) {
            console.error('Socket emission failed:', e.message);
        }

        res.status(200).json(updatedJob);
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({ message: messages.join(', ') });
        }
        res.status(500).json({ message: 'Server Error: ' + error.message });
    }
};

// Remove a job
const deleteJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);

        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }

        // Check ownership
        if (job.user.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(401).json({ message: 'User not authorized to delete this job' });
        }

        await job.deleteOne();

        try {
            getIo().emit('job_deleted', req.params.id);
        } catch (e) { }

        res.status(200).json({ id: req.params.id });
    } catch (error) {
        res.status(500).json({ message: 'Server Error: ' + error.message });
    }
};

module.exports = {
    createJob,
    getJobs,
    updateJob,
    deleteJob
};
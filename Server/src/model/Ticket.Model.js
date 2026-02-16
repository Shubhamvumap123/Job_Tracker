const mongoose = require("mongoose");

// Define structure for ticket data
const ticketSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please provide a ticket title"],
        trim: true,
        maxlength: [100, "Title cannot be more than 100 characters"]
    },
    description: {
        type: String,
        required: [true, "Please provide a ticket description"],
        maxlength: [2000, "Description cannot be more than 2000 characters"]
    },
    priority: {
        type: String,
        enum: ["Low", "Medium", "High", "Critical"],
        default: "Low"
    },
    status: {
        type: String,
        enum: ["New", "Open", "In Progress", "On Hold", "Resolved", "Closed"],
        default: "New"
    },
    // Enterprise Features
    channel: {
        type: String,
        enum: ["Web", "Email", "Chat", "Phone", "Social", "API"],
        default: "Web"
    },
    tags: [{
        type: String
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' // The REQUESTER
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' // The AGENT
    },
    department: {
        type: String,
        default: 'General'
    },
    sla: {
        dueAt: Date,
        breached: { type: Boolean, default: false },
        warningSent: { type: Boolean, default: false }
    },
    customFields: {
        type: Map,
        of: String // Flexible key-value pairs for different forms
    },
    messages: [{
        sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        content: String,
        attachments: [String],
        isInternal: { type: Boolean, default: false },
        createdAt: { type: Date, default: Date.now }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Middleware to update 'updatedAt'
ticketSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    if (typeof next === 'function') {
        next();
    }
});

const Ticket = mongoose.model("Ticket", ticketSchema);
module.exports = Ticket;

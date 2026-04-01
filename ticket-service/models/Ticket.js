const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    company: {
        type: String,
        required: [true, 'Please add a company name'],
        trim: true
    },
    position: {
        type: String,
        required: [true, 'Please add a position']
    },
    status: {
        type: String,
        enum: ['Applied', 'Interview', 'Offer', 'Rejected', 'Open'],
        default: 'Applied'
    },
    location: {
        type: String,
        default: 'Remote'
    },
    salary: {
        type: String
    },
    notes: {
        type: String
    },
    priority: {
        type: String,
        enum: ['Low', 'Medium', 'High'],
        default: 'Low'
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Ticket', ticketSchema);

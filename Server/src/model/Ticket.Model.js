const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        enum: ["Low", "Medium", "High"],
        default: "Low"
    },
    status: {
        type: String,
        enum: ["Open", "In Progress", "Closed"],
        default: "Open"
    },
    shape: {
        type: String,
        enum: ["Circle", "Square", "Triangle"],
        default: "Circle"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Ticket = mongoose.model("Ticket", ticketSchema);
module.exports = Ticket;

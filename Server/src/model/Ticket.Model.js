const mongoose = require("mongoose");

// Define structure for ticket data
const ticketSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please provide a ticket title"],
        trim: true,
        maxlength: [100, "Title cannot be more than 100 characters"],
        minlength: [2, "Title must be at least 2 characters"],
        // custom validation to ensure title isn't just numbers/symbols
        validate: {
            validator: function (v) {
                return /[a-zA-Z]/.test(v);
            },
            message: "Title must contain at least one letter"
        }
    },
    description: {
        type: String,
        required: [true, "Please provide a ticket description"],
        trim: true,
        minlength: [2, "Description must be at least 2 characters"],
        // ensure description has meaningful content
        validate: {
            validator: function (v) {
                return /[a-zA-Z]/.test(v);
            },
            message: "Description must contain at least one letter"
        }
    },
    priority: {
        type: String,
        // restrict values to specific options
        enum: {
            values: ["Low", "Medium", "High"],
            message: "{VALUE} is not a valid priority"
        },
        default: "Low"
    },
    status: {
        type: String,
        // restrict values to specific options
        enum: {
            values: ["Open", "In Progress", "Closed"],
            message: "{VALUE} is not a valid status"
        },
        default: "Open"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Ticket = mongoose.model("Ticket", ticketSchema);
module.exports = Ticket;

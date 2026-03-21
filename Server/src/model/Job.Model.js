const mongoose = require("mongoose");

// Define structure for Job Application data
const jobSchema = new mongoose.Schema({
    company: {
        type: String,
        required: [true, "Please provide a company name"],
        trim: true,
        maxlength: [100, "Company name cannot be more than 100 characters"]
    },
    position: {
        type: String,
        required: [true, "Please provide a position title"],
        maxlength: [100, "Position cannot be more than 100 characters"]
    },
    status: {
        type: String,
        enum: {
            values: ["Applied", "Interview", "Offer", "Rejected"],
            message: "Status must be Applied, Interview, Offer, or Rejected"
        },
        default: "Applied"
    },
    location: {
        type: String,
        maxlength: [100, "Location cannot be more than 100 characters"],
        default: ""
    },
    salary: {
        type: String,
        maxlength: [50, "Salary cannot be more than 50 characters"],
        default: ""
    },
    notes: {
        type: String,
        maxlength: [2000, "Notes cannot be more than 2000 characters"],
        default: ""
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Job must belong to a user"],
        ref: 'User'
    },
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
jobSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    if (typeof next === 'function') {
        next();
    }
});

// Indexes for performance optimization on common queries
jobSchema.index({ createdAt: -1 }); // Default sort
jobSchema.index({ status: 1, createdAt: -1 }); // Filter by status + sort
jobSchema.index({ user: 1, createdAt: -1 }); // User's jobs + sort

const Job = mongoose.model("Job", jobSchema);
module.exports = Job;

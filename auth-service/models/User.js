const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        minlength: 6,
        select: false
    },
    role: {
        type: String,
        enum: {
            values: ['admin', 'manager', 'agent', 'customer'],
            message: "Role must be admin, manager, agent, or customer"
        },
        default: 'customer'
    },
    // Enterprise Features
    department: {
        type: String,
        enum: {
            values: ['IT', 'HR', 'Sales', 'General'],
            message: "Department must be IT, HR, Sales, or General"
        },
        default: 'General'
    },
    skills: [{
        type: String // e.g., 'Javascript', 'Billing', 'Hardware'
    }],
    availability: {
        status: {
            type: String,
            enum: ['Available', 'Busy', 'Offline', 'On Break'],
            default: 'Offline'
        },
        lastSeen: Date
    },
    settings: {
        notifications: {
            email: { type: Boolean, default: true },
            browser: { type: Boolean, default: true }
        },
        theme: { type: String, default: 'light' }
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Encrypt password using bcrypt
userSchema.pre('save', async function () {
    if (!this.isModified('password')) {
        return;
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);

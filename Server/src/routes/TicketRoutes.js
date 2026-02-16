
const express = require("express");
const router = express.Router();

const { createTicket } = require("../controller/TicketController");
const { getTicketList } = require("../controller/TicketController");
const { updateTicket } = require("../controller/TicketController");
const { deleteTicket } = require("../controller/TicketController");
const { protect } = require("../middleware/authMiddleware");

// Create new ticket
router.post("/create", protect, createTicket);

// Get list of tickets
router.get("/list", protect, getTicketList);

// Update specific ticket
router.put("/update/:id", protect, updateTicket);

// Delete specific ticket
router.delete("/delete/:id", protect, deleteTicket);

module.exports = router;

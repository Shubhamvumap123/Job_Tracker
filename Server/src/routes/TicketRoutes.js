
const express = require("express");
const router = express.Router();

const { createTicket } = require("../controller/TicketController");
const { getTicketList } = require("../controller/TicketController");
const { updateTicket } = require("../controller/TicketController");
const { deleteTicket } = require("../controller/TicketController");
// Create new ticket
router.post("/create", createTicket);

// Get list of tickets
router.get("/list", getTicketList);

// Update specific ticket
router.put("/update/:id", updateTicket);

// Delete specific ticket
router.delete("/delete/:id", deleteTicket);

module.exports = router;

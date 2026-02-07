
const express = require("express");
const router = express.Router();

const { createTicket } = require("../controller/TicketController");
const { getTicketList } = require("../controller/TicketController");
const { updateTicket } = require("../controller/TicketController");
const { deleteTicket } = require("../controller/TicketController");
// Create tickets 

// View ticket list 

// Update ticket status 

// Delete tickets 

router.post("/create", createTicket);
router.get("/list", getTicketList);
router.put("/update/:id", updateTicket);
router.delete("/delete/:id", deleteTicket);

module.exports = router;

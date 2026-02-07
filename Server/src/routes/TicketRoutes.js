
const express = require("express");
const router = express.Router();

const { createTicket } = require("../controller/TicketController");

router.post("/create", createTicket);

module.exports = router;

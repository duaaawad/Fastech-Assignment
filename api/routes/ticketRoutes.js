const express = require("express");
const router = express.Router();
const TicketsController = require("../controllers/ticketController");
const { checkAuth } = require("../middleware/check-auth")

//POST /tickets/
router.post("/", checkAuth, TicketsController.users_add_ticket);

//GET /tickets/ all Customer Tickets FOR Admin Role 
router.get("/", checkAuth, TicketsController.tickets);


module.exports = router;
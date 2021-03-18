const { Ticket } = require("../models/ticketModel");
const ObjectID = require("mongoose").Types.ObjectId;


// POST /tickets: Create and Save a new Ticket
exports.users_add_ticket = (req, res, next) => {

    const ticket = new Ticket({
        _id: new ObjectID(),
        message: req.body.message,
        //userId: token._id // need get the id from the token 
    });
    // Save Ticket in the database
    ticket.save()
        .then(resTicket => {
            //console.log("Results: ", resTicket);
            if (resTicket) {
                res.status(201).json(resTicket);
            } else {
                res.status(404).json({ message: "No....." });
            }
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

// Retrieve and return all tickets from the db.// use pageable + admin user 
exports.tickets = (req, res) => {
    Ticket.find()
        .then(tickets => {
            res.send(tickets);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving tickets."
            });
        });
};
const mongoose = require("mongoose");

var TicketSchema = mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        message: {
            type: String,
            required: true
        },
        userId: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
        }
    },
    { timestamps: true }
);

var Ticket = mongoose.model("Ticket", TicketSchema);

module.exports = { Ticket };
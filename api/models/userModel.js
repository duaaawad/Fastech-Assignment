const mongoose = require("mongoose");
//const validator = require("./node_modules/validator");  //not required now , validtaion set from front end team 

var UserSchema = mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        emailAddress: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            /*minlength: 1,
             validate: {
                validator: validator.isEmail,
                message: "{VALUE} is not a valid email"
              }*/
        },
        password: {
            type: String,
            required: true,
            minlength: 6
        },
        role: {
            type: String,
            enum: ['admin', 'user']
        },

    },
    { timestamps: true }
);

var User = mongoose.model("User", UserSchema);

module.exports = { User };

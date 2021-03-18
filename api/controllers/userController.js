const { User } = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ObjectID = require("mongoose").Types.ObjectId;

// POST /users/signup
exports.users_create_user = (req, res, next) => {
    /**
     *   to register new user in db
     * 1-  check if emailAddress exists in db using User.find({ emailAddress: req.body.emailAddress })
     * 2- if emailAddress is not exist hash the password using bcrypt
     * 3- create user
     * 4- save the user
     * 5- get the token in json res
     */
    // (1)
    debugger;
    User.find({ emailAddress: req.body.emailAddress })
        .exec()
        .then(user => {
            if (user.length >= 1) {
                return res.status(409).json({
                    message: "This Email or account already exists"
                });
            } else {
                console.log(req.body);
                //(2)
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        res.status(500).json({
                            error: err
                        });
                    } else {
                        // (3)
                        const user = new User({
                            _id: new ObjectID(),
                            firstName: req.body.firstName,
                            lastName: req.body.lastName,
                            emailAddress: req.body.emailAddress,
                            password: hash,
                            role: req.body.role
                        });
                        // (4)
                        user
                            .save()
                            .then(resUser => {
                                if (resUser) {
                                    // (5)
                                    const token = jwt.sign(
                                        {
                                            _id: resUser._id
                                        },
                                        process.env.JWT_SECRET,
                                        {
                                            expiresIn: "60"
                                        }
                                    );
                                    return res.status(201).json({
                                        message: "User Successfully Created!",
                                        user: resUser,
                                        token: token
                                    });
                                }
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(500).json({ error: err });
                            });
                    }
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

// POST /users/login
exports.user_login = (req, res, next) => {

    const body = {
        emailAddress: req.body.emailAddress,
        password: req.body.password,
        role: req.body.role
    };
    User.find({ emailAddress: body.emailAddress })
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(403).json({
                    message: "Authentication Failed"
                });
            } else {
                bcrypt.compare(body.password, user[0].password, (err, response) => {
                    if (err) {
                        return res.status(403).json({
                            message: "Authentication Failed",
                            status: res.statusCode
                        });
                    }
                    if (response) {
                        const token = jwt.sign(
                            { _id: user[0]._id },
                            process.env.JWT_SECRET,
                            {
                                expiresIn: "60"
                            }
                        );
                        return res.status(200).json({
                            message: "Authentication successful",
                            user: user[0],
                            token: token
                        });
                    }
                    return res.status(403).json({
                        message: "Authentication Failed"
                    });
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};

// PUT /users/:id
exports.users_update_user = (req, res, next) => {

    const id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).json({
            message: "ID is not Valid",
            status: 404
        });
    } else {
        console.log("updating user info...");
        // Find user and update it with the request body
        User.findByIdAndUpdate(req.params.id, {

            firstName: req.body.firstName

        }, { new: true })
            .then(user => {
                if (!user) {
                    return res.status(404).send({
                        message: "User not found with id " + req.params.id
                    });
                }
                res.send(user);
            }).catch(err => {
                if (err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "User not found with id " + req.params.id
                    });
                }
                return res.status(500).send({
                    message: "Error updating user with id " + req.params.id
                });
            });
    };

};
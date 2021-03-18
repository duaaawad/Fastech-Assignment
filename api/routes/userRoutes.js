const express = require("express");
const router = express.Router();
const UsersController = require("../controllers/userController");
const { checkAuth } = require("../middleware/check-auth")


//POST sign up a new user
router.post("/signup", UsersController.users_create_user);

//POST login 
router.post("/login", UsersController.user_login);

//PUT users/:id
router.put("/:id", checkAuth, UsersController.users_update_user);

module.exports = router;
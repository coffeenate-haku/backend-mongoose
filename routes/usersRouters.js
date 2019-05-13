const router = require("express").Router()
const userController = require("../controllers/users")

// USER REGISTRATION
router.post("/register", userController.register)

// USER LOGIN
router.post("/login", userController.login)

module.exports = router

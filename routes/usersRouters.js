const router = require("express").Router()
const userController = require("../controllers/users")

// GET ALL USERS DATA
router.get("/", userController.getAllUsers)

// USER REGISTRATION
router.post("/register", userController.register)

// USER LOGIN
router.post("/login", userController.login)

module.exports = router

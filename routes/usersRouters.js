const router = require("express").Router()
const userController = require("../controllers/users")
const helper = require("../helpers")

// // GET ALL USERS DATA
// router.get("/", userController.getAllUsers)

// GET ONE USERS DATA
router.get("/:id", helper.isAuthenticated, userController.getOneUser)

// USER REGISTRATION
router.post("/register", userController.register)

// USER LOGIN
router.post("/login", userController.login)

// ADD USER COFFEE PREFERENCES
router.put("/:id", helper.isAuthenticated, userController.addCoffeePreferences)

module.exports = router

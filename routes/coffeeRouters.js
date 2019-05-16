const router = require("express").Router()
const coffeeController = require("../controllers/coffee")

// GET ALL COFFEE DATA
router.get("/", coffeeController.getAllCoffee)

// REGISTER COFFEE DATA
router.post("/", coffeeController.register)

module.exports = router

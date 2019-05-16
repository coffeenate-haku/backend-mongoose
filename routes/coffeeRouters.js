const router = require("express").Router()
const coffeeControllers = require("../controllers/coffee")

// GET ALL COFFEE DATA
router.get("/", coffeeControllers.getAllCoffee)

// REGISTER COFFEE DATA
router.post("/", coffeeControllers.register)

module.exports = router

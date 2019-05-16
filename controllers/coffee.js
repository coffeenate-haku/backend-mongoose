const Coffee = require("../models/coffee")

const coffeeControllers = {
  // GET ALL COFFEE DATA
  getAllCoffee: (req, res) => {
    Coffee.find().then(response => {
      res.send(response)
    })
  },

  // REGISTER COFFEE
  register: (req, res) => {
    try {
      new Coffee({
        name: req.body.name,
        sugarLevel: req.body.sugarLevel,
        bodyLevel: req.body.bodyLevel,
        foamLevel: req.body.foamLevel,
        milkLevel: req.body.milkLevel,
        flavors: req.body.flavors,
        descriptions: req.body.descriptions,
        image: req.body.image
      })
        .save()
        .then(coffee => res.send({ message: `Coffee entered`, data: coffee }))
    } catch (error) {
      res.send(error)
    }
  }
}

module.exports = coffeeControllers

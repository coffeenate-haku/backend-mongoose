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
        type: req.body.type,
        sweetnessLevel: req.body.sweetnessLevel,
        flavors: req.body.flavors,
        descriptions: req.body.descriptions
      })
        .save()
        .then(coffee => res.send({ message: `Coffee entered`, data: coffee }))
    } catch (error) {
      res.send(error)
    }
  }
}

module.exports = coffeeControllers

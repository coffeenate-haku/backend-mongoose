require("dotenv").config() // to read .env file

const PORT = process.env.PORT
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const cors = require("cors")

// parse data from front-end to backend
app.use(bodyParser.json()) // parse application/json
app.use(bodyParser.urlencoded({ extended: false })) // parse application/x-www-form-urlencoded
app.use(cors())

// models
const User = require("./models/users")
const Coffee = require("./models/coffee")

mongoose.set("useCreateIndex", true)

// Connected to database
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true }, () =>
  console.log(`connected to database`)
)

// =============== route here =============================

// ===== Coffee
app.post("/coffee", (req, res) => {
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
})

// ======== users
app.post("/users/register", (req, res) => {
  try {
    new User({
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    })
      .save()
      .then(newUser => res.send({ message: `Data entered`, data: newUser }))
  } catch (error) {
    res.send(error)
  }
})

// ======================================================
app.listen(PORT, () => console.log(`app listening on port ${PORT}`))

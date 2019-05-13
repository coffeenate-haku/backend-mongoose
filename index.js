require("dotenv").config() // to read .env file

const PORT = process.env.PORT
const express = require("express")
const app = express()

const bodyParser = require("body-parser")
const cors = require("cors")

// parse data from front-end to backend
app.use(bodyParser.json()) // parse application/json
app.use(bodyParser.urlencoded({ extended: false })) // parse application/x-www-form-urlencoded
app.use(cors())

// =============== route here =============================
const userRoutes = require("./routes/usersRouters")
app.use("/users", userRoutes)

// =============================================== Coffee
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

// ======================================================= users
app.get("/users", (req, res) => {
  Users.find().then(response => {
    res.send(response)
  })
})

// ======================================================
app.listen(PORT, () => console.log(`app listening on port ${PORT}`))

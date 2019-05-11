require("dotenv").config() // to read .env file

const PORT = process.env.PORT
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const cors = require("cors")

// models
const User = require("./models/users")

// parse data from front-end to backend
app.use(bodyParser.json()) // parse application/json
app.use(bodyParser.urlencoded({ extended: false })) // parse application/x-www-form-urlencoded
app.use(cors())

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true }, () =>
  console.log(`connected to MongoDB Atlas`)
)

// =============== route here =============================
app.post("/register", (req, res) => {
  new User({
    name: req.body.name,
    age: req.body.age
  })
    .save()
    .then(newUser => res.send({ message: `Data entered`, data: newUser }))
})

// ======================================================
app.listen(PORT, () => console.log(`app listening on port ${PORT}`))

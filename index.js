require("dotenv").config() // to read .env file

const PORT = process.env.PORT
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const cors = require("cors")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

// parse data from front-end to backend
app.use(bodyParser.json()) // parse application/json
app.use(bodyParser.urlencoded({ extended: false })) // parse application/x-www-form-urlencoded
app.use(cors())

// models
const Users = require("./models/users")
const Coffee = require("./models/coffee")

mongoose.set("useCreateIndex", true) //this line of code is from mongoose documentation

// Connected to database
mongoose.connect(
  process.env.HEROKU_URI,
  { useNewUrlParser: true, useFindAndModify: false }, //this line of code is from mongoose documentation
  () => console.log(`connected to database`)
)

// =============== route here =============================
app.get("/users", (req, res) => {
  res.send("it should be get users")
})

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
    const salt = bcrypt.genSaltSync(7)
    req.body.password = bcrypt.hashSync(req.body.password, salt)

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

app.post("/users/login", (req, res) => {
  try {
    //find user email in database
    Users.find({ email: req.body.email }, (error, result) => {
      try {
        // if email isn't registered, send "your email is not registered"
        if (result === null) return res.send("Your email is not registered")

        // compare password from user input to password stored in database
        const validPassword = bcrypt.compare(req.body.password, result.password)

        if (!validPassword) return res.send("password is not valid")

        const token = jwt.sign(
          {
            id: result.id,
            email: result.email
          },
          process.env.JWT_SECRET,
          { expiresIn: "7d" }
        )

        res.send({
          message: "You are logged in",
          token: token,
          data: result
        })
      } catch {
        res.send(error)
      }
    })
  } catch (error) {
    res.send(error)
  }
})

// ======================================================
app.listen(PORT, () => console.log(`app listening on port ${PORT}`))

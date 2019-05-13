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

app.post("/users/login", (req, res) => {
  try {
    Users.findOne({ email: req.body.email }, async (error, result) => {
      if (error) {
        res.send(error)
      } else {
        if (result === null) return res.send("Your email is not registered")

        const validPassword = await bcrypt.compare(
          req.body.password,
          result.password
        )

        if (!validPassword) {
          return res.send("password is not valid")
        } else {
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
            user: result
          })
        }
      }
    })
  } catch (error) {
    console.log(error)
  }
})

// ======================================================
app.listen(PORT, () => console.log(`app listening on port ${PORT}`))

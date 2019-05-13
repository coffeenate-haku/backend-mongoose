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
// USERS ROUTE
const userRoutes = require("./routes/usersRouters")
app.use("/users", userRoutes)

// COFFEE ROUTE
const coffeeRoutes = require("./routes/coffeeRouters")
app.use("/coffee", coffeeRoutes)

// =============================================== Coffee
// app.post("/coffee", (req, res) => {
//   try {
//     new Coffee({
//       name: req.body.name,
//       type: req.body.type,
//       sweetnessLevel: req.body.sweetnessLevel,
//       flavors: req.body.flavors,
//       descriptions: req.body.descriptions
//     })
//       .save()
//       .then(coffee => res.send({ message: `Coffee entered`, data: coffee }))
//   } catch (error) {
//     res.send(error)
//   }
// })

// ======================================================
app.listen(PORT, () => console.log(`app listening on port ${PORT}`))

const Users = require("../models/users")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const userControllers = {
  // USER REGISTRATION

  register: (req, res) => {
    try {
      Users.findOne({ email: req.body.email }, (error, result) => {
        if (error) {
          res.send(error)
        } else {
          if (result) return res.send("Email has been registered")

          const salt = bcrypt.genSaltSync(7)
          req.body.password = bcrypt.hashSync(req.body.password, salt)

          new Users({
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
          })
            .save()
            .then(newUser =>
              res.send({ message: `Data entered`, data: newUser })
            )
        }
      })
    } catch (error) {
      console.log(error)
      res.send(error)
    }
  },

  // USER LOGIN
  login: (req, res) => {
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
  }
}

module.exports = userControllers

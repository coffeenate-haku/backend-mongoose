const Users = require("../controllers/users")
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
      res.send(error)
    }
  }
}

module.exports = userControllers

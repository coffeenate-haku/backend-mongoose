const Users = require("../models/users")
const Coffee = require("../models/coffee")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const userControllers = {
  // GET ALL USERS DATA
  getAllUsers: (req, res) => {
    Users.find()
      .then(response => {
        res.send(response)
      })
      .catch(error => res.send(error))
  },

  // GET ONE USERS DATA
  getOneUser: (req, res) => {
    Users.findOne({ id: req.params.id })
      .then(response => {
        res.send(response)
      })
      .catch(error => res.send(error))
  },

  // USER REGISTRATION
  register: (req, res) => {
    try {
      // Check if the email entered has been registered or not, if it does stop the registration (else)
      Users.findOne({ email: req.body.email }, (error, result) => {
        if (error) {
          res.send(error)
        } else {
          if (result) return res.send("Email has been registered")

          // encrypt the user password
          const salt = bcrypt.genSaltSync(7)
          req.body.password = bcrypt.hashSync(req.body.password, salt)

          // register the user
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
  },

  // USER LOGIN
  login: (req, res) => {
    try {
      // Check if the email entered has been registered or not, if its not, stop the login (else)
      Users.findOne({ email: req.body.email }, async (error, result) => {
        if (error) {
          res.send(error)
        } else {
          if (result === null) return res.send("Your email is not registered")

          // compare the encrypted password to the password in the database
          const validPassword = await bcrypt.compare(
            req.body.password,
            result.password
          )

          // Stop the login process if the password doesn't match
          if (!validPassword) {
            return res.send("password is not valid")
          }
          // give the token if the password correct
          else {
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
      res.send(error)
    }
  },

  //ADD USER COFFEE PREFERENCES
  addCoffeePreferences: async (req, res) => {
    try {
      // Find cofee recommendation
      const recommendations = await Coffee.find(
        { type: req.body.type } && {
            sweetnessLevel: req.body.sweetnessLevel
          } && { flavors: req.body.flavors },
        ["_id"], //key apa yang mau diambil
        (error, preferences) => {
          if (error) {
            return res.send(error)
          }

          return preferences
        }
      )

      const query = { id: req.params.id }

      const updateData = {
        $push: {
          coffeePreferences: {
            ...req.body,
            coffeeRecommendations: recommendations
          }
        }
      }

      Users.findOneAndUpdate(
        query,
        updateData,
        { new: true }, //tampilakan data yang terbaru setelah diupdate
        (error, result) => {
          if (error) {
            res.send(error)
          } else {
            res.send(result)
          }
        }
      )
    } catch (error) {
      res.send(error)
    }
  },

  getRecommendations: (req, res) => {
    Users.findOne({ id: req.params.id })
      .populate("coffeePreferences.coffeeRecommendations", "-name")
      .exec((error, result) => {
        if (error) {
          res.send(error)
        }

        res.send(result)
      })
  }
}

module.exports = userControllers

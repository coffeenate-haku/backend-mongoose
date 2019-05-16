const Users = require("../models/users")
const jwt = require("jsonwebtoken")

module.exports = {
  isAuthenticated: async (req, res, next) => {
    // 1. Get token
    const token = req.headers.authorization.split(" ")[1]

    if (!token) {
      return res.send("Token not found")
    }

    // 2. Verify token
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      const user = await Users.findOne({ id: decoded.id })

      if (user === null) {
        return res.send("Account not found")
      }

      req.decoded = decoded
      next() // this syntax is for continue to the userController.xxxx
    } catch (error) {
      return res.send(error)
    }
  }
}

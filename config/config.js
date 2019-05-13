// This config is setup for mongoDB
require("dotenv").config()
const mongoose = require("mongoose")

const MONGODB_URI =
  process.env.MONGODB_URI || `mongodb://localhost:27017/coffeenate`

mongoose.set("useCreateIndex", true) //this line of code is from mongoose documentation

// Connected to database
mongoose.connect(
  MONGODB_URI,
  { useNewUrlParser: true, useFindAndModify: false }, //this line of code is from mongoose documentation
  () => console.log(`connected to database`)
)

module.exports = mongoose

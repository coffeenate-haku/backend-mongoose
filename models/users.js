const mongoose = require("mongoose")
const Schema = mongoose.Schema

//Define a Schema
const userSchema = new Schema({
  name: String,
  age: Number
})

// it will create a 'users' collection/model
const User = mongoose.model("user", userSchema)

module.exports = User

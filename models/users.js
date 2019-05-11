const mongoose = require("mongoose")
const Schema = mongoose.Schema
const AutoIncrement = require("mongoose-sequence")(mongoose)

//Define a Schema
const UserSchema = new Schema(
  {
    name: String,
    username: String,
    email: String,
    password: String
  },
  {
    timestamps: true
  }
)

UserSchema.plugin(AutoIncrement, {
  id: "users_counter",
  inc_field: "id"
})

// it will create a 'users' collection/model when user do registration
const User = mongoose.model("user", UserSchema)

module.exports = User
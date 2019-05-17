const mongoose = require("../config/config")
const Schema = mongoose.Schema
const AutoIncrement = require("mongoose-sequence")(mongoose)

//Define a Schema
const UserSchema = new Schema(
  {
    name: String,
    username: String,
    email: String,
    password: String,
    coffeePreferences: [
      {
        hotCold: [String],
        sugarLevel: [String],
        bodyLevel: [Number],
        foamLevel: [Number],
        milkLevel: [Number],
        flavors: [String],
        coffeeRecommendations: [{ type: Schema.Types.ObjectId, ref: "Coffee" }]
      }
    ]
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
const Users = mongoose.model("Users", UserSchema)

module.exports = Users

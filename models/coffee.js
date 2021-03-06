const mongoose = require("../config/config")
const Schema = mongoose.Schema
const AutoIncrement = require("mongoose-sequence")(mongoose)

//Define a Schema
const CoffeeSchema = new Schema(
  {
    // _id: Schema.Types.ObjectId,
    name: String,
    hotCold: [String],
    sugarLevel: [String],
    bodyLevel: [Number],
    foamLevel: [Number],
    milkLevel: [Number],
    flavors: [String],
    descriptions: String,
    image: String
  },
  {
    timestamps: true
  }
)

CoffeeSchema.plugin(AutoIncrement, {
  id: "coffee_counter",
  inc_field: "id"
})

// it will create a 'users' collection/model when user do registration
const Coffee = mongoose.model("Coffee", CoffeeSchema)

module.exports = Coffee

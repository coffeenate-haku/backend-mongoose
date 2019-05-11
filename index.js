require("dotenv").config() // to read .env file

const PORT = process.env.PORT
const express = require("express")
const app = express()

app.get("/", (req, res) => res.send("Hello World!"))
app.listen(PORT, () => console.log(`app listening on port ${PORT}`))

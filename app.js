const express = require("express")
const axios = require("axios")
const bodyParser = require("body-parser")
const cors = require("cors")
const router = require("./routes")
const AppError = require("./utils/appError");
const errorHandler = require("./utils/errorHandler");

const PORT = process.env.PORT || 5000
const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/', router)
app.use(cors())

app.get("/", (req, res) => {
  res.send("Welcome to your App!")
})

// app.post("/static_perform/posts", (req, res) => {
//   console.log('post');
// })

// app.get("/static_perform/posts", (req, res) => {
//   console.log('get');
// })

app.listen(PORT, function () {
  console.log(`Express server listening on port ${PORT}`)
})

module.exports = app;
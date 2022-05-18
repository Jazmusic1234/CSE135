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

app.get("/api", (req, res) => {
  res.send("Welcome to your App!")
})

app.get("/api/static", (req, res) => {
  axios.get("https://jsonplaceholder.typicode.com/users")
    .then(function(response) {
      res.json(response.data)
    }).catch(function(error) {
      res.json("Error occurred!")
    })
})

app.post("/api/static", (req, res) => {
  if (!req.body.id) {
    res.json("No ID found in request body.")
  } else {
    axios.get(`https://jsonplaceholder.typicode.com/users/${req.body.id}`)
      .then(function(response) {
        res.json(response.data)
      }).catch(function(error) {
        res.json("Error occurred!")
      })
  }
})

app.listen(PORT, function () {
  console.log(`Express server listening on port ${PORT}`)
})

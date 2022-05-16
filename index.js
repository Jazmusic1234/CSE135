const express = require("express");

const PORT = 8000;
const app = express();

app.get("/", (req, res) => {
  res.send("Welcome to your App!");
});

app.listen(PORT, function () {
  console.log(`Express server listening on port ${PORT}`);
});

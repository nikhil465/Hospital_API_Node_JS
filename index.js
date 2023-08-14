const express = require("express");
const app = express();
const port = 8000;
const db = require("./config/mongoose");

app.use(express.urlencoded({ extended: false }));

app.use("/", require("./routes/index"));

app.listen(port, function (err) {
  if (err) {
    console.log("Error in running the server : ", err);
  }

  console.log("Server is up and running on port : ", port);
});

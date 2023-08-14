const express = require("express");
const router = express.Router();

router.use("/doctor", require("./doctors"));

module.exports = router;

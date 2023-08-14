const express = require("express");
const router = express.Router();

router.use("/doctor", require("./doctors"));
router.use("/patient", require("./patients"));
router.use("/report", require("./reports"));

module.exports = router;

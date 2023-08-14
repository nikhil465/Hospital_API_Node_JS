const express = require("express");
const router = express.Router();
const reportController = require("../../../controllers/report_controller");
const passport = require("passport");

router.get(
  "/:status",
  passport.authenticate("jwt", { session: false }),
  reportController.filterByStatus
);

module.exports = router;

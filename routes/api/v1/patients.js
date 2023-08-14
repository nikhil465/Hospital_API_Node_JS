const express = require("express");
const router = express.Router();
const passport = require("passport");
const patientController = require("../../../controllers/patient_controller");

router.post("/register", patientController.register);
router.post(
  "/:id/create-report",
  passport.authenticate("jwt", { session: false }),
  patientController.createReport
);
router.get(
  "/:id/all_reports",
  passport.authenticate("jwt", { session: false }),
  patientController.allReports
);

module.exports = router;

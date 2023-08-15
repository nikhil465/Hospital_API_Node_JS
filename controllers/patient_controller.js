const Doctor = require("../models/doctor");
const Patient = require("../models/patient");
const Report = require("../models/report");

module.exports.register = async function (req, res) {
  try {
    let patient = await Patient.find({
      phone: req.body.phone,
    }).select("-createdAt -updatedAt -__v");

    if (patient.length !== 0) {
      return res.status(409).json({
        messsage: "Patient is already exists",
        data: patient,
      });
    }

    await Patient.create({
      name: req.body.name,
      phone: req.body.phone,
    });

    return res.status(200).json({
      message: "Patient Registered Successfully",
    });
  } catch (error) {
    console.log("Error in registering Patient : ", error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports.createReport = async function (req, res) {
  try {
    let patient = await Patient.findById(req.params.id);

    if (patient) {
      let report = await Report.create({
        doctor: req.user._id,
        patient: req.params.id,
        status: req.body.status,
      });

      patient.reports.push(report);
      patient.save();

      return res.status(200).json({
        message: "Report Created Successfully",
      });
    }

    return res.status(404).json({
      message: "Cannot find Patient",
    });
  } catch (error) {
    console.log("Error in creating report : ", error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports.allReports = async function (req, res) {
  try {
    let patient = await Patient.findById(req.params.id)
      .populate({ path: "reports", select: "-_id status createdAt" })
      .select("-_id -createdAt -updatedAt -__v");

    if (patient) {
      return res.status(200).json({
        message: "Success",
        data: patient,
      });
    }

    return res.status(404).json({
      message: "Cannot find Patient",
    });
  } catch (error) {
    console.log("Error in getting all reports : ", error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

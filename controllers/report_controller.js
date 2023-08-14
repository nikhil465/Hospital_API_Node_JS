const Report = require("../models/report");

module.exports.filterByStatus = async function (req, res) {
  try {
    let reports = await Report.find({ status: req.params.status })
      .populate({ path: "patient", select: "-_id -updatedAt -reports -__v" })
      .select("-_id -updatedAt -doctor -__v");

    return res.status(200).json({
      message: "Success",
      data: reports,
    });
  } catch (error) {
    console.log("Error in report filter by status : ", error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

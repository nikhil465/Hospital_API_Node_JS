const Doctor = require("../models/doctor");
const jwt = require("jsonwebtoken");
const env = require("../config/environment");

//Register Doctor
module.exports.register = async function (req, res) {
  try {
    //console.log(req);
    //Find the doctor in DB
    let doctor = await Doctor.create({
      username: req.body.username,
      password: req.body.password,
    });

    //return status for success of inserting
    return res.status(200).json({
      message: "Doctor Registered Successfully",
    });
  } catch (error) {
    //if anything error happens at creating
    console.log("Error in registering doctor : ", error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports.login = async function (req, res) {
  try {
    let doctor = await Doctor.findOne({ username: req.body.username });
    if (doctor.password !== req.body.password) {
      return res.status(422).json({
        message: "Invalid Username/Password",
      });
    }

    return res.status(200).json({
      message: "Login Successfully",
      data: {
        token: jwt.sign(doctor.toJSON(), env.jwt_secret, { expiresIn: 100000 }),
      },
    });
  } catch (error) {
    console.log("Error in login doctor : ", error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

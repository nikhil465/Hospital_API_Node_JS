const Doctor = require("../models/doctor");
const jwt = require("jsonwebtoken");
const env = require("../config/environment");

//Register Doctor
module.exports.register = async function (req, res) {
  try {
    //Find the doctor in DB
    let doctor = await Doctor.findOne({ username: req.body.username }).select(
      "-_id -createdAt -updatedAt -__v -password"
    );

    if (doctor) {
      return res.status(409).json({
        messsage: "Doctor is already exists",
        data: doctor,
      });
    }

    //Create Doctor
    let newDoctor = await Doctor.create({
      username: req.body.username,
      password: req.body.password,
    });
    //return status for success of inserting
    return res.status(200).json({
      message: "Doctor Registered Successfully",
      data: {
        id: newDoctor._id,
      },
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

module.exports.deleteAll = async function (req, res) {
  try {
    let doctor = await Doctor.deleteMany();

    return res.status(200).json({
      message: "Deleted Successfully",
      data: doctor,
    });
  } catch (error) {
    console.log("Error in login doctor : ", error);

    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

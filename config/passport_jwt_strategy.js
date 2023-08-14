const passport = require("passport");
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const env = require("./environment");

const Doctor = require("../models/doctor");

//For JWT Options
let options = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: env.jwt_secret,
};

passport.use(
  new JWTStrategy(options, function (jwtPayload, done) {
    //Finding Doctor
    Doctor.findById(jwtPayload._id)
      .catch((err) => {
        //If error in finding Doctor
        console.log("Error in finding the doctor : ", err);
        return;
      })
      .then((doctor) => {
        //If found Doctor
        if (doctor) {
          return done(null, doctor);
        } else {
          //else didn't find
          return done(null, false);
        }
      });
  })
);

module.exports = passport;

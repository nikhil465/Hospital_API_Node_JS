const passport = require("passport");
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const env = require("./environment");

const Doctor = require("../models/doctor");

let options = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: env.jwt_secret,
};

passport.use(
  new JWTStrategy(options, function (jwtPayload, done) {
    Doctor.findOne(jwtPayload._id)
      .catch((err) => {
        console.log("Error in finding the doctor : ", err);
        return;
      })
      .then((doctor) => {
        if (doctor) {
          return done(null, doctor);
        } else {
          return done(null, false);
        }
      });
  })
);

module.exports = passport;

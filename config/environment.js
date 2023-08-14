const fs = require("fs");
const rfs = require("rotating-file-stream");
const path = require("path");

const logDirectory = path.join(__dirname, "../production_logs");
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream("access.log", {
  interval: "1d",
  path: logDirectory,
});

const development = {
  name: "development",
  db: "hospital_development",
  jwt_secret: "codial",
  morgan: {
    mode: "dev",
    options: {
      stream: accessLogStream,
    },
  },
};

const production = {
  name: "production",
  db: process.env.CODIAL_DB,
  jwt_secret: process.env.CODIAL_JWT_SECRET,
  morgan: {
    mode: "combined",
    options: {
      stream: accessLogStream,
    },
  },
};

module.exports =
  eval(process.env.CODIAL_ENVIRONMENT) == undefined
    ? development
    : eval(process.env.CODIAL_ENVIRONMENT);
// module.exports = development;

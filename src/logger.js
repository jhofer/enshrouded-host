const { logToDiscord } = require("./discord/index.js");
const fs = require("fs");
const path = require("path");

const logFile = path.join(".", "server.log");
//delete log file if it exists
if (fs.existsSync(logFile)) {
  fs.unlinkSync(logFile);
}
const logStream = fs.createWriteStream(logFile, { flags: "a" });

exports.log = (message) => {
  console.log(message);
  logStream.write(`${message}\n`);
  logToDiscord(message); // Send log message to Discord
};

exports.logError = (message) => {
  console.error(message);
  logStream.write(`${message}\n`);
  logToDiscord(message); // Send error message to Discord
};

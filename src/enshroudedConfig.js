const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();

const serverPath = process.env.SERVER_PATH;
const configPath = `${serverPath}/enshrouded_server.json`;

const fileContent = fs.readFileSync(configPath, "utf8");
exports.serverConfig = JSON.parse(fileContent);

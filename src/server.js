const { spawn } = require("child_process");
const { fileURLToPath } = require("url");
const path = require("path");
const { log, logError } = require("./logger.js");


console.log("Current directory:", __dirname);
const serverWrapper = spawn(
  "powershell.exe",
  ["-ExecutionPolicy", "Bypass", "-File", "run_server.ps1"],
  {
    cwd: __dirname,
  }
);

// Log output from the server
serverWrapper.stdout.on("data", (data) => {
  const message = data.toString().trim();
  log(message);
});
serverWrapper.stderr.on("data", (data) => {
  const message = data.toString().trim();
  logError(message);
});

// Wait for the server to exit
serverWrapper.on("exit", (code) => {
  const message = `Server exited with code ${code}`;
  log(message);
  process.exit(code);
});

process.on("exit", () => {
  log("Exiting...");
  serverWrapper.kill("SIGINT");
});
process.on("SIGINT", () => {
  log("Exiting (SIGINT)...");
  serverWrapper.kill("SIGINT");
});
process.on("SIGTERM", () => {
  log("Exiting (SIGTERM)...");
  serverWrapper.kill("SIGINT");
});
process.on("uncaughtException", (err) => {
  logError("Uncaught exception:", err);
  serverWrapper.kill("SIGINT");
});

// Keep app alive until the server exits
setInterval(() => {}, 1000);

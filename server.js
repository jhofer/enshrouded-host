const { spawn } = require("child_process");
const fs = require("fs");
const path = require("path");

// Create a writable stream for logging
const logFile = path.join(__dirname, "server.log");
const logStream = fs.createWriteStream(logFile, { flags: "a" });

const serverWrapper = spawn(
  "powershell.exe",
  ["-ExecutionPolicy", "Bypass", "-File", "run_server.ps1"],
  {
    cwd: __dirname,
  }
);

// Log output from the server
serverWrapper.stdout.on("data", (data) => {
  const message = `STDOUT: ${data}`;
  console.log(message);
  logStream.write(`${message}\n`);
});
serverWrapper.stderr.on("data", (data) => {
  const message = `STDERR: ${data}`;
  console.error(message);
  logStream.write(`${message}\n`);
});

// Wait for the server to exit
serverWrapper.on("exit", (code) => {
  const message = `Server exited with code ${code}`;
  console.log(message);
  logStream.write(`${message}\n`);
  logStream.end(); // Close the log file
  process.exit(code);
});


process.on("exit", () => {
  console.log("Exiting...");
  logStream.write("Exiting...\n");
  serverWrapper.kill("SIGINT");
});
process.on("SIGINT", () => {
  console.log("Exiting (SIGINT)...");
  logStream.write("Exiting (SIGINT)...\n");
  serverWrapper.kill("SIGINT");
});
process.on("SIGTERM", () => {
  console.log("Exiting (SIGTERM)...");
  logStream.write("Exiting (SIGTERM)...\n");
  serverWrapper.kill("SIGINT");
});
process.on("uncaughtException", (err) => {
  console.error("Uncaught exception:", err);
  logStream.write(`Uncaught exception: ${err}\n`);
  serverWrapper.kill("SIGINT");
});


// Keep app alive until the server exits
setInterval(() => {}, 1000);
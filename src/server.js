const { spawn } = require("child_process");
const { log, logError } = require("./logger.js");
const { webhookClient } = require("./discord/index.js");


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
  exitHandler();
  process.exit(code);
});

const exitHandler = () => {
  log("Exiting...");
  serverWrapper.kill("SIGINT");
  webhookClient.send("Server shutdown 😴").catch((error) => {
    console.error("Error sending message to Discord:", error);
  });
}
// Handle exit signals

process.on("exit", () => {
  exitHandler();
});
process.on("SIGINT", () => {
  exitHandler();
});
process.on("SIGTERM", () => {
  exitHandler();
});
process.on("uncaughtException", (err) => {
  exitHandler();
});

// Keep app alive until the server exits
setInterval(() => { }, 1000);

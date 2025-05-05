const { spawn } = require("child_process");
const { log, logError } = require("./logger.js");
const { webhookClient } = require("./discord/index.js");

// if argument is "exitevent" then send only message to discord and exit

console.log("Current directory:", __dirname);
const serverWrapper = spawn(
  "powershell.exe",
  ["-ExecutionPolicy", "Bypass", "-File", "run_server.ps1"],
  {
    cwd: __dirname,
  }
);

// spawn hearbeat process that will check if nodejs process is still allive


// Log output from the server
serverWrapper.stdout.on("data", (data) => {
  const message = data.toString().trim();
  log(message);
});
serverWrapper.stderr.on("data", (data) => {
  const message = data.toString().trim();
  logError(message);
});

let shutdownMessagemessageSend = false;
const sendShutdownMessage = async () => {
  if (shutdownMessagemessageSend) {
    return;
  }
  shutdownMessagemessageSend = true;
  try {
    log("Sending shutdown message to Discord...");
    await webhookClient.send("Server is shutting down... 😴");
    log("Shutdown message sent to Discord.");
  } catch (error) {
    console.error("Error sending shutdown message:", error);
  }
}


const exitHandler = async (exitCode = 0) => {

  try {
    log("Exiting...");
    await sendShutdownMessage();
  } catch (error) {
    console.error("Error during shutdown:", error);
  } finally {
    serverWrapper.kill("SIGINT");
    process.exit(exitCode);
  }
};
// Wait for the server to exit
serverWrapper.on("exit", exitHandler);


// Handle exit signals

process.on("exit",
  exitHandler
);
process.on("SIGINT",
  exitHandler
);
process.on("SIGTERM",
  exitHandler
);
process.on("uncaughtException", exitHandler);

process.on("SIGHUP",
  exitHandler
);




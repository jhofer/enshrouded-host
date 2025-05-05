const dotenv = require("dotenv");
const { STARTUP_LOGS } = require("./startup.js");
const { SHUTDOWN_LOGS } = require("./shutdown.js");
const { PLAYER_JOIN } = require("./playerjoin.js");
const { WebhookClient } = require("discord.js");

const LOG_REGISTRY = [STARTUP_LOGS, SHUTDOWN_LOGS, PLAYER_JOIN];

dotenv.config();
const url = process.env.DISCORD_WEBHOOK_URL;
const webhookId = url.split("/").slice(-2, -1)[0];
const webhookToken = url.split("/").slice(-1)[0];
console.log("Webhook ID:", webhookId);
console.log("Webhook Token:", webhookToken);
const webhookClient = new WebhookClient({
  id: webhookId,
  token: webhookToken,
});

exports.logToDiscord = (message) => {
  for (const logPattern of LOG_REGISTRY) {
    if (logPattern.doesMatch(message)) {
      const msg = logPattern.getMessage(message);
      console.log("Discord message:", msg);
      webhookClient.send(msg).catch((error) => {
        console.error("Error sending message to Discord:", error);
      });
    }
  }
};

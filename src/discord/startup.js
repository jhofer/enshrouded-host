const { serverConfig } = require("../enshroudedConfig.js");

exports.STARTUP_LOGS = {
  doesMatch: (content) => {
    // Check if the content contains the startup log pattern
    const startupLogPattern =
      /\[online\] Public ipv4: (\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})/g;
    return startupLogPattern.test(content);
  },
  getMessage: (content) => {
    // Extract the startup log messages from the content
    const startupLogPattern =
      /\[online\] Public ipv4: (\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})/g;
    const msg = content.match(startupLogPattern)[0];

    console.log("Startup message:", msg);
    const serverIp = msg.match(/Public ipv4: ([\d.]+)/)[1];

    const serverPort = serverConfig.queryPort; // Default port if not specified in config
    const serverName = serverConfig.name; // Default name if not specified in config
    const serverPassword = serverConfig.userGroups[0].password; // Default password if not specified in config
    const messageContent = `
      Server ${serverName} started 🚀
       💻 ip: ${serverIp}:${serverPort} 
       🔒 password: ${serverPassword} 
      `;

    return messageContent;
  },
};

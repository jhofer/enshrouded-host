export const PLAYER_LEFT = {
  doesMatch: (content) => {
    // Check if the content contains the player left log pattern
    const playerLeftLogPattern =
      /\[server\] Remove Player '.*'/g;
    return playerLeftLogPattern.test(content);
  },
  getMessage(content) {
    // Extract the player left log messages from the content
    const playerLeftLogPattern =
      /\[server\] Remove Player '.*'/g;
    const msg = content.match(playerLeftLogPattern)[0];
    const playerName = msg.match(/'([^']+)'/)[1]; // Extract the player name from the log message

    const messageContent = `Player ${playerName} left 👋`;

    return messageContent;
  },
};
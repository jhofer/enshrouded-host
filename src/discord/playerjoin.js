export const PLAYER_JOIN = {
  doesMatch: (content) => {
    // Check if the content contains the player join log pattern
    const playerJoinLogPattern =
      /\[server\] Player '.*?' logged in with Permissions:/g;
    return playerJoinLogPattern.test(content);
  },
  getMessage(content) {
    // Extract the player join log messages from the content
    const playerJoinLogPattern =
      /\[server\] Player '.*?' logged in with Permissions:/g;
    const msg = content.match(playerJoinLogPattern)[0];
    const playerName = msg.match(/Player (\w+)/)[1];

    const messageContent = `Player ${playerName} joined 🎮`;

    return messageContent;
  },
};

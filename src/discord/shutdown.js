exports.SHUTDOWN_LOGS = {
  doesMatch: (content) => {
    // Check if the content contains the shutdown log pattern
    const shutdownLogPattern =
      /\[server\] Server stopped/g;
    return shutdownLogPattern.test(content);
  },
  getMessage: (content) => {
    return `Server stopped`;
  },
};


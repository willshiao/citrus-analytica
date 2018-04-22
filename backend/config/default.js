module.exports = {
  site: {
    port: 3000
  },
  logger: {  // Settings for the logger, passed to winston
    settings: {
      level: 'debug',
      prettyPrint: true,
      colorize: true,
      silent: false,
      timestamp: true
    }
  }
}

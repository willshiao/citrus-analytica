module.exports = {
  site: {
    port: 4000
  },
  db: {
    uri: 'mongodb://localhost/citrus-analytica'
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

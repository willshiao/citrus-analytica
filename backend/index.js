const config = require('config')
const mongoose = require('mongoose')
const express = require('express')
const Promise = require('bluebird')
const logger = require('./lib/logger')
const { ErrorHandler } = require('./lib/errorHandlers')
// mongoose.Promise = Promise

require('./lib/extendExpress').extendResponse(express.response)
const indexRoute = require('./routes/index')

const app = express()
app.use(indexRoute)
// app.use(express.static('public'))
app.use(ErrorHandler)

async function main() {
  await mongoose.connect(config.get('db.uri'))
  const port = process.env.PORT || config.get('site.port')
  app.listen(port, () => {
    logger.debug(`Listening on port #${port}`)
  })
}
main()

const router = require('express').Router()
const Message = require('../models/Message')
const timeseriesByDay = require('../lib/timeseriesByDay')
const wordcloud = require('../lib/wordcloud')

router.get('/test', (req, res) => {
  res.send('OK')
})

router.get('/messages', async (req, res) => {
  // Message.find('')
})

router.get('/data', async (req, res) => {
  console.log('Got request')
  const data = await wordcloud()
  console.log('Sent request!')
  res.successJson(data)
})

module.exports = router

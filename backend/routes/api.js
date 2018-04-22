const router = require('express').Router()
const Message = require('../models/Message')
const Group = require('../models/Group')
const timeseries = require('../lib/timeseries')
const getConversations = require('../lib/conversations')

router.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

router.get('/timeseries/:unit', async (req, res) => {
  if(!req.params.unit) return res.failMsg('Missing unit')

  console.log('Got request')
  let data
  if(req.params.unit === 'day')
    data = await timeseries.byDay()
  else if(req.params.unit === 'month')
    data = await timeseries.byMonth()
  else if(req.params.unit === 'year')
    data = await timeseries.byYear()
  else
    return res.failMsg('Invalid unit')
  console.log('Sent response!')
  res.successJson(data)
})

router.get('/conversations', async (req, res) => {
  const conversations = await getConversations()
  res.successJson(conversations)
})

router.get('/groups', async (req, res) => {
  const groups = await Group.find()
  res.successJson(groups)
})

module.exports = router

const router = require('express').Router()
const Message = require('../models/Message')
const Group = require('../models/Group')
const Stat = require('../models/Stat')
const timeseries = require('../lib/timeseries')
const wordcloud = require('../lib/wordcloud')
const getConversations = require('../lib/conversations')

router.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

router.get('/wordcloud', async (req, res) => {
  const cached = await Stat.findOne({ type: 'wordcloud' })
  if(cached !== null)
    return res.successJson(cached.data)
  let data = await wordcloud()
  data = data.filter(i => i.value > 10)
    .map(d => [d._id, d.value])
  data.sort((a, b) => {
    if(a[1] < b[1]) return 1
    if(b[1] < a[1]) return -1
    return 0
  })
  data = data.slice(0, 50)
  const stat = new Stat({
    type: 'wordcloud',
    group: -1,
    data
  })
  stat.save()
  res.successJson(data)
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
  const cached = await Stat.findOne({ type: 'conversations' })
  if(cached !== null)
    return res.successJson(cached.data)
  const conversations = await getConversations()
  const stat = new Stat({
    type: 'conversations',
    group: -1,
    data: conversations
  })
  stat.save()
  res.successJson(conversations)
})

router.get('/groups', async (req, res) => {
  const groups = await Group.find()
  res.successJson(groups)
})

module.exports = router

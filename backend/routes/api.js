const router = require('express').Router()
const Message = require('../models/Message')
const timeseries = require('../lib/timeseries')

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

module.exports = router

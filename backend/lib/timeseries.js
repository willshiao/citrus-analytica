const User = require('../models/User.js')
const Message = require('../models/Message.js')
// const mongoose = require('mongoose')

module.exports = {
  async byDay (owner) {
    const q = owner ? [ { $match: {owner} } ] : []
    q.push({
      $group: {
        _id: {
          year: { $year: '$time' },
          month: { $month: '$time' },
          day: { $dayOfMonth: '$time' }
        },
        count: { $sum: 1 }
      }
    })
    return Message.aggregate(q)
  },

  async byWeek (owner) {
    const q = owner ? [ { $match: {owner} } ] : []
    q.push({
      $group: {
        _id: {
          year: { $year: '$time' },
          week: { $week: '$time' }
        },
        count: {$sum: 1}
      }
    })
    return Message.aggregate(q)
  },
  async byMonth (owner) {
    const q = owner ? [ { $match: {owner} } ] : []
    q.push([
      {
        $group: {
          _id: {
            year: { $year: '$time' },
            month: { $month: '$time' }
          },
          count: { $sum: 1 }
        }
      }
    ])
    return Message.aggregate(q)
  }
}

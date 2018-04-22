const User = require('../models/User.js')
const Message = require('../models/Message.js')
// const mongoose = require('mongoose')

module.exports = {
   async byDay(owner) {
    return Message.aggregate([
      {
        $match: {owner}
      },
      {
        $group: {
          _id: {
            year: { $year: '$time' },
            month: { $month: '$time' },
            day: { $dayOfMonth: '$time' }
          },
          count: {$sum: 1}
        }
      }
    ])
  },
    async byWeek(owner) {
        return Message.aggregate([
            {
                $match: {owner}
            },
            {
                $group: {
                    _id: {
                        year: { $year: '$time' },
                        week: { $week: '$time' }
                    },
                    count: {$sum: 1}
                }
            }
        ])
    },
    async byMonth(owner) {
        return Message.aggregate([
            {
                $match: {owner}
            },
            {
                $group: {
                    _id: {
                        year: { $year: '$time' },
                        month: { $month: '$time' }
                    },
                    count: {$sum: 1}
                }
            }
        ])
    }
}

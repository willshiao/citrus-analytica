const User = require('../models/User.js')
const Message = require('../models/Message.js')
// const mongoose = require('mongoose')

module.exports = async function (owner) {
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

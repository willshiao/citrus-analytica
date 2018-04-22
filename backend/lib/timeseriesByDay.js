const Message = require('../../parser/models/Message.js')
const User = require('../../parser/models/User.js')
const mongoose = require('mongoose')

module.exports = async function (owner) {
    const f = await mongoose.connection.db.collection('messages')

    return f.aggregrate([
        {$match: {owner}},
        {$group: {'_id': {
            year: {$year: "$time"},
            month: {$month: "$time"},
            day: {$dayOfMonth: "$time"}
        },
        count:{$sum:1}}}
    ])
}
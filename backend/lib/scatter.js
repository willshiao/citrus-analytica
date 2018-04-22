const Message = require('../models/Message')

var finalizeFunc = function (key, val) {
    val.numParticipants = Object.keys(val.participants).length

    return val
}

module.exports = async function scatter(owner) {
    return Message.collection.aggregate([
            {
                $group: {
                    _id: {
                        group: {group: "$group"},
                        hour: {$hour: "$time"}
                    },
                    uniqueValues: {$addToSet: "$sender"},
                    msg: {$sum: 1}
                }
            }]
        )}
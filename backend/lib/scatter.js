const Message = require('../models/Message')

var finalizeFunc = function (key, val) {
  val.numParticipants = Object.keys(val.participants).length
  return val
}

module.exports = async function scatter (group, owner) {
  return Message.aggregate([
    {
      $match: {
        group
      }
    },
    {
      $group: {
        _id: {
          hour: {$hour: '$time'}
        },
        uniqueValues: {$addToSet: '$sender'},
        msg: {$sum: 1}
      }
    }]
  )
}

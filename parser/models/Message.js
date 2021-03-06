const mongoose = require('mongoose')

const { Schema } = mongoose

const messageSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: 'User', index: true },
  msg: String,
  time: { type: Date, index: true },
  sender: { type: String, index: true },
  group: { type: Number, index: true }
})

messageSchema.index({ msg: 'text' })

module.exports = mongoose.model('Message', messageSchema)

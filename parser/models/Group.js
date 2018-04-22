const mongoose = require('mongoose')

const { Schema } = mongoose

const groupSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: 'User', index: true },
  name: { type: String, index: true },
  id: { type: Number, index: true}
})

module.exports = mongoose.model('Group', groupSchema)

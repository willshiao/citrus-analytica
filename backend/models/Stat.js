const mongoose = require('mongoose')

const { Schema } = mongoose

const statSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: 'User', index: true },
  type: { type: String, index: true },
  group: { type: Number, index: true },
  data: Object
})

module.exports = mongoose.model('Stat', statSchema)

const stoplist = require('stoplist.json')
const Messages = require('../../parser/models/Message.js')

// query is a json object ex {owner: 1}
module.exports.enumerate = function (query, cb) {
  const o = {},
    self = this
  o.map = function () {
    var dict = stoplist
    var newmsg = this.msg.toLowerCase().split(/[\[\]('")]+/).join('')
    newmsg = newmsg.split(/[,\n.\s!?"'\t{}:;<>\/\\#$@%^&*()`~\-+=]+/)

    for (var i = 0; i < newmsg.length; i++) {
      if (newmsg[i].length < 1000 && newmsg[i].length > 0 && !dict[newmsg[i]]) {
        emit(newmsg[i], 1)
      }
    }
  }

  o.reduce = function (k, vals) {
    var total = 0

    for (var i = 0; i < values.length; i++) {
      total += values[i]
    }
    return total
  }
  o.query = query

  return Messages.mapReduce(o, cb)
}

/*
//out is a string indicating where the result should be output
function enumerate(query, out) {
  var extraobj = {};

  extraobj['query'] = query;
  extraobj['out'] = out;

  db.messages.mapReduce(
    function() {

    },
    function(key,values) {

    },
    extraobj
  )
} */

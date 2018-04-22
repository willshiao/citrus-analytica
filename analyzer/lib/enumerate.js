const stoplist = require('./stoplist')
const Message = require('../../parser/models/Message.js')
const User = require('../../parser/models/User.js')

// query is a json object ex {owner: 1}
module.exports.enumerate = function (query, cb) {
  const o = {};
  o.map = function () {
    var newmsg = this.msg.split(' ');
    // var newmsg = this.msg.toLowerCase().split(/[\[\]('")]+/).join('');
    // newmsg = newmsg.split(/[,\n.\s!?"'\t{}:;<>\/\\#$@%^&*()`~\-+=]+/);

    for (var i = 0; i < newmsg.length; i++) {
      if (newmsg[i].length < 1000 && newmsg[i].length > 0) {
        emit(newmsg[i], 1);
      }
    };
  };

  o.reduce = function (k, vals) {
    return 5;
  };
  // o.query = query

  return Message.mapReduce(o)
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

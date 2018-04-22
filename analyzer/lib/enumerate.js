var stoplist = require('stoplist.json');

//query is a json object ex {owner: 1}
//out is a string indicating where the result should be output
function enumerate(query, out) {
      var extraobj = {};

      extraobj['query'] = query;
      extraobj['out'] = out;

      db.messages.mapReduce(
            function() {
                  var dict = stoplist;
                  var newmsg = this.msg.toLowerCase().split(/[\[\]('")]+/).join('');
                  newmsg = newmsg.split(/[,\n.\s!?"'\t{}:;<>\/\\#$@%^&*()`~\-+=]+/);

                  for (var i = 0; i < newmsg.length; i++) {
                        if (newmsg[i].length < 1000 && newmsg[i].length > 0 && !dict[newmsg[i]])
                              emit(newmsg[i], 1);
                  }
            },
            function(key,values) {
                  var total = 0;

                  for (var i = 0; i < values.length; i++) {
                      total += values[i];
                  }
                  return total;
            },
            extraobj
      )
}
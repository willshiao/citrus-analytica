const mongoose = require('mongoose')

module.exports = async function senderStats(owner) {
    const f = await mongoose.connection.db.collection('messages')
    return f.mapReduce(
        function() {
            var newmsg = this.msg.toLowerCase().split(/[\[\]('")]+/).join('')
            newmsg = newmsg.split(/[,\n.\s!?"'\t{}:;<>\/\\#$@%^&*()`~\-+=]+/);


            var total = 0;
            for (var i = 0; i < newmsg.length; i++) {
                if (newmsg[i].length < 1000 && newmsg[i].length > 0)
                    total++;
            }

            //throw JSON.stringify({'words': total, 'messages':1})
            emit(this.sender, {'words': total, 'messages':1});

        }, function(key,values) {

            var total = {'words': 0, 'messages':0};

            //throw JSON.stringify(key)

            for (var i = 0; i < values.length; i++) {
                total['words'] += values[i]['words']
                total['messages'] += values[i]['messages']
            }

            //throw JSON.stringify(total)
            return total
        }, {
            query: {owner},
            out: { inline: 1 }
        })

}
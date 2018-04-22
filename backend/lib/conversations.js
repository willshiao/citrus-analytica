const Message = require('../models/Message')

module.exports = async function conversations() {
    return Message.collection.mapReduce(function () {
        var object = {'messages': 1, 'participants': {}}

        if (this.sender === "")
            object['participants']['unknown'] = 1;
        else
            object['participants'][this.sender] = 1;

        emit(this.group, object);
    }, function (key, values) {
        //throw JSON.stringify(key)

        var total = {'messages': 0, 'participants': {}}

        for (var i = 0; i < values.length; i++) {
            total['messages'] += values[i]['messages']

            for (var j in values[i]['participants']) {
                if (!total['participants'][j]) {
                    total['participants'][j] = 0;
                }

                total['participants'][j] += values[i]['participants'][j];
            }

        }

        //throw JSON.stringify(total)
        return total
    }, {
        out: {inline: 1}
    })

}
// Inser modules
const Promise = require('bluebird')
const fs = Promise.promisifyAll(require('fs'))
const config = require('config')
const cheerio = require('cheerio')
const path = require('path')
const debug = require('debug')('CitrusAnalytica:parser')
const _ = require('lodash')
const mongoose = require('mongoose')
const moment = require('moment')
mongoose.Promise = Promise

// Import models
const User = require('./models/User')
const Group = require('./models/Group')
const Message = require('./models/Message')

async function readMessagesFromFile(filePath, owner, group) {
  debug(`Reading messages from ${filePath}`)

  const data = await fs.readFileAsync(path.join(config.get('messageDir'), filePath))
  const $ = cheerio.load(data)
  const $thread = $('div.thread')

  let lastMessage = null
  const messages = []
  const children = $thread.children()
    .toArray()
    .forEach(child => {
      const $child = $(child)
      if (child.name === 'div') {
        // Start a new message
        if (lastMessage !== null) messages.push(lastMessage)
        const timeStr = $child.find('span.meta').text()
        let time = moment(timeStr, 'dddd, MMMM DD, YYYY at hh:mmA zz').toDate()
        lastMessage = {
          owner,
          time,
          group,
          sender: $child.find('span.user').text(),
          msg: '',
        }
      } else if(child.name === 'p') {
        if(lastMessage === null) return false
        if(lastMessage.msg !== '') lastMessage.msg += '\n'
        lastMessage.msg += $child.text()
      }
    })
  if(lastMessage !== null) messages.push(lastMessage)

  // debug('Got messages:', messages)
  debug('Got', messages.length, 'messages')
  return messages
}

async function main () {
  // First, connect to the DB
  await mongoose.connect(config.get('db.uri'))
  // Next, insert a new user
  let user = new User({ name: 'William' })
  user = await user.save()

  // Then, read all group names and IDs
  const messageFile = await fs.readFileAsync(path.join(config.get('dataDir'), 'html/messages.htm'))
  const $ = cheerio.load(messageFile)
  const groups = $('div.contents a')
    .toArray()
    .map((tag) => {
      return {
        id: parseInt(path.basename($(tag).attr('href'), '.html'), 10),
        name: $(tag).text(),
        owner: user._id
      }
    })
  console.log('Got', groups.length, 'groups')
  await Group.insertMany(groups)
  console.log('Inserted groups!')

  let files = await fs.readdirAsync(config.get('messageDir'))
  console.log(files)
  files = files.filter(file => path.extname(file) === '.html')
  
  console.log('Found', files.length, 'groups')
  await Promise.each(files, async (file) => {
    const groupId = parseInt(path.basename(file), 10)
    const messages = await readMessagesFromFile(file, user._id, groupId)
    await Message.insertMany(messages)
    console.log('Inserted', messages.length, 'messages!')
  })
  console.log('Done!')
}

main()

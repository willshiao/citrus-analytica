const Promise = require('bluebird')
const fs = Promise.promisifyAll(require('fs'))
const config = require('config')
const cheerio = require('cheerio')
const path = require('path')
const debug = require('debug')('CitrusAnalytica:parser')
const _ = require('lodash')

async function readMessagesFromFile(filePath) {
  const data = await fs.readFileAsync(path.join(config.get('dataDir'), filePath))
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
        lastMessage = {
          user: $child.find('span.user').text(),
          time: $child.find('span.meta').text(),
          msg: ''
        }
      } else if(child.name === 'p') {
        if(lastMessage.msg !== '') lastMessage.msg += '\n'
        lastMessage.msg += $child.text()
      }
    })
  if(lastMessage !== null) messages.push(lastMessage)

  debug('Got messages:', messages)
  debug('Total of:', messages.length)
  return messages
}

async function main () {
  let files = await fs.readdirAsync(config.get('dataDir'))
  files = files.filter(file => path.extname(file) === 'html')
  files.forEach(async (file) => {
    const messages = await readMessagesFromFile(file)
  })
}

main()

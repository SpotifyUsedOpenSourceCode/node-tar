const path = require('path')
const file = process.argv[2] || path.resolve(__dirname, '../npm.tar')
const fs = require('fs')
const data = fs.readFileSync(file)
const Header = require('../../lib/header.js')

const start = process.hrtime()
for (let position = 0; position < data.length; position += 512) {
  const h = new Header(data, position)
  if (h.size) {
    const blockSize = Math.ceil(h.size / 512) * 512
    position += blockSize
  }
}

const end = process.hrtime(start)
console.log(end[0]*1e3 + end[1]/1e6)

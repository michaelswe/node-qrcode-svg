let qr = require('./generate')
let fs = require('fs')
let uuid = require('uuid')

let qrPath = 'http://www.awesomeurl.com/qr/'

for (let i=1001; i<=1100; i++) {
  let svg = qr.generateSVGPath({
    value: qrPath + uuid.v4(),
    size: 300,
    color: 'black',
    backgroundColor: 'white'
  })

  //assumes that ./svg already exists
  fs.writeFile('./svg/'+i+'.svg', svg)
}

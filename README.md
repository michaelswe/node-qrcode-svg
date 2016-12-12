# Generate QR code bitmaps or svg files on node server

javascript-qrcode.

## Features

* Batch render qr codes as svg files
* Convert to bitmap with imagemagick

## Installation

Imagemagick need to be installed with rsvg to properly render bitmaps from svg files.

On OSX:

```
brew install imagemagick --with-rsvg
```

The rsvg option needs to be added at compile time. If Imagemagick is already
installed without rsvg you need to remove it before installing with rsvg.

```
brew remove imagemagick
brew install imagemagick --with-rsvg
```

### Examples

```
let qr = require('./index')
let fs = require('fs')
let uuid = require('uuid')

let qrPath = 'http://www.awesomeurl.com/qr/'

for (let i=1001; i<=1100; i++) {
  let svg = qr.generateSVGPath(qrPath + uuid.v4(), 300)
  fs.writeFile('./svg/'+i+'.svg', svg)
}

```

Convert svg files to bitmap with ImageMagick. I'm leaving this part out of the
node code for now, as I don't need the full automation yet.
```
mogrify -format png ./svg/*
```

### Dependencies

* [javascript-qrcode](https://github.com/siciarek/javascript-qrcode)

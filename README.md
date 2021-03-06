# Generate QR code bitmaps or svg files on node server

Based on https://github.com/siciarek/javascript-qrcode
and https://github.com/awesomejerry/react-native-qrcode-svg

## Features

* Batch render QR codes as SVG files
* Convert to bitmap with ImageMagick

## Installation

Imagemagick need to be installed with rsvg to properly render bitmaps from svg files.

On OSX:

```
brew install imagemagick --with-librsvg
```

The rsvg option needs to be added at compile time. If Imagemagick is already
installed without rsvg you need to remove it before installing with rsvg.

```
brew remove imagemagick
brew install imagemagick --with-librsvg
```

### Example

```
let qr = require('./generate')
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

Use -density to set the print size of the image. To get a 14 mm wide QR code
the density needs to be 544 if the image size is 300x300 pixels.

300px * 25.4 / 14mm = 544dpi

```
mogrify -density 544 -format png ./svg/*
```

### Dependencies

* [javascript-qrcode](https://github.com/siciarek/javascript-qrcode)

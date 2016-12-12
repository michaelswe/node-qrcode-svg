'use strict'
let QrCode = require('javascript-qrcode').QrCode

function generateMatrix(value) {
  const qrcode = new QrCode(value)
  return qrcode.getData()
};

module.exports.generateSVGPath = function(options) {
  const  {value, size, color, backgroundColor} = options
  const matrix = generateMatrix(value)
  const cellSize = size / (matrix.length + 2)

  // adjust origin
  const oY = cellSize * 1.5
  const oX = cellSize
  let d = ''
  matrix.forEach((row, i) => {
    let needDraw = false;
    row.forEach((column, j) => {
      if (column) {
        if (!needDraw) {
          d += `M${oX + cellSize * j} ${oY + cellSize * i} `
          needDraw = true
        }
        if (needDraw && j === matrix.length - 1) {
          d += `L${oX + cellSize * (j + 1)} ${oY + cellSize * i} `
        }
      } else {
        if (needDraw) {
          d += `L${oX + cellSize * j} ${oY + cellSize * i} `
          needDraw = false
        }
      }
    })
  })

  return `<?xml version="1.0" standalone="no"?>
    <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
    <svg width="100%" height="100%" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" version="1.1">
      <rect
        x="${cellSize}"
        y="${cellSize}"
        width="${size - 2 * cellSize}"
        height="${size - 2 * cellSize}"
        fill="${backgroundColor}"
      />
      <path
        d="${d}"
        stroke="${color}"
        stroke-width="${cellSize}"
      />
    </svg>
  `
}

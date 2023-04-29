'use strict'

var gImgs = [
    {id: 1, url: 'images/1.jpg', keywords: ['funny', 'cat']},
    {id: 2, url: 'images/2.jpg', keywords: ['funny', 'dog']},
    {id: 3, url: 'images/3.jpg', keywords: ['baby', 'dog']},
    {id: 4, url: 'images/4.jpg', keywords: ['mad', 'angry']},
    {id: 5, url: 'images/5.jpg', keywords: ['funny', 'baby']},
] 

var gKeywordSearchCountMap = {
    'funny': 12,
    'cat': 16,
    'baby': 2,
    'drinks':5,
    'dog': 7,
}

var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'memeRator1',
            size: 28,
            align: 'center',
            fill: 'white',
            stroke: 'black',
            font: 'Impact',
            posX: 250,
            posY: 30,
        }
    ]
}


function getMeme() {
    return gMeme
}

function getImgURL(meme) {
    let imgId = meme.selectedImgId
    let img = findImgByIdx(imgId)
    return img.url
}

function setLineTxt(txt) {
    const currTxt = getLine()
    currTxt.txt = txt
}

function addLine() {
    const newLineIdx = gMeme.lines.length + 1
    const newLine = _createNewLine(newLineIdx)
    gMeme.lines.push(newLine)
    gMeme.selectedLineIdx = gMeme.lines.length - 1
}

function delLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
    if (!gMeme.selectedLineIdx) return
    else gMeme.selectedLineIdx--
}

function setLineColor(color) {
    const line = gMeme.lines[gMeme.selectedLineIdx]
    if (!line) return
    line.fill = color
}

function moveSelectedLine() {
    if (gMeme.selectedLineIdx === gMeme.lines.length - 1)
        gMeme.selectedLineIdx = 0
    else gMeme.selectedLineIdx++
}

function enlargeTxt() {
    const currTxt =  getLine()
    if (currTxt.size <= 48) {
        currTxt.size += 2
        renderMeme()
    }
    else return
}

function shrinkTxt() {
    const currTxt =  getLine()
    if (currTxt.size >= 16) {
        currTxt.size -= 2
        renderMeme()
    }
    else return
}

function SetAlignTxt(aligntxt) {
    const currTxt =  getLine()
   currTxt.align = aligntxt
   renderMeme()
}

function setFont(font) {
    const currTxt =  getLine()
    currTxt.font = font
    console.log('currTxt:', currTxt)
}

function getLine() {
    return gMeme.lines[gMeme.selectedLineIdx]
}

function updateLineInputTxt() {
    const currLine = gMeme.lines[gMeme.selectedLineIdx]
    if (!currLine) return
    const elInput = document.querySelector('.text-input')
    elInput.value = `${currLine.txt}`
}

function drawText() {
    const lines = getAllLines()
    if (!lines) return
    lines.forEach((line) => {
        gCtx.fillStyle = line.fill
        gCtx.strokeStyle = line.stroke
        gCtx.font = `${line.size}px ${line.font}`
        gCtx.textAlign = `${line.align}`
        gCtx.textBaseline = 'middle'
        wrapText(gCtx, line.txt,line.posX, line.posY)
    })
}

function getAllLines() {
    return gMeme.lines
}

function markSelectedLine() {
    const currLine = getLine()
    if (!currLine) return
    gCtx.beginPath()
    gCtx.lineWidth = '3'
    gCtx.strokeStyle = 'orange'
    gCtx.strokeRect(
        currLine.posX - gCtx.measureText(currLine.txt).width / 2 - 14,
        currLine.posY - currLine.size * 0.6,
        gCtx.measureText(currLine.txt).width + 20,
        currLine.size * 1.2
    )
    gCtx.stroke()
}

function _updateLineIdx(idx) {
    gCurrLineIdx = idx
    gMeme.selectedLineIdx = gCurrLineIdx
}

function _createNewLine(numNewLine) {
    const newPos = { x: gElCanvas.width / 2, y: gElCanvas.height / 2 }
    if (numNewLine === 1) newPos.y = 40

    else if (numNewLine === 2) {
        newPos.y = gElCanvas.height - 70
        console.log('newPos:', newPos)
    }
    return {
        font: 'impact',
        txt: 'memeRator',
        size: 28,
        align: 'center',
        fill: 'white',
        posX: newPos.x,
        posY: newPos.y,
        stroke: 'black',
    }
}


function getImgs() {
    if (!gFillterBy) return gImgs
    return gImgs.filter((img) => img.keywords.includes(gFillterBy))
}

function findImgByIdx(id) {
    return gImgs.find((img) => img.id === id)
}

function setImg(imgIdx) {
  gMeme.selectedImgId = +imgIdx
}

function wrapText(gCtx, text, x = 250, y = 30, maxWidth = gElCanvas.width - 60, lineHeight = 42) {
    var words = text.split(" ")
    var line = ""
    var textX = x
    if (gCtx.textAlign === "right") {
        console.log('gCtx.measureText(text):', gCtx.measureText(text))
      var metrics = gCtx.measureText(text)
      textX = x + (maxWidth) / 2  
    }
    else if (gCtx.textAlign === "left") {
      var metrics = gCtx.measureText(text)
      textX = x - (maxWidth) / 2
    }
    for (var i = 0; i < words.length; i++) {
      var testLine = line + words[i] + " "
      var metrics = gCtx.measureText(testLine)
      var testWidth = metrics.width
      if (testWidth > maxWidth && i > 0) {
        gCtx.fillText(line, textX, y)
        gCtx.strokeText(line, textX, y)
        line = words[i] + " "
        y += lineHeight
      }
      else {
        line = testLine
      }
    }
    gCtx.fillText(line, textX, y)
    gCtx.strokeText(line, textX, y)
  }

  function downloadCanvas(elLink) {
    console.log('Hi')
    // Gets the canvas content and convert it to base64 data URL that can be save as an image
    const data = gElCanvas.toDataURL() // Method returns a data URL containing a representation of the image in the format specified by the type parameter.
    // console.log('data', data) // Decoded the image to base64
    elLink.href = data // Put it on the link
    elLink.download = 'my-meme' // Can change the name of the file
}
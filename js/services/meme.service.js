'use strict'

var gCurrImgIdx
var gCurrLineIdx = 0
var gFillterBy = null

var gImgs = [
    {id: 1, url: 'images/1.jpg', keywords: ['funny', 'cat']},
    {id: 2, url: 'images/2.jpg', keywords: ['funny', 'dog']},
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
            txt: 'I wish I was that cat rigth now...',
            size: 20,
            align: 'left',
            color: 'red'
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
    console.log('currTxt:', currTxt)
}

function enlargeTxt() {
    const currTxt =  getLine()
    if (currTxt.size <= 48) {
        currTxt.size += 2
        renderMeme()
    }
    else return
}

function getLine() {
    return gMeme.lines[gCurrLineIdx]
}

function drawText(text, x = 200, y = 100) {
    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = 'red'
    gCtx.font = '32px Impact'
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'

    wrapText(gCtx, text)
    // gCtx.fillText(text, 250, 30, [, 440]) // Draws (fills) a given text at the given (x, y) position.
    // gCtx.strokeText(text, 250, 30, [, 440]) // Draws (strokes) a given text at the given (x, y) position.
}

function _updateLineIdx(idx) {
    gCurrLineIdx = idx
    gMeme.selectedLineIdx = gCurrLineIdx
}

function getImgs() {
    if (!gFillterBy) return gImgs
    return gImgs.filter((img) => img.keywords.includes(gFillterBy))
}

function findImgByIdx(id) {
    return gImgs.find((img) => img.id === id)
}

function setImg() {
    console.log('hello setImg')
}

function setSelectedImgId(img) {
    gMeme.selectedImgId = img.id
}

function wrapText(ctx, text, x = 250, y = 30, maxWidth = gElCanvas.width - 60, lineHeight = 36, textAlign = "left") {
    var words = text.split(" ");
    var line = "";
    var textX = x;
    if (textAlign === "center") {
      var metrics = ctx.measureText(text);
      textX = x + (maxWidth - metrics.width) / 2;
    }
    else if (textAlign === "right") {
      var metrics = ctx.measureText(text);
      textX = x + maxWidth - metrics.width;
    }
    for (var i = 0; i < words.length; i++) {
      var testLine = line + words[i] + " ";
      var metrics = ctx.measureText(testLine);
      var testWidth = metrics.width;
      if (testWidth > maxWidth && i > 0) {
        ctx.fillText(line, textX, y);
        line = words[i] + " ";
        y += lineHeight;
      }
      else {
        line = testLine;
      }
    }
    ctx.fillText(line, textX, y);
  }
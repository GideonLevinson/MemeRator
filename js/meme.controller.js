'use strict'

function init() {
    gElCanvas = document.querySelector('.canvas')
    gCtx = gElCanvas.getContext('2d')
    addListeners()
    renderMeme()
    renderImgs()
}

function onTxtInput(txt) {
    setLineTxt(txt)
    renderMeme()
}

function renderMeme() {
    let meme = getMeme()
    let image = getImgURL(meme)
    let img = new Image()
    img.src = image
    if (!image) return
    img.onload = function () {
        // resizeCanvas
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        drawText()
        gCtx.save()
    }
}


function onChangeLineTxt(txt) {
    setLineTxt(txt)
    renderMeme()
}

function onAddLine() {
    addLine()
    updateLineInputTxt()
    renderMeme()
}

function onDelLine() {
    delLine()
    updateLineInputTxt()
    renderMeme()
}

function onFillClr(color) {
    setLineColor(color)
    updateLineInputTxt()
    renderMeme()
}

function onLineSwitch() {
    moveSelectedLine()
    updateLineInputTxt()
    renderMeme()
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetHeight
}

function onNavClick(sectionId) {
    switchViews(sectionId)
}

function onTxtFormat(ev) {
    console.log('ev:', ev)
    switch (ev) {
        case 'A+':
            enlargeTxt()
            break
        case 'A-':
            shrinkTxt()
            break
        case 'left':
        case 'center':
        case 'right':
            SetAlignTxt(ev)
            break
        case 'Font':

            break
        case 'stroke':
            setStroke()
            break
        case 'fill':

            break
        case 'emojiL':

            break
        case 'emojiR':

            break
    }
}

function onChangeFont(ev) {
    console.log('font:', ev)
    setFont(ev)
    renderMeme()
}

function onDownload(elLink) {
    downloadCanvas(elLink)
}

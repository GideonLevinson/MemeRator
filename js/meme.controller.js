'use strict'

function init() {
    gElCanvas = document.querySelector('.canvas')
    gCtx = gElCanvas.getContext('2d')
    addListeners()
    // window.addEventListener('resize', resizeCanvas)
    resizeCanvas()
    renderMeme()
    renderImgs()
    updateLineInputTxt()
}

function onTxtInput(txt) {
    setLineTxt(txt)
    renderMeme()
}

function renderMeme() {
    resizeCanvas()
    let meme = getMeme()
    let image = getImgURL(meme)
    let img = new Image()
    img.src = image
    if (!image) return
    img.onload = function () {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        drawText()
        markSelectedLine()
        gCtx.save()
    }
}

function renderMemeForSave() {
    let meme = getMeme()
    let image = getImgURL(meme)
    let img = new Image()
    img.src = image
    if (!image) return
    img.onload = function () {
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

function onNavClick(sectionId) {
    switchViews(sectionId)
}

function onTxtFormat(ev) {
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
    renderMeme()
}

function onChangeFont(ev) {
    console.log('font:', ev)
    setFont(ev)
    renderMeme()
}

function onDownload(elLink) {
    renderMemeForSave()
    downloadCanvas(elLink)
}

function onToggleMenu() {
	document.body.classList.toggle('menu-open')
	const elBtn = document.querySelector('.menu-button')
	elBtn.innerText = elBtn.innerText === '☰' ? 'X' : '☰'
}

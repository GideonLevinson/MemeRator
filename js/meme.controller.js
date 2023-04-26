'use strict'

function init() {
    gElCanvas = document.querySelector('.canvas')
    gCtx = gElCanvas.getContext('2d')
    addListeners()
    renderMeme()
}

function onTxtInput(txt) {
    setLineTxt(txt)
    renderMeme()
}

function renderMeme() {
    let meme = getMeme()
    let image = getImgURL(meme)
    renderImg(image)
}

function renderImg(image) {
    // Draw image from gImgs on the canvas
    let img = new Image()
    img.src = image
    if (!image) return
    img.onload = function () {
        // resizeCanvas
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        let text = getLine()
        drawText(text.txt)
    }
}

function onChangeLineTxt(txt) {
    setLineTxt(txt)
    renderMeme()
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetHeight
}

function onNavClick(navItem, sectionId) {
    let navItems = document.querySelectorAll(".main-menu a")
    navItems.forEach(function(item) {
      item.classList.remove("active")
    });

    navItem.classList.add("active")

    switch (sectionId) {
        case 'memes':
          document.getElementById('memes').hidden = false
          document.getElementById('gallery').hidden = true
          //   document.getElementById('dogs').classList.remove("hidden")
          break
          case 'gallery':
              document.getElementById('memes').hidden = true
              document.getElementById('gallery').clahidden = false
          break
        // case 'about':
        //   document.getElementById('about').classList.remove("hidden")
        //   break
      }
    
  }

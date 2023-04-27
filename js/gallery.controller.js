'use strict'

function onImgSelect() {
    setImg()
}

function renderImgs() {
    let images = getImgsForDisplay()
    const elGallery = document.querySelector('.imgs-container')
    const strHTMLs = images.map(img =>`
    <img src="${img.url}" onclick="onSelectImg(this.id)" id="${img.id}">`)
    elGallery.innerHTML = strHTMLs.join('')
}

function onSelectImg(idx) {
    setImg(idx)
    switchViews('memes')
    renderMeme()
}
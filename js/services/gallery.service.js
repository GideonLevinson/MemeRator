'use strict'


function getImgsForDisplay() {
    return gImgs
}

function switchViews(sectionId) {
    switch (sectionId) {
        case 'memes':
            document.getElementById('memes').hidden = false
            document.querySelector('.memes').classList.add('active') 
            document.getElementById('gallery').hidden = true
            document.querySelector('.gallery').classList.remove('active')
            document.getElementById('about').hidden = true
            document.querySelector('.about').classList.remove('active')
            break
            case 'gallery':
                document.getElementById('memes').hidden = true
                document.querySelector('.memes').classList.remove('active') 
                document.getElementById('gallery').hidden = false
                document.querySelector('.gallery').classList.add('active')
                document.getElementById('about').hidden = true
                document.querySelector('.about').classList.remove('active')
                break
                document.querySelector('.memes').classList.add('active') 
                case 'about':
                    document.getElementById('memes').hidden = true
                    document.querySelector('.memes').classList.remove('active') 
                    document.getElementById('gallery').hidden = true
                    document.querySelector('.gallery').classList.remove('active')
                    document.getElementById('about').hidden = false
                    document.querySelector('.about').classList.add('active')
            break
    }
}

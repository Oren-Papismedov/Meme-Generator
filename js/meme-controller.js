'use strict'

var gElCanvas
var gCtx
var gStartPos
const gTouchEvs = ['touchstart', 'touchmove', 'touchend']

function toggleMenu() {
    document.body.classList.toggle('menu-open');
}

function onInitCanvas(elImg) {
    // console.log(elImg);
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    // addListeners()
    renderMeme(elImg)

}

function renderMeme(elImg) {
    
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)

}
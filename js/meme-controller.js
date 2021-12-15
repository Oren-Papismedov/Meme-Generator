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

function onChangeText(text) {
    drawText(text)

}

function drawText(text) {
    const font = '2rem Impact'
    const color = 'white'
    gCtx.font = font
    gCtx.fillText(text, gElCanvas.width / 2, gElCanvas.height / 2)
    console.log(text);

}
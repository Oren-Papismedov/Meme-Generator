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
    // gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
    // addListeners()
    initMeme()
    document.querySelector('.input').value = ''
    steImg(elImg.id)
    renderMeme()
    addListeners()

}

function renderMeme() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
    const meme = getMeme()
    const elIMG = document.getElementById(meme.selectedImgId)
    gCtx.drawImage(elIMG, 0, 0, gElCanvas.width, gElCanvas.height)
    const TXT = meme.lines[meme.selectedLineIdx].txt
    const SIZE = meme.lines[meme.selectedLineIdx].size
    const COLOR = meme.lines[meme.selectedLineIdx].color
    const STROKE = meme.lines[meme.selectedLineIdx].stroke
    const FONT = meme.lines[meme.selectedLineIdx].font
    const ALIGN = meme.lines[meme.selectedLineIdx].align

    drawText(TXT, SIZE, COLOR, STROKE, FONT, ALIGN)
    // console.log(TXT);
}

function onChangeText(text) {
    text = document.querySelector('.input').value
    changeText(text)
    renderMeme()

}

function addListeners() {
    document.querySelector('.input').addEventListener('input', onChangeText)
    addMouseListeners()
    addTouchListeners()
    // window.addEventListener('resize', () => {
    //     resizeCanvas()
    //     const center = { x: gElCanvas.width / 2, y: gElCanvas.height / 2 }
    //     createCircle(center)
    //     renderCanvas()
    // })
}

function addMouseListeners() {
    // gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    // gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchend', onUp)
}

function onDown(ev) {
    const pos = getEvPos(ev)
    // console.log(pos);
    if (!isTextClicked(pos)) return
    setTextDrag(true)
    gStartPos = pos
    document.body.style.cursor = 'grabbing'

}

// function onMove(ev) {
//     const circle = getCircle();
//     if (!circle.isDrag) return
//     const pos = getEvPos(ev)
//     const dx = pos.x - gStartPos.x
//     const dy = pos.y - gStartPos.y
//     moveCircle(dx, dy)
//     gStartPos = pos
//     renderCanvas()

// }

function onUp() {
    setTextDrag(false)
    document.body.style.cursor = 'grab'
}

function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    if (gTouchEvs.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft,
            y: ev.pageY - ev.target.offsetTop
        }
    }
    return pos
}



function drawText(txt, size = 80, color = 'white', stroke = 'black', font = 'impact', align = 'center') {
    let xStart
    // console.log(gCtx)
    const currFont = `${size}px ${font}`
    gCtx.font = currFont
    gCtx.fillStyle = color
    gCtx.textAlign = align

    switch (align) {
        case 'left': xStart = 50

            break;

        case 'center': xStart = 250

            break;

        case 'right': xStart = 450

            break
    }

    gCtx.fillText(txt, xStart, 70);
    gCtx.lineWidth = '5'
    gCtx.strokeStyle = stroke
    gCtx.strokeText(txt, xStart, 70)
}

function onIncreaseFont() {
    increaseFont()
    renderMeme()
}

function onDecreaseFont() {
    decreaseFont()
    renderMeme()
}

function onSetColor(color) {
    setColor(color)
    renderMeme()
}

function onSetStroke(stroke) {
    setStroke(stroke)
    renderMeme()
}

function onClearText() {
    const isSure = setClearText()
    renderMeme()
    if (isSure) document.querySelector('.input').value = ''
}

function onAlignText(id) {
    // console.log(id);
    alignText(id)
    renderMeme()
}
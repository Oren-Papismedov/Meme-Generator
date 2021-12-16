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
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
    // addListeners()
    steImg(elImg.id)
    const MEME = getMeme()
    renderMeme(MEME)
    addListeners()

}

function renderMeme(meme) {
    const TXT = meme.lines[meme.selectedLineIdx].txt
    const SIZE = meme.lines[meme.selectedLineIdx].size
    const COLOR = meme.lines[meme.selectedLineIdx].color
    const STROKE = meme.lines[meme.selectedLineIdx].stroke
    const FONT = meme.lines[meme.selectedLineIdx].font

    drawText(TXT ,SIZE, COLOR , STROKE , FONT)
    // console.log(TXT);
}

function onChangeText(text) {
    drawText(text)

}

function addListeners() {
    document.querySelector('.input').addEventListener('input', drawText)
    // addMouseListeners()
    // addTouchListeners()
    // window.addEventListener('resize', () => {
    //     resizeCanvas()
    //     const center = { x: gElCanvas.width / 2, y: gElCanvas.height / 2 }
    //     createCircle(center)
    //     renderCanvas()
    // })
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchend', onUp)
}

function onDown(ev) {
    const pos = getEvPos(ev)
    if (!isCircleClicked(pos)) return
    setCircleDrag(true)
    gStartPos = pos
    document.body.style.cursor = 'grabbing'

}

function onMove(ev) {
    const circle = getCircle();
    if (!circle.isDrag) return
    const pos = getEvPos(ev)
    const dx = pos.x - gStartPos.x
    const dy = pos.y - gStartPos.y
    moveCircle(dx, dy)
    gStartPos = pos
    renderCanvas()

}

function onUp() {
    setCircleDrag(false)
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



function drawText(txt,size = 120, color = 'white', stroke = 'black', font = 'impact') {
    // console.log(gCtx)
    txt = document.querySelector('.input').value
    const currFont = `${size}px ${font}`
    gCtx.font = currFont
    gCtx.fillStyle = color
    gCtx.fillText(txt, 20, gElCanvas.height / 2);
    gCtx.lineWidth = '6'
    gCtx.strokeStyle = stroke
    gCtx.strokeText(txt, 20, gElCanvas.height / 2)
}

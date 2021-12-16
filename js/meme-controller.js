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

// function addListeners() {
//     addMouseListeners()
//     addTouchListeners()
//     // window.addEventListener('resize', () => {
//     //     resizeCanvas()
//     //     const center = { x: gElCanvas.width / 2, y: gElCanvas.height / 2 }
//     //     createCircle(center)
//     //     renderCanvas()
//     // })
// }

// function addMouseListeners() {
//     gElCanvas.addEventListener('mousemove', onMove)
//     gElCanvas.addEventListener('mousedown', onDown)
//     gElCanvas.addEventListener('mouseup', onUp)
// }

// function addTouchListeners() {
//     gElCanvas.addEventListener('touchmove', onMove)
//     gElCanvas.addEventListener('touchstart', onDown)
//     gElCanvas.addEventListener('touchend', onUp)
// }

// function onDown(ev) {
//     const pos = getEvPos(ev)
//     if (!isCircleClicked(pos)) return
//     setCircleDrag(true)
//     gStartPos = pos
//     document.body.style.cursor = 'grabbing'

// }

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

// function onUp() {
//     setCircleDrag(false)
//     document.body.style.cursor = 'grab'
// }

// function getEvPos(ev) {
//     var pos = {
//         x: ev.offsetX,
//         y: ev.offsetY
//     }
//     if (gTouchEvs.includes(ev.type)) {
//         ev.preventDefault()
//         ev = ev.changedTouches[0]
//         pos = {
//             x: ev.pageX - ev.target.offsetLeft,
//             y: ev.pageY - ev.target.offsetTop
//         }
//     }
//     return pos
// }



function drawText(txt,size = 120, color = 'white', stroke = 'black') {
    console.log(gCtx)
    const font = `${size}px impact`
    gCtx.font = font
    gCtx.fillStyle = color
    gCtx.fillText(txt, 20, gElCanvas.height / 2);
    gCtx.lineWidth = '6'
    gCtx.strokeStyle = stroke
    gCtx.strokeText(txt, 20, gElCanvas.height / 2)
}

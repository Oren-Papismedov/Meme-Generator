'use strict'


var gElCanvas
var gCtx
var gStartPos
const gTouchEvs = ['touchstart', 'touchmove', 'touchend']
var isEdit = false

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
    document.querySelector('.meme-editor').style.display = 'block'
    steImg(elImg.id)
    renderMeme()
    addListeners()

}

function renderMeme() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
    const meme = getMeme()
    const elIMG = document.getElementById(meme.selectedImgId)
    gCtx.drawImage(elIMG, 0, 0, gElCanvas.width, gElCanvas.height)
    const SELECTEDLINE = meme.selectedLineIdx
    meme.lines.forEach(function (line, i) {

        const TXT = line.txt
        const SIZE = line.size
        const COLOR = line.color
        const STROKE = line.stroke
        const FONT = line.font
        const ALIGN = line.align
        const POS = { x: line.x, y: line.y }
        // const ISEDIT = line.isEdit
        const ISDRAG = line.isDrag

        drawText(TXT, SIZE, COLOR, STROKE, FONT, ALIGN, POS)
        // console.log(TXT);
        if (meme.isEdit && !ISDRAG && SELECTEDLINE === i) drawTextArea(POS, SIZE)
    })
    // if (isEdit){
    //     const pos = {x: meme.lines[meme.selectedLineIdx].x,y:meme.lines[meme.selectedLineIdx].y}
    //     const size = meme.lines[meme.selectedLineIdx].size
    //     drawTextArea(pos,size)
    // }

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
    // console.log(pos);
    if (!isTextClicked(pos)) return
    setTextDrag(true)
    gStartPos = pos
    document.body.style.cursor = 'grabbing'
    const line = getLine()
    document.querySelector('.input').value = line.txt


}

function onMove(ev) {
    const circle = getLine();
    if (!circle.isDrag) return
    const pos = getEvPos(ev)
    const dx = pos.x - gStartPos.x
    const dy = pos.y - gStartPos.y
    // console.log(dx, dy);
    moveLine(dx, dy)
    gStartPos = pos
    renderMeme()

}

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



function drawText(txt, size , color , stroke , font , align , pos) {
    const currFont = `${size}px ${font}`
    gCtx.font = currFont
    gCtx.fillStyle = color
    gCtx.textAlign = align


    gCtx.fillText(txt, pos.x, pos.y);
    gCtx.lineWidth = '3'
    gCtx.strokeStyle = stroke
    gCtx.strokeText(txt, pos.x, pos.y)

    // if (isEdit && !isDrag) {
    //      FULL SQURE
    //     gCtx.beginPath()
    //     gCtx.rect(50, pos.y + 10, 400, -size - 10);
    //     gCtx.strokeStyle = '#1b1b1b';
    //     gCtx.stroke();
    //     gCtx.closePath()
    //     gCtx.beginPath();
    //     gCtx.moveTo(50, pos.y + 10);
    //     gCtx.lineTo(450, pos.y + 10);
    //     gCtx.moveTo(50, pos.y - size);
    //     gCtx.lineTo(450, pos.y - size);
    //     gCtx.closePath();
    //     gCtx.strokeStyle = '#1b1b1b';
    //     gCtx.stroke();
    // }
}

function drawTextArea(pos, size) {
    // console.log(pos)
    // gCtx.rect(pos.x - 10, pos.y + 10, 410, -size - 10);
    // gCtx.strokeStyle = '#1b1b1b';
    // gCtx.stroke();
    gCtx.beginPath();
    gCtx.moveTo(50, pos.y + 10);
    gCtx.lineTo(450, pos.y + 10);
    gCtx.moveTo(50, pos.y - size);
    gCtx.lineTo(450, pos.y - size);
    gCtx.closePath();
    gCtx.strokeStyle = '#1b1b1b';
    gCtx.stroke();
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

// function drawTextArea(pos, size) {
//     // console.log(pos)
//     gCtx.beginPath()
//     // gCtx.rect(pos.x - 10, pos.y + 10, 410, -size - 10);
//     gCtx.strokeStyle = '#1b1b1b';
//     gCtx.stroke();
//     gCtx.cloasePath()
// }

function onEdit() {
    // console.log('hi');
    setEdit(true)
    renderMeme()
}

function onChangeLine() {
    changeLine()
    renderMeme()
    const line = getLine()
    document.querySelector('.input').value = line.txt
}

function onAddLine() {
    addLine()
    renderMeme()
    const line = getLine()
    document.querySelector('.input').value = line.txt
}

function onDownloadImg(elLink) {
    var imgContent = gElCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent
}

function onSetFont(font) {
    setFont(font)
    renderMeme()

}

function onSaveMeme(){
    saveMeme()
    document.querySelector('.input').value = ''
    setEdit(false)
    renderMeme()
    alert('saved MeMe')
}


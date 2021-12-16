'use strict'

var gMeme

function initMeme() {
    gMeme = {
        selectedImgId: 0,
        selectedLineIdx: 0,
        lines: [
            {
                txt: '',
                size: 100,
                align: 'left',
                color: 'white',
                stroke: 'black',
                font: 'impact',
                x: 250,
                y: 50,
            }
        ]
    }
}


function steImg(imgId) {
    // console.log(imgId);
    // console.log(gMeme.selectedImgId);
    gMeme.selectedImgId = imgId
}

function getMeme() {
    return gMeme
}

function increaseFont() {
    gMeme.lines[gMeme.selectedLineIdx].size += 10
}

function changeText(text) {
    gMeme.lines[gMeme.selectedLineIdx].txt = text
    // console.log(gMeme.lines[gMeme.selectedLineIdx].txt)
}

function decreaseFont() {
    gMeme.lines[gMeme.selectedLineIdx].size -= 10
}
function setColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].color = color 
}

function setStroke(stroke) {
    gMeme.lines[gMeme.selectedLineIdx].stroke = stroke
}

function setClearText() {
    // gMeme.lines[gMeme.selectedLineIdx].txt = ''
    const isSure = confirm("Are You Sure ?")
    if (isSure) {
        const lines = gMeme.lines
        lines.forEach(function (line) {
            line.txt = ''
        })
        return isSure
    }
}

// function clearText() {
//     const isSure = confirm('are you sure?')
//     if (isSure){
//         const lines = gMeme.lines
//         lines.forEach(function (line) {
//             line.txt = ''
//         });
//         return isSure
//     }
// }


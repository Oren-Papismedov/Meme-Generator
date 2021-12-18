'use strict'

const STORAGE_KEY = 'memesDB'
var gMeme

function initMeme() {
    gMeme = {
        selectedImgId: 0,
        isEdit: false,
        selectedLineIdx: 0,
        lines: [
            {
                txt: '',
                size: 70,
                align: 'left',
                color: 'white',
                stroke: 'black',
                font: 'Gloria',
                x: 50,
                y: 87,
                isDrag: false,

            },
            {
                txt: '',
                size: 70,
                align: 'left',
                color: 'white',
                stroke: 'black',
                font: 'Gloria',
                x: 50,
                y: 470,
                isDrag: false,

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
        const imgId = gMeme.selectedImgId
        initMeme()
        steImg(imgId)
        // const lines = gMeme.lines
        // lines.forEach(function (line) {
        //     line.txt = ''

        // })
        return isSure
    }
}

function alignText(id) {
    const align = id
    gMeme.lines[gMeme.selectedLineIdx].align = align
    switch (align) {
        case 'left': gMeme.lines[gMeme.selectedLineIdx].x = 50

            break;

        case 'center': gMeme.lines[gMeme.selectedLineIdx].x = 250

            break;

        case 'right': gMeme.lines[gMeme.selectedLineIdx].x = 450

            break
    }
}

// function isTextClicked(clickedPos) {
//     const posX = gMeme.lines[gMeme.selectedLineIdx].x
//     const posY = gMeme.lines[gMeme.selectedLineIdx].y
//     const distanceY = posY - clickedPos.y
//     // console.log(clickedPos.x);
//     return (distanceY <= gMeme.lines[gMeme.selectedLineIdx].size
//          && distanceY > 0 
//          && clickedPos.x > 50 
//          && clickedPos.x < 450 
//            )
// }

function isTextClicked(clickedPos) {
    let isClick = false
    gMeme.isEdit = false
    gMeme.lines.forEach(function (line, i) {
        const posX = line.x
        const posY = line.y
        const distanceY = posY - clickedPos.y
        // console.log(clickedPos.x)
        if (distanceY <= gMeme.lines[gMeme.selectedLineIdx].size
            && distanceY > 0
            && clickedPos.x > 50
            && clickedPos.x < 450) {
            gMeme.selectedLineIdx = i
            // console.log(gMeme.selectedLineIdx);
            isClick = true
            gMeme.isEdit = true
        }
    });
    return isClick
}


function setTextDrag(isDrag) {
    gMeme.lines[gMeme.selectedLineIdx].isDrag = isDrag
}

function getLine() {
    return gMeme.lines[gMeme.selectedLineIdx]
}

function moveLine(dx, dy) {
    gMeme.lines[gMeme.selectedLineIdx].x += dx
    gMeme.lines[gMeme.selectedLineIdx].y += dy

}

function setEdit(value) {
    gMeme.isEdit = value
}

function changeLine() {
    // gMeme.isEdit = false
    gMeme.selectedLineIdx = (gMeme.selectedLineIdx >= gMeme.lines.length - 1) ? 0 : ++gMeme.selectedLineIdx
    // gMeme.isEdit = trues
    // console.log(gMeme.selectedLineIdx);
}

function addLine() {
    const newLine = {

        txt: '',
        size: 70,
        align: 'left',
        color: 'white',
        stroke: 'black',
        font: 'Gloria',
        x: 50,
        y: 250,
        isDrag: false,

    }

    gMeme.lines.push(newLine)
    gMeme.selectedLineIdx = gMeme.lines.length - 1

}

function uploadImg() {
    const imgDataUrl = gElCanvas.toDataURL("image/jpeg");

    // A function to be called if request succeeds
    function onSuccess(uploadedImgUrl) {
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        document.querySelector('.user-msg').innerText = `Your photo is available here: ${uploadedImgUrl}`

        document.querySelector('.share-container').innerHTML = `
        <a class="btn" href="https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}" title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}'); return false;">
           Share   
        </a>`
    }
    doUploadImg(imgDataUrl, onSuccess);
}

function doUploadImg(imgDataUrl, onSuccess) {

    const formData = new FormData();
    formData.append('img', imgDataUrl)

    fetch('//ca-upload.com/here/upload.php', {
        method: 'POST',
        body: formData
    })
        .then(res => res.text())
        .then((url) => {
            console.log('Got back live url:', url);
            onSuccess(url)
        })
        .catch((err) => {
            console.error(err)
        })
}

function setFont(font){
    gMeme.lines[gMeme.selectedLineIdx].font = font
}

function saveMeme() {

    let memes = loadFromStorage(STORAGE_KEY)
    if (!memes) memes = [gMeme]
    else memes.push(gMeme)
    saveToStorage(STORAGE_KEY, memes)

    
}

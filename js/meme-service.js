'use strict'


var gMeme = {
    selectedImgId: 0,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'hi',
            size: 50,
            align: 'left',
            color: 'white',
            stroke: 'black',
            font: 'impact',
            x: 250,
			y: 50,
        }
    ]
}


function steImg(imgId) {
    // console.log(imgId);
    // console.log(gMeme.selectedImgId);
    gMeme.selectedImgId = imgId
}

function getMeme() {
    return gMeme
}

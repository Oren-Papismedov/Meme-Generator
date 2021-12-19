'use strict'

function toggle(){
    if (document.body.classList.contains('modal-open')) toggleModal()
    if (document.body.classList.contains('menu-open')) toggleMenu()
}

function toggleMenu() {
    document.body.classList.toggle('menu-open')
}
function toggleModal(value) {
    document.body.classList.toggle('modal-open')
    if (!value) return
     _renderModal(value)
}

function _renderModal(value) {
    var elModal = document.querySelector('.modal')
    switch (value) {
        case 'saved-memes':
            // console.log('hi');
            const memes = loadFromStorage(STORAGE_KEY)
            let strHtmls = `<div class="imgs-container">`
            let lineTxtStrs 
            const strs = memes.map(function (meme,i) {
                lineTxtStrs = meme.lines.map(function (line) {
                    return `
                    <p>${line.txt}</p>
                    `
                });
                
                const str =`
                <div class="meme-card flex">
                <img id="${i}" onclick="onRestoreMeme(this)" src="img/img/${meme.selectedImgId}.jpg">
                <div class="lines flex">
                ${lineTxtStrs.join('')}
                </div>
                </div>
                `
                return str
            });
            strHtmls += `${strs.join('')}</div>` 
            // console.log(strHtmls)
            elModal.innerHTML = strHtmls


            break;
            case 'about':
                // console.log('hi');
                elModal.innerHTML= `<div class="team-member flex justify-content">
                <img class="mx-auto rounded-circle" src="img/about/14.jpg" alt="">
                <div class="info-container flex">
                    <h4>Oren Papismedov</h4>
                    <p class="text-muted">Full Stack Developer (almost)</p>
                    <ul class="social-buttons flex">
                        <li class="list-inline-item">
                            <a target=”_blank”
                                href="https://he.wikipedia.org/wiki/%D7%90%D7%95%D7%A8%D7%9F_%D7%A4%D7%A4%D7%99%D7%A1%D7%9E%D7%93%D7%95%D7%91">
                                <i class="fa fa-wikipedia-w"></i>
                            </a>
                        </li>
                        <li class="list-inline-item">
                            <a target=”_blank” href="https://www.facebook.com/oren.papi/">
                                <i class="fa fa-facebook"></i>
                            </a>
                        </li>
                        <li class="list-inline-item">
                            <a target=”_blank” href="https://www.linkedin.com/in/oren-papismedov-a51aba217/">
                                <i class="fa fa-linkedin"></i>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>`
                break;

            
    }

}

function onRestoreMeme(elImg){
    const memes = loadFromStorage(STORAGE_KEY)
    // console.log(elImg)
    memes.forEach(function (meme,i) {
        // console.log(i)
        if (i+'' === elImg.id) onSetMeme(meme)
    });
    toggleModal()
    
}

// function onResizeWindow(width) {
//     // console.log(width);
//     if (width > 550) onResizeCanvas (350,  350)
// }

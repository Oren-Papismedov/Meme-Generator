'use strict'


var gImgs = [
    { id: 1, url: 'img/img/1.jpg', keywords: ['trump', 'president'] },
    { id: 2, url: 'img/img/2.jpg', keywords: ['puppies', 'twins'] },
    { id: 3, url: 'img/img/3.jpg', keywords: ['baby', 'sleep'] },
    { id: 4, url: 'img/img/4.jpg', keywords: ['cat', 'sleep'] },
    { id: 5, url: 'img/img/5.jpg', keywords: ['baby', 'yes'] },
    { id: 6, url: 'img/img/6.jpg', keywords: ['bad hair day', 'weirdo'] },
    { id: 7, url: 'img/img/7.jpg', keywords: ['baby', 'eyes'] },
    { id: 8, url: 'img/img/8.jpg', keywords: ['magician', 'i don care'] },
    { id: 9, url: 'img/img/9.jpg', keywords: ['baby', 'laugh'] },
    { id: 10, url: 'img/img/10.jpg', keywords: ['obama', 'president'] },
    { id: 11, url: 'img/img/11.jpg', keywords: ['kiss', 'couple'] },
    { id: 12, url: 'img/img/12.jpg', keywords: ['you', 'righteous'] },
    { id: 13, url: 'img/img/13.jpg', keywords: ['cheers', 'leo'] },
    { id: 14, url: 'img/img/14.jpg', keywords: ['stfu', 'matrix'] },
    { id: 15, url: 'img/img/15.jpg', keywords: ['hole', 'knight'] },
    { id: 16, url: 'img/img/16.jpg', keywords: ['lol', 'i cant believe'] },
    { id: 17, url: 'img/img/17.jpg', keywords: ['putin', 'hes gonna die'] },
    { id: 18, url: 'img/img/18.jpg', keywords: ['look', 'future'] },
    { id: 19, url: 'img/img/19.jpg', keywords: ['nooooo', 'whaaaat'] },
    { id: 20, url: 'img/img/20.jpg', keywords: ['dr evil', 'scary'] },
    { id: 21, url: 'img/img/21.jpg', keywords: ['kids', 'happy'] },
    { id: 22, url: 'img/img/22.jpg', keywords: ['trump', 'president'] },
    { id: 23, url: 'img/img/23.jpg', keywords: ['puppy', 'funny'] },
    { id: 24, url: 'img/img/24.jpg', keywords: ['oprah', 'happy'] },
]

function pushImg(img) {
    const currImg = {
        id: gImgs.length+1,
        url: img.src,
    }
    gImgs.push(currImg)
}


function getImgs() {
    return gImgs
}
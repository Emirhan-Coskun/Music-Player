"use strict";

class Music {
    constructor(title, singer, img, file) {
        this.title = title;
        this.singer = singer;
        this.img = img;
        this.file = file;
    }

    getName() {
        return this.title + ' - ' + this.singer;
    }
}

const musicList = [
    new Music("Cambaz","Mor ve Ötesi","1.jpeg","1.mp3"),
    new Music("","","2.jpeg","2.mp3"),
    new Music("","","3.jpeg","3.mp3"),
    new Music("","","4.jpeg","4.mp3"),
    new Music("","","5.jpeg","5.mp3"),
]
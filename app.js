"use strict";

const container = document.querySelector(".container");
const image = document.querySelector("#music-image");
const title = document.querySelector("#music-details .title");
const singer = document.querySelector("#music-details .singer");
const prev = document.querySelector("#controls #prev");
const play = document.querySelector("#controls #play");
const next = document.querySelector("#controls #next");

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

    getSinger() {
        return this.singer;
    }
}

const musicList = [
    new Music("Cambaz", "Mor ve Ötesi", "1.jpeg", "1.mp3"),
    new Music("Senden Daha Güzel", "Duman", "2.jpeg", "2.mp3"),
    new Music("Giderim Senden", "Damla Arıcan", "3.jpeg", "3.mp3"),
    new Music("Sigara", "Müslüm Gürses", "4.jpeg", "4.mp3"),
    new Music("Show Must Go On", "Queen", "5.jpeg", "5.mp3"),
]

class MusicPlayer {
    constructor(musicList) {
        this.musicList = musicList;
        this.index = 0;
    }

    getMusic() {
        return this.musicList[this.index];
    }

    next() {
        if (this.index + 1 != this.musicList.length) {
            this.index++;
        } else {
            this.index = 0;
        }
    }

    prev() {
        if (this.index != 0) {
            this.index--;
        } else {
            this.index = this.musicList.length - 1;
        }
    }
}

const player = new MusicPlayer(musicList);
let music = player.getMusic();

window.addEventListener("load", () => {
    let music = player.getMusic();
    displayMusic(music);
});

function displayMusic(music) {
    title.innerHTML = music.getName();
    singer.innerText = music.getSinger();
    image.src = "img/" + music.img;
    audio.src = "mp3/" + music.file;
}

play.addEventListener("click", function () {
    const isMusicPlay = container.classList.contains("playing");
    isMusicPlay ? pauseMusic() : playMusic();
});

prev.addEventListener("click", () => {
    prevMusic();
});

next.addEventListener("click", () => {
    nextMusic();
});

function nextMusic() {
    player.next();
    let music = player.getMusic();
    displayMusic(music);
    playMusic();
}

function prevMusic() {
    player.prev();
    let music = player.getMusic();
    displayMusic(music);
    playMusic();
}

function pauseMusic() {
    container.classList.remove("playing");
    play.classList = ("fa-solid fa-play");
    audio.pause();
}

function playMusic() {
    container.classList.add("playing");
    play.classList = ("fa-solid fa-pause");
    audio.play();
};


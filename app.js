"use strict";

const calculateTime = (toplamSaniye) => {
  const dakika = Math.floor(toplamSaniye / 60);
  const saniye = Math.floor(toplamSaniye % 60);
  const guncellenenSaniye = saniye < 10 ? `0${saniye}` : `${saniye}`;
  const sonuc = `${dakika}:${guncellenenSaniye}`;
  return sonuc;
};
6;
const container = document.querySelector(".container");
const image = document.querySelector("#music-image");
const title = document.querySelector("#music-details .title");
const singer = document.querySelector("#music-details .singer");
const prev = document.querySelector("#controls #prev");
const play = document.querySelector("#controls #play");
const next = document.querySelector("#controls #next");
const duration = document.querySelector("#duration");
const currentTime = document.querySelector("#current-time");
const progressBar = document.querySelector("#progress-bar");
const volume = document.querySelector("#volume");
const volumeBar = document.querySelector("#volume-bar");
const ul = document.querySelector("ul");
const collapseBtn = document.querySelector("#collapse-btn");
const collapseList = document.querySelector("#collapse-list");

class Music {
  constructor(title, singer, img, file, duration) {
    this.title = title;
    this.singer = singer;
    this.img = img;
    this.file = file;
  }

  getName() {
    return this.title + " - " + this.singer;
  }

  getSinger() {
    return this.singer;
  }
}

const musicList = [
  new Music("Cambaz", "Mor ve Ötesi", "1.jpeg", "1.mp3"),
  new Music("Senden Daha Güzel", "Duman", "2.jpeg", "2.mp3"),
  new Music(" Winner Takes It All", "ABBA", "3.jpeg", "3.mp3"),
  new Music("Losing My Religion", "R.E.M.", "4.jpeg", "4.mp3"),
  new Music("Show Must Go On", "Queen", "5.jpeg", "5.mp3"),
];

class MusicPlayer {
  constructor(musicList) {
    this.musicList = musicList;
    this.index = 0;
  }

  getMusic() {
    return this.musicList[this.index];
  }

  next() {
    if (this.index + 1 < this.musicList.length) {
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
  displayMusicList(player.musicList);
  isPlayingNow();
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
  isPlayingNow();
}

const prevMusic = () => {
  player.prev();
  let music = player.getMusic();
  displayMusic(music);
  playMusic();
  isPlayingNow();
};

const pauseMusic = () => {
  container.classList.remove("playing");
  play.querySelector("i").classList = "fa-solid fa-play";
  audio.pause();
};

const playMusic = () => {
  container.classList.add("playing");
  play.querySelector("i").classList = "fa-solid fa-pause";
  audio.play();
};

audio.addEventListener("loadedmetadata", () => {
  duration.textContent = calculateTime(audio.duration);
  progressBar.max = Math.floor(audio.duration);
});

audio.addEventListener("timeupdate", () => {
  progressBar.value = Math.floor(audio.currentTime);
  currentTime.textContent = calculateTime(progressBar.value);
});

progressBar.addEventListener("input", () => {
  currentTime.textContent = calculateTime(progressBar.value);
  audio.currentTime = progressBar.value;
});

let sesDurumu = "sesli";

volumeBar.addEventListener("input", (e) => {
  const value = e.target.value;
  audio.volume = value / 100;
  if (value == 0) {
    audio.muted = true;
    sesDurumu = "sessiz";
    volume.classList = "fa-solid fa-volume-xmark";
  } else {
    audio.muted = false;
    sesDurumu = "sesli";
    volume.classList = "fa-solid fa-volume-high";
  }
});

volume.addEventListener("click", () => {
  if (sesDurumu === "sesli") {
    audio.muted = true;
    sesDurumu = "sessiz";
    volume.classList = "fa-solid fa-volume-xmark";
    volumeBar.value = 0;
  } else {
    audio.muted = false;
    sesDurumu = "sesli";
    volume.classList = "fa-solid fa-volume-high";
    volumeBar.value = 100;
  }
});

collapseBtn.addEventListener("click", function () {
  const isCollapsed = collapseList.classList.contains("opened");
  isCollapsed ? closeList() : openList();
});

function closeList() {
  collapseList.classList.remove("opened");
  collapseList.classList.add("closed");
}

function openList() {
  collapseList.classList.remove("closed");
  collapseList.classList.add("opened");
}

const displayMusicList = (list) => {
  for (let i = 0; i < list.length; i++) {
    let liTag = `<li li-index="${i}" onclick="selectedMusic(this)" class="list-group-item d-flex justify-content-between align-items-center">
        <span> ${list[i].getName()} </span>
        <span id="music-${i}" class="badge bg-primary rounded-pill"></span>
        <audio class="music-${i}" src="mp3/${list[i].file}"></audio>
      </li>`;

    ul.insertAdjacentHTML("beforeend", liTag);

    let liAudioDuration = ul.querySelector(`#music-${i}`);
    let liAudioTag = ul.querySelector(`.music-${i}`);
    liAudioTag.addEventListener("loadeddata", () => {
      liAudioDuration.innerText = calculateTime(liAudioTag.duration);
    });
  }
};

const selectedMusic = (li) => {
  player.index = li.getAttribute("li-index");
  displayMusic(player.getMusic());
  playMusic();
  isPlayingNow();
};

const isPlayingNow = () => {
  for (let li of ul.querySelectorAll("li")) {
    if (li.classList.contains("playing")) {
      li.classList.remove("playing");
    }
    if (li.getAttribute("li-index") == player.index) {
      li.classList.add("playing");
    }
  }
};

audio.addEventListener("ended", () => {
  nextMusic();
})

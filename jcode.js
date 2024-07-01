console.log("Welcome To Spotify");

// Initializing variables
let songIndex = 0;
let audioElement = new Audio('Songs/1.mp3');
let Masterplay = document.getElementById('Masterplay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songInfo = document.querySelector('.songInfo');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Village background Music", filePath: "Songs/2.mp3", coverPath: "Media/4.jfif"},
    {songName: "Uplifting Feel Good", filePath: "Songs/3.mp3", coverPath: "Media/5.jfif"},
    {songName: "Dancing in the stardust", filePath: "Songs/4.mp3", coverPath: "Media/6.jpg"},
    {songName: "BG MUSIC", filePath: "Songs/5.mp3", coverPath: "Media/7.webp"},
    {songName: "Beyond Horizons", filePath: "Songs/6.mp3", coverPath: "Media/8.webp"},
    {songName: "Catholic Lay It Out", filePath: "Songs/7.mp3", coverPath: "Media/9.jfif"},
    {songName: "tvari Tokyo Cafe", filePath: "Songs/1.mp3", coverPath: "Media/cover1.jpg"},
];

songItems.forEach((element, i) => {
    element.getElementsByTagName('img')[0].src = songs[i].coverPath;
    element.getElementsByClassName('songName')[0].innerText = songs[i].songName;
});

// Handle play/pause click
Masterplay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        Masterplay.classList.remove('fa-play-circle');
        Masterplay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        Masterplay.classList.remove('fa-pause-circle');
        Masterplay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
});

// Listen to events
audioElement.addEventListener('timeupdate', () => {
    console.log('timeupdate');
    // Update seekbar
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
});

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
});

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    });
};

const playSong = (index) => {
    songIndex = index;
    audioElement.src = songs[songIndex].filePath;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    Masterplay.classList.remove('fa-play-circle');
    Masterplay.classList.add('fa-pause-circle');
    songInfo.textContent = songs[songIndex].songName;
};

Array.from(document.getElementsByClassName("songItemPlay")).forEach((element, i) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();
        playSong(i);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
    });
});

// Function to play the next song
const nextSong = () => {
    if (songIndex >= songs.length - 1) {
        songIndex = 0;
    } else {
        songIndex += 1;
    }
    playSong(songIndex);
};

// Function to play the previous song or restart the current song
const prevSong = () => {
    if (audioElement.currentTime > 3) {
        audioElement.currentTime = 0;
    } else {
        if (songIndex <= 0) {
            songIndex = songs.length - 1;
        } else {
            songIndex -= 1;
        }
        playSong(songIndex);
    }
};

// Event listeners for rewind and fast forward buttons
document.querySelector('.fa-backward').addEventListener('click', prevSong);
document.querySelector('.fa-forward').addEventListener('click', nextSong);

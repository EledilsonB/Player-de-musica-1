// Variáveis
const songName = document.getElementById('song-name');
const bandName = document.getElementById('band-name');
const likeButton = document.getElementById('like');
const song = document.getElementById('audio');
const cover = document.getElementById('cover');
const play = document.getElementById('play');
const next = document.getElementById('next');
const previous = document.getElementById('previous');
const currentProgress = document.getElementById('current-progress');
const progressContainer = document.getElementById('progress-container');
const shuffleButton = document.getElementById('shuffle');
const repeatButton = document.getElementById('repeat');
const songTime = document.getElementById('song-time');
const totalTime = document.getElementById('total-time');


const estranged = {
    songName: " Estranged",
    artist: "Guns n' Roses",
    album: "Appetite for destruction",
    cover: "AFD-guns",
    song: "Guns N' Roses-Estranged",
    liked: false,
}
const welcomeToTheJungle = {
    songName: "Welcome to the jungle",
    artist: "Guns n' Roses",
    album: "Appetite for destruction",
    cover: "AFD-guns",
    song: "Guns N' Roses - Welcome To The Jungle",
    liked: false,
}
const patience = {
    songName: "Patience",
    artist: "Guns n' Roses",
    album: "Appetite for destruction",
    cover: "AFD-guns",
    song: "Guns N' Roses - Patience",
    liked: false,
}
const black = {
    songName: "Black",
    artist: "Pearl Jam",
    album: "Even Flow",
    cover: "Even Flow",
    song: "Pearl Jam - Black (Official Audio)",
    liked: false,
}
const evenFlow = {
    songName: "Even Flow",
    artist: "Pearl Jam",
    album: "Even Flow",
    cover: "Even Flow",
    song: "Pearl Jam - Even Flow (Official Video)",
    liked: false,
}
const boysForLife = {
    songName: "Boys for life ",
    artist: "Warren Zeider",
    album: "On the life",
    cover: "warren zeider - on the run",
    song: "Warren Zeiders - Boys for Life  (717 Tapes) [Official Audio]",
    liked: false,
}


let isPlaying = false;
let isShuffled = false;
let repeatOn = false;
/*?? [estranged, welcomeToTheJungle, patience, black, evenFlow, boysForLife]; */
const originalPlaylist = JSON.parse(localStorage.getItem('playlist')) ?? [estranged,
    welcomeToTheJungle,
    patience,
    black,
    evenFlow,
    boysForLife]; // JSON.parse, serve para transformar uma string em linha estruturada. 'localStorage' é um armazenamento do navegador, para não precisar usar bancos de dados. 'getItem' serve para pegar o item chave.
let sortedPlaylist = [...originalPlaylist]; // Esses 3 pontos significam ' espalhar', serve para pegar o conteúdo do primeiro array e passar dentro do novo, mas como se tivesse criado um array novo.
let index = 0;


// Crio funções
function playSong() {
    play.querySelector('.bi').classList.remove('bi-play-circle-fill');
    play.querySelector('.bi').classList.add('bi-pause-circle-fill');
    song.play();
    isPlaying = true;
}

function pauseSong() {
    play.querySelector('.bi').classList.add('bi-play-circle-fill');
    play.querySelector('.bi').classList.remove('bi-pause-circle-fill');
    song.pause();
    isPlaying = false;

}

function playPauseDecider() {
    if (isPlaying === true) {
        pauseSong();
    } else {
        playSong();
    }
}

function initializeSong() {
    cover.src = `./imagens de capas/${sortedPlaylist[index].cover}.jpeg`;
    song.src = `songs/${sortedPlaylist[index].song}.mp3`;
    songName.innerText = sortedPlaylist[index].songName;
    bandName.innerText = sortedPlaylist[index].artist;
    likeButtonRender();
}

function previousSong() {
    if (index === 0) {
        index = sortedPlaylist.length - 1;
    } else {
        index -= 1;
    }
    initializeSong();
    playSong();
}

function nextSong() {
    if (index === sortedPlaylist.length - 1) {
        index = 0;
    } else {
        index += 1;
    }
    initializeSong();
    playSong();
}

function updateProgress() {
    /* '  song.currentTime ' simboliza o tempo atual da música*/
    /* ' song.duration ' simboliza o tempo restante da música */
    const barWidth = (song.currentTime / song.duration) * 100; /* dividindo o tempo de duração da música pelo tempo atual encontra-se o tempo que falta(pensando que o tempo inicial é 0% executado da música e o tempo final é 100%, basta multiplicar por 100 para ter a porcentagem exata do tempo de execução.) */
    currentProgress.style.setProperty('--progress', `${barWidth}%`); // outra forma de fazer a função da barra de progresso =>  currentProgress.style.width = barWidth + '%';
    songTime.innerText = toHHMMSS(song.currentTime);
}
/* Essa função serve para ajustar a posição do click na barra de progresso */
function jumpTo(event) {
    const width = progressContainer.clientWidth;
    const clickPosition = event.offsetX;
    const jumpToTime = (clickPosition / width) * song.duration;
    song.currentTime = jumpToTime;
}

function shuffleArray(preShuffleArray) {
    const size = preShuffleArray.length;
    let currentIndex = size - 1;
    while (currentIndex > 0) {
        let randomIndex = Math.floor(Math.random() * size);
        let aux = preShuffleArray[currentIndex]; // Essa variável auxiliar serve para basicamente criar uma "cópia" do index que vai ser coberto pelo sorteado para ficar no lugar dele. (cria cópia do cara original) 
        preShuffleArray[currentIndex] = preShuffleArray[randomIndex]; // Aki faz a troca dos lugares entre o cara sorteado e a "cópia" criada do index que já estava no local da troca. ( subistitui a posição dos index)
        preShuffleArray[randomIndex] = aux; // Posiciona  a "cópia" do index original na antiga posição do index sorteado para a nova posição.
        currentIndex -= 1;
    }
}

function shuffleButtonClicked() {
    if (isShuffled === false) {
        isShuffled = true; // sinalaiza que a playlist está embaralhada. 
        shuffleArray(sortedPlaylist); // realmente embaralha a playlist. 
        shuffleButton.classList.add('button-active'); // add a class de estilo no botão, para deixa-lo verde.
    } else {
        isShuffled = false; // desativa o embaralhamento.
        sortedPlaylist = [...originalPlaylist];
        shuffleButton.classList.remove('button-active'); // remove o estilo.
    }
}

function repeatButtonClicked() {
    if (repeatOn === false) {
        repeatOn = true;
        repeatButton.classList.add('button-active');
        repeat.querySelector('.bi').classList.remove('bi-repeat');
        repeat.querySelector('.bi').classList.add('bi-repeat-1');

    } else {
        repeatOn = false;
        repeatButton.classList.remove('button-active');
        repeat.querySelector('.bi').classList.remove('bi-repeat-1');
        repeat.querySelector('.bi').classList.add('bi-repeat');

    }
}

function nextOrRepeat() {
    if (repeatOn === false) {
        nextSong();
    } else {
        playSong();
    }
}

function toHHMMSS(originalNumber) {
    let hours = Math.floor(originalNumber / 3600); // para calcular o valor de uma hora inteira.
    let min = Math.floor((originalNumber - hours * 3600) / 60);
    let secs = Math.floor(originalNumber - hours * 3600 - min * 60);

    return `${hours.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function updateTotalTime() {
    totalTime.innerText = toHHMMSS(song.duration);
}

function likeButtonRender() {
    if (sortedPlaylist[index].liked === true) {
        likeButton.querySelector('.bi').classList.remove('bi-heart');
        likeButton.querySelector('.bi').classList.add('bi-heart-fill');
        likeButton.classList.add('button-active');
    } else {
        likeButton.querySelector('.bi').classList.add('bi-heart');
        likeButton.querySelector('.bi').classList.remove('bi-heart-fill');
        likeButton.classList.remove('button-active');
    }
}

function likeButtonClicked() {
    if (sortedPlaylist[index].liked === false) {
        sortedPlaylist[index].liked = true;
    } else {
        sortedPlaylist[index].liked = false;
    }
    likeButtonRender();
    /*chamando o local storage */
    localStorage.setItem('playlist', JSON.stringify(originalPlaylist)); // 'stringfy' serve para transformar uma linha de código em 'string'
}

// Executa função
initializeSong();

// Eventos
play.addEventListener('click', playPauseDecider);
previous.addEventListener('click', previousSong);
next.addEventListener('click', nextSong);
song.addEventListener('timeupdate', updateProgress);
song.addEventListener('ended', nextOrRepeat);
song.addEventListener('loadedmetadata', updateTotalTime);
progressContainer.addEventListener('click', jumpTo);
shuffleButton.addEventListener('click', shuffleButtonClicked);
repeatButton.addEventListener('click', repeatButtonClicked);
likeButton.addEventListener('click', likeButtonClicked);

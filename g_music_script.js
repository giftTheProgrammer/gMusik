const musicContainer = document.querySelector('.music-container');
const playBtn = document.querySelector('#play');
const prevBtn = document.querySelector('#prev');
const nextBtn = document.querySelector('#next');
const audio = document.querySelector('#audio');
const progress = document.querySelector('.progress');
const progressContainer = document.querySelector('.progress-container');
const title = document.querySelector('#title');
const cover = document.querySelector('#cover');

// Song list
const songs = ['hey', 'GED', 'ukulele'];

// Keep track of songs
let songIndex = 2;

// Initially load song info DOM
loadSong( songs[songIndex] );

// Update song details
function loadSong( song ){
	title.innerHTML = song;
	audio.src = `music/${song}.mp3`;
	cover.src = `images/${song}.jpg`;
}

function playSong() {
	musicContainer.classList.add('play');
	playBtn.querySelector('i.fa').classList.remove('fa-play');
	playBtn.querySelector('i.fa').classList.add('fa-pause');

	audio.play();
}

function pauseSong(){
	musicContainer.classList.remove('play');
	playBtn.querySelector('i.fa').classList.remove('fa-pause');
	playBtn.querySelector('i.fa').classList.add('fa-play');

	audio.pause();
}

function prevSong(){
	songIndex--;

	if ( songIndex < 0 ) {
		songIndex = 2;
	}

	loadSong( songs[songIndex] );

	playSong();
}

function nextSong(){
	songIndex++

	if ( songIndex > 2 ) {
		songIndex = 0;
	}

	loadSong( songs[songIndex] );

	playSong();
}

function updateProgress( e ){
	const { duration, currentTime } = e.srcElement;
	// currentTime = e.srcElement.currentTime;
	// duration = e.srcElement.duration;
	progressiveness = ( currentTime / duration ) * 100;
	console.log( progressiveness );
	progress.style.width = `${progressiveness}%`;
}

function setProgress( e ){
	const width = this.clientWidth;
	const clickX = e.offsetX;
	const duration = audio.duration;

	audio.currentTime = (clickX/width) * duration;
}

// Event Listeners
playBtn.addEventListener('click', () => {
	const isPlaying = musicContainer.classList.contains('play');

	if (isPlaying) {
		pauseSong();
	} else {
		playSong();
	}
});

prevBtn.addEventListener( 'click', prevSong );

nextBtn.addEventListener( 'click', nextSong );

audio.addEventListener( 'timeupdate', updateProgress );

progressContainer.addEventListener( 'click', setProgress );

audio.addEventListener( 'ended', nextSong );
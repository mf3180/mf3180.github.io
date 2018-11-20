var audioContext = new(window.AudioContext || window.webkitAudioContext)(),
    delay = audioContext.createDelay(),
    soundAudio = 'Crimewave.mp3',
    sampleBuffers, sound, playButton = document.querySelector('.play'),
    stopButton = document.querySelector('.stop'),
    loop = false,
    loopButton = document.querySelector(‘.loop'),
var sound;
//this function loads the sound
init();

function init() {
	loadSound(BIRDAudio);
};

playButton.onclick = function () {
	playSound();
};

stopButton.onclick = function() {
	stopSound();
};


//this function loads the sound
function loadSound(url) {
	var request = new XMLHttpRequest();
request.open("GET", url, true);
request.responseType = "arraybuffer";

request.onload = function() {
	audioContext.decodeAudioData(request.response, function(buffer){
		sampleBuffer = buffer;
		playButton.disabled = false;
		playButton.innerHTML = 'play';
	});
};

request.send();

}

//this function sets up the sound
//needs to run when webpage loads to load audio buffer
function setupSound() {
	sound = audioContext.createBufferSource();
	sound.buffer = sampleBuffer;
	sound.loop = loop;
	sound.connect(delay);
	delay.connect(audioContext.destination);
}

//this function plays the audio & enables/disables buttons
function playSound() {
	UI('play');
	sound.start(0);
	sound.onended = function () {
		UI('stop');
	}
}

//this function stops the sound and enables/disables buttons

function stopSound() {
	UI('stop');
	sound.stop(0);
}
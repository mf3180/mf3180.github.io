var AudioContext = window.AudioContext || window.webkitAudioContext;
var audioCtx = new AudioContext();

var audioDelay = audioCtx.createDelay(5.0);

var destination = audioCtx.destination;

var playAudio = document.querySelector('.play-audio');
var stopAudio = document.querySelector('.stop-audio');
var rangeAudio = document.querySelector('.stop-synth + input');

var buffers = [];

function getData(track) {
	var request = new XMLHttpRequest();
	request.open('GET', track + '.mp3', true);
	request.responseType = 'arraybuffer';

	request.onload = function() {
		audioCtx.decodeAudioData(request.response, function(buffer) {
			myBuffer = buffer;
			buffers.push(myBuffer);
		},

		function(e) {"Error with decoding the audio!" + e.err});
	}

	request.send();
}

getData('audio');

playAudio.onclick = function() {
	audioSource = audioCtx.createBufferSource();
	audioSource.buffer = buffers[2];
	audioSource.loop = true;
	audioSource.start();
	audioSource.connect(audioDelay);
	audioDelay.connect(destination);
	this.setAttribute('disabled,', 'disabled');
}

stopAudio.onclick = function() {
	audioSource.disconnect(audioDelay);
	audioDelay.disconnect(destination);
	audioSource.stop();
	playAudio.removeAttribute('disabled');

}

var delay1;

rangeAudio.oninput = function() {
	delay1 = rangeAudio.value;
	audioDelay.delayTime.value = delay1;
	
}
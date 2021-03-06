var audioContext = new(window.AudioContext || window.webkitAudioContext)(),
    filter = audioContext.createBiquadFilter(),
    ROBYNaudio = 'Dancing On My Own.mp3',
    sampleBuffer, sound, playButton = document.querySelector('.play'),
    stopButton = document.querySelector('.stop'),
    loop = false,
    loopButton = document.querySelector('.loop'),

    filterType = document.querySelector('.filtertype'),
    filterFreq = document.querySelector('.freq'),
    filterFreqSlider = document.querySelector('.filter-slider'),

    filterQ = document.querySelector('.filter-q-value'),
    filterQSlider = document.querySelector('.filter-q-slider'),

    filterGain = document.querySelector('.filter-gain-value'),
    filterGainSlider = document.querySelector('.filter-gain-slider');

// load our sound
init();

function init() {
    loadSound(ROBYNaudio);
}

playButton.onclick = function () {
    playSound();
};

stopButton.onclick = function () {
    stopSound();
};

loopButton.onclick = function () {
    loop = event.target.checked;
};

filterType.oninput = function () {
    changeFilterType(filterType.value);
};

filterFreqSlider.oninput = function () {
    changeFilterFreq(filterFreqSlider.value);
};

filterQSlider.oninput = function () {
    changeFilterQ(filterQSlider.value);
};

filterGainSlider.oninput = function () {
    changeFilterGain(event.target.value);
};

// function to load sounds via AJAX
function loadSound(url) {
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';

    request.onload = function () {
        audioContext.decodeAudioData(request.response, function (buffer) {
            sampleBuffer = buffer;
            playButton.disabled = false;
            playButton.innerHTML = 'play';
        });
    };

    request.send();
}
// setup sound, loop, and connect to destination
function setupSound() {
    sound = audioContext.createBufferSource();
    sound.buffer = sampleBuffer;
    sound.loop = loop;
    sound.connect(filter);
    filter.connect(audioContext.destination);
}

// play sound and enable / disable buttons
function playSound() {
    setupSound();
    UI('play');
    sound.start(0);
    sound.onended = function () {
        UI('stop');
    }
}

// stop sound and enable / disable buttons
function stopSound() {
    UI('stop');
    sound.stop(0);
}

// change filter type and enable / disable controls depending on filter type
function changeFilterType(type) {
    filter.type = type;
    switch (type) {
        case 'bandpass':
        break
    }
}

// change filter frequency and update display 
function changeFilterFreq(freq) {
    filter.frequency.value = freq;
    filterFreq.innerHTML = freq + 'Hz';
}

// change filter Q and update display
function changeFilterQ(Q) {
    filter.Q.value = Q;
    filterQ.innerHTML = Q;
}

// change filter Gain and update display
function changeFilterGain(gain) {
    filter.gain.value = gain;
    filterGain.innerHTML = gain + 'dB';
}

function UI(state){
    switch(state){
        case 'play':
            playButton.disabled = true;
            stopButton.disabled = false;
            filterFreqSlider.disabled = false;
            filterQSlider.disabled = false;
            filterGainSlider.disabled = false;
            break;
        case 'stop':
            playButton.disabled = false;
            stopButton.disabled = true;
            filterFreqSlider.disabled = true;
            filterQSlider.disabled = true;
            filterGainSlider.disabled = true;
            break;
    }
}
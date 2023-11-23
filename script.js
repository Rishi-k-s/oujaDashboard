var audioElements = {};

function playPauseSound(soundFile, soundId) {
    var audio = audioElements[soundId];
    var button = document.getElementById('button' + soundId.charAt(soundId.length - 1));

    if (!audio) {
        audio = new Audio(soundFile);
        audioElements[soundId] = audio;
        updateDurationDisplay(audio, soundId);
    }

    if (audio.paused) {
        audio.play();
        button.classList.add('playing');
    } else {
        audio.pause();
        button.classList.remove('playing');
    }

    audio.addEventListener('timeupdate', function() {
        updateDurationDisplay(audio, soundId);
    });

    audio.addEventListener('ended', function() {
        button.classList.remove('playing');
    });
}

function stopSound(soundId) {
    var audio = audioElements[soundId];
    var button = document.getElementById('button' + soundId.charAt(soundId.length - 1));
    audio.pause();
    audio.currentTime = 0;
    button.classList.remove('playing');
}

function repeatSound(soundId) {
    var audio = audioElements[soundId];
    var repeatButton = document.getElementById('repeatButton' + soundId.charAt(soundId.length - 1));
    if (audio.loop) {
        audio.loop = false;
        repeatButton.classList.remove('playing');
    } else {
        audio.loop = true;
        repeatButton.classList.add('playing');
    }
}

function updateDurationDisplay(audio, soundId) {
    var durationElement = document.getElementById(soundId + 'Duration');
    var currentDuration = formatTime(audio.currentTime);
    var totalDuration = formatTime(audio.duration);
    durationElement.textContent = currentDuration + '/' + totalDuration;
}

function formatTime(seconds) {
    var minutes = Math.floor(seconds / 60);
    var remainingSeconds = Math.floor(seconds % 60);
    return minutes + ':' + (remainingSeconds < 10 ? '0' : '') + remainingSeconds;
}


// JavaScript to store the entered sentence locally
const sentenceInput = document.getElementById('sentenceInput');

// Listen for input changes and store the value locally
sentenceInput.addEventListener('input', function() {
    const sentence = sentenceInput.value;
    localStorage.setItem('storedSentence', sentence);
});

// Load the stored sentence on page load
window.addEventListener('load', function() {
    const storedSentence = localStorage.getItem('storedSentence');
    if (storedSentence) {
        sentenceInput.value = storedSentence;
    }
});
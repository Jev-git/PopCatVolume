let body = document.body;
let toBeShaken = document.getElementById("toBeShaken");
let cat = document.getElementById("cat");
let mouth = document.getElementById("mouth");

const MAX_MOUTH_SIZE = 35;
const PAUSE_THRESHOLD = 20;
const POP_THRESHOLD = 60;
const FRIED_THRESHOLD = 80;

window.api.receive("init", (isMuted, volume) => {
    setCatImage(isMuted, volume);
    setMouthVisibility(isMuted, volume);
    if (isMuted) {
        setCatShake(false);
    } else {
        setMouthSize(volume);
        setCatShake(volume >= POP_THRESHOLD);
    }
    fade();
});

window.api.receive("volumeChanged", (volume) => {
    setCatImage(false, volume);
    setMouthVisibility(false, volume);
    if (volume < PAUSE_THRESHOLD) {
        setCatShake(false);
    } else {
        setMouthSize(volume);
        setCatShake(volume >= POP_THRESHOLD);
    }
    fade();
});

window.api.receive("muteToggled", (isMuted, volume) => {
    setCatImage(isMuted, volume);
    setMouthVisibility(isMuted, volume);
    if (isMuted) {
        setCatShake(false);
    } else {
        if (volume < PAUSE_THRESHOLD) {
            setCatShake(false);
        } else {
            setMouthSize(volume);
            setCatShake(volume >= POP_THRESHOLD);
        }
    }
    fade();
});

function setCatImage(isMuted, volume) {
    if (isMuted) {
        cat.setAttribute("src", "images/pause.png");
    } else {
        if (volume < PAUSE_THRESHOLD) {
            cat.setAttribute("src", "images/pause.png");
        } else if (volume < FRIED_THRESHOLD) {
            cat.setAttribute("src", "images/pop.png");
        } else if (volume < 100) {
            cat.setAttribute("src", "images/fried.png");
        } else {
            cat.setAttribute("src", "images/nani.png");
        }
    }
}

function setMouthSize(volume) {
    let clampedVolume = Math.min(Math.max(volume, PAUSE_THRESHOLD), POP_THRESHOLD);
    mouth.style.width = clampedVolume / POP_THRESHOLD * MAX_MOUTH_SIZE + "px";
}

function setMouthVisibility(isMuted, volume) {
    if (isMuted) {
        mouth.style.visibility = "hidden";
    } else {
        if (volume >= PAUSE_THRESHOLD && volume < FRIED_THRESHOLD) {
            mouth.style.visibility = "visible";
        } else {
            mouth.style.visibility = "hidden";
        }
    }
}

function setCatShake(isShaking) {
    if (isShaking && !toBeShaken.classList.contains("shake")) {
        toBeShaken.classList.add("shake");
    } else if (!isShaking && toBeShaken.classList.contains("shake")) {
        toBeShaken.classList.remove("shake");
    }
}

function fade() {
    body.classList.remove("fade");
    void body.offsetWidth; // Black magic?
    body.classList.add("fade");
}
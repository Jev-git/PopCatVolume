let body = document.body;
let cat = document.getElementById("cat");
let mouth = document.getElementById("mouth");

const MAX_MOUTH_SIZE = 35;
const MIN_VOLUME_MOUTH_DISPLAY = 20;
const MAX_VOLUME_MOUTH_DISPLAY = 60;

window.api.receive("init", (isMuted, volume) => {
    if (isMuted) {
        setMutedCatImage(true);
        setMouthVisibility(false);
        setCatShake(false);
    } else {
        setMutedCatImage(volume < MIN_VOLUME_MOUTH_DISPLAY);
        setMouthVisibility(volume >= MIN_VOLUME_MOUTH_DISPLAY);
        setMouthSize(volume);
        setCatShake(volume >= MAX_VOLUME_MOUTH_DISPLAY);
    }
});

window.api.receive("volumeChanged", (volume) => {
    setMutedCatImage(volume < MIN_VOLUME_MOUTH_DISPLAY);
    setMouthVisibility(volume >= MIN_VOLUME_MOUTH_DISPLAY);
    if (volume < MIN_VOLUME_MOUTH_DISPLAY) {
        setCatShake(false);
    } else {
        setMouthSize(volume);
        setCatShake(volume >= MAX_VOLUME_MOUTH_DISPLAY);
    }
});

window.api.receive("muteToggled", (isMuted, volume) => {
    if (isMuted) {
        setMutedCatImage(true);
        setMouthVisibility(false);
        setCatShake(false);
    } else {
        setMutedCatImage(volume < MIN_VOLUME_MOUTH_DISPLAY);
        setMouthVisibility(volume >= MIN_VOLUME_MOUTH_DISPLAY);
        if (volume < MIN_VOLUME_MOUTH_DISPLAY) {
            setCatShake(false);
        } else {
            setMouthSize(volume);
            setCatShake(volume >= MAX_VOLUME_MOUTH_DISPLAY);
        }
    }
});

function setMutedCatImage(isMuted) {
    cat.setAttribute("src", "images/" + (isMuted ? "muted" : "unmuted") + ".png");
}

function setMouthSize(volume) {
    let clampedVolume = Math.min(Math.max(volume, MIN_VOLUME_MOUTH_DISPLAY), MAX_VOLUME_MOUTH_DISPLAY);
    mouth.style.width = clampedVolume / MAX_VOLUME_MOUTH_DISPLAY * MAX_MOUTH_SIZE + "px";
}

function setMouthVisibility(isVisible) {
    mouth.style.visibility = isVisible ? "visible" : "hidden";
}

function setCatShake(isShaking) {
    if (isShaking && !body.classList.contains("shake")) {
        body.classList.add("shake");
    } else if (!isShaking && body.classList.contains("shake")) {
        body.classList.remove("shake");
    }
}
let cat = document.getElementById("cat");
let mouth = document.getElementById("mouth");
const MAX_MOUTH_SIZE = 35;

window.api.receive("init", (isMuted, volume) => {
    console.log("received init");
    cat.setAttribute("src", "images/" + (isMuted ? "muted" : "unmuted") + ".png");
    mouth.style.width = volume / 80 * MAX_MOUTH_SIZE + "px";
    mouth.style.visibility = (isMuted ? "hidden" : "visible");
});

window.api.receive("volumeChanged", (volume) => {
    cat.setAttribute("src", "images/" + (volume <= 40 ? "muted" : "unmuted") + ".png");
    mouth.style.width = volume / 80 * MAX_MOUTH_SIZE + "px";
});

window.api.receive("mutedToggle", (isMuted) => {
    cat.setAttribute("src", "images/" + (isMuted ? "muted" : "unmuted") + ".png");
    mouth.style.visibility = (isMuted ? "hidden" : "visible");
});
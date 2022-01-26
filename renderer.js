let cat = document.getElementById("cat");

window.api.receive("volumeChanged", (volume) => {
    console.log("volumeChanged");
    console.log(volume);
})

window.api.receive("mutedToggle", (isMuted) => {
    cat.setAttribute("src", "images/" + (isMuted ? "muted" : "unmuted") + ".png");
})
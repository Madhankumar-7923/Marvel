/*VIEW PORT DIMENSION*/
function setFullHeight() {
    document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
}

/*SIDE NAVBAR*/
var sidenav = document.querySelector(".side-navbar")

function showNavbar() {
    sidenav.style.right = "0%"
}

function closeNavbar() {
    sidenav.style.right = "-62%"
}

/*MUTE UNMUTE FUNCTION*/
const video = document.getElementById('introVideo');
const muteButton = document.querySelector('.muteButton');

function toggleMute() {
    video.muted = !video.muted;
}
muteButton.addEventListener('click', function () {
    this.classList.toggle("muteButton_active");
});
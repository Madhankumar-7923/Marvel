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
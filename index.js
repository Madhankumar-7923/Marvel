/*VIEW PORT DIMENSION*/
function setFullHeight() {
    document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
}

window.addEventListener('resize', setFullHeight);
setFullHeight();

/*SIDE NAVBAR*/
var sidenav = document.querySelector(".side-navbar")

function showNavbar() {
    sidenav.style.right = "0%"
}

function closeNavbar() {
    sidenav.style.right = "-62%"
}

/*SEARCH FUNCTION*/
const search = () => {

    const searchBox = document.getElementById("search_item").value.toUpperCase();
    const storeItems = document.getElementById("movie_wrapper");
    const product = document.querySelectorAll(".movie_child");
    const pname = storeItems.getElementsByTagName("h2");
    const noMatch = document.getElementById("no_match");

    // If the search box is empty, hide all movie children and the movie wrapper
    if (searchBox === "") {
        product.forEach(child => {
            child.style.display = "none";
        });
        storeItems.style.display = "none";
        noMatch.style.display = "none";
        return;
    }

    let matchFound = false;

    for (let i = 0; i < pname.length; i++) {
        let match = product[i].getElementsByTagName('h2')[0];

        if (match) {
            let textvalue = match.textContent || match.innerHTML;

            if (textvalue.toUpperCase().indexOf(searchBox) > -1) {
                product[i].style.display = "";
                matchFound = true;
            } else {
                product[i].style.display = "none";
            }
        }

    }

    if (!matchFound) {
        storeItems.style.display = "flex";
        noMatch.style.display = "block";
    } else {
        storeItems.style.display = "flex";
        noMatch.style.display = "none";
    }

};

// Initially hide all movie children and the movie wrapper when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const storeItems = document.getElementById("movie_wrapper");
    const product = document.querySelectorAll(".movie_child");

    product.forEach(child => {
        child.style.display = "none";
    });
    storeItems.style.display = "none";
});

// Add event listener to search box
document.getElementById("search_item").addEventListener('input', search);

/*SLIDER FUNCTION*/
let nextBtn = document.querySelector('.next')
let prevBtn = document.querySelector('.prev')

let slider = document.querySelector('.slider')
let sliderList = slider.querySelector('.slider .list')
let thumbnail = document.querySelector('.slider .thumbnail')
let thumbnailItems = thumbnail.querySelectorAll('.item')

thumbnail.appendChild(thumbnailItems[0])

// Function for next button 
nextBtn.onclick = function () {
    moveSlider('next')
}

// Function for prev button 
prevBtn.onclick = function () {
    moveSlider('prev')
}

function moveSlider(direction) {
    let sliderItems = sliderList.querySelectorAll('.item')
    let thumbnailItems = document.querySelectorAll('.thumbnail .item')

    if (direction === 'next') {
        sliderList.appendChild(sliderItems[0])
        thumbnail.appendChild(thumbnailItems[0])
        slider.classList.add('next')
    } else {
        sliderList.prepend(sliderItems[sliderItems.length - 1])
        thumbnail.prepend(thumbnailItems[thumbnailItems.length - 1])
        slider.classList.add('prev')
    }

    slider.addEventListener('animationend', function () {
        if (direction === 'next') {
            slider.classList.remove('next')
        } else {
            slider.classList.remove('prev')
        }
    }, { once: true }) // Remove the event listener after it's triggered once
}

/*AUTO CAROUSEL*/
function autoCarousel() {
    document.querySelector(".next").click();
}

setInterval(autoCarousel, 5000);
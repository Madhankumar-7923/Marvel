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

/*SEARCH FUNCTION*/
var productcontainer = document.querySelector(".container_content");
var search = document.getElementById("search");
var productlist = productcontainer.querySelectorAll(".container_content_child");

search.addEventListener("keyup", function () {

    var enteredvalue = event.target.value.toUpperCase();

    for (i = 0; i < productlist.length; i++) {
        var productname = productlist[i].querySelector(".watchList_title").textContent;

        if (productname.toUpperCase().indexOf(enteredvalue) < 0) {
            productlist[i].style.display = "none";
        }

        else {
            productlist[i].style.display = "flex";
            productcontainer.style.alignItems = "start";
        }
    }

});

/*FAVOURITE BUTTON*/
function saveWatchlistState() {
    const favorites = [];
    document.querySelectorAll('.heart_icon_active').forEach(icon => {
        favorites.push(icon.dataset.title);
    });
    localStorage.setItem('watchlist', JSON.stringify(favorites));
}

function loadWatchlistState() {
    const favorites = JSON.parse(localStorage.getItem('watchlist')) || [];
    document.querySelectorAll('.heart_icon').forEach(icon => {
        if (favorites.includes(icon.dataset.title)) {
            icon.classList.add('heart_icon_active');
        }
    });
}

function removeFromFavorites(title) {
    // Load current favorites from local storage
    const favorites = JSON.parse(localStorage.getItem('watchlist')) || [];
    
    // Remove the movie with the given title
    const updatedFavorites = favorites.filter(fav => fav !== title);
    
    // Save the updated favorites back to local storage
    localStorage.setItem('watchlist', JSON.stringify(updatedFavorites));
    
    // Update the UI to reflect the change
    let heartIcon = document.querySelector(`.heart_icon[data-title="${title}"]`);
    if (heartIcon) {
        heartIcon.classList.remove("heart_icon_active");
    }
}

document.addEventListener('DOMContentLoaded', loadWatchlistState);

var favElements = document.querySelectorAll(".heart_icon");

favElements.forEach(function (fav) {
    fav.addEventListener('click', function () {
        this.classList.add("heart_icon_active");
        saveWatchlistState();
    });
});

/*FAVOURITE SIDE NAV*/

//Hide Unhide Side NavBar
const btnnav = document.querySelector(".fav_movie_icon");
const wordnav = document.querySelector(".side-navbar-link-watchlist");
const navbar = document.querySelector(".watchList_nav_container");
const navbar_close = document.querySelector("#nav_close");

btnnav.addEventListener("click", () => {
    navbar.classList.add("watchList-active");
});

wordnav.addEventListener("click", () => {
    navbar.classList.add("watchList-active");
})

navbar_close.addEventListener("click", () => {
    navbar.classList.remove("watchList-active");
});

function activateWatchList() {
    navbar.classList.add("watchList-active");
}

//Load DOM Function
document.addEventListener('DOMContentLoaded', loadFunction);

function loadFunction() {
    deleteMovie();
}

/*REMOVE ITEM FROM LIST*/
function deleteMovie() {
    const watchListNavContent = document.querySelector(".watchList_nav_content");
    
    // Remove existing event listeners to prevent duplicates
    watchListNavContent.removeEventListener('click', handleRemoveClick);

    // Add the event listener
    watchListNavContent.addEventListener('click', handleRemoveClick);
}

function handleRemoveClick(event) {
    if (event.target.classList.contains('watchList_remove')) {
        removeItem.call(event.target);
    }
}

function removeItem() {

    if (confirm("Are Sure To Remove")) {
        let titleElement = this.parentElement.parentElement.querySelector(".watchList_title");
        let title = titleElement.textContent.trim();
        itemList = itemList.filter(el => el.title.trim().toLowerCase() !== title.toLowerCase());
        saveToLocalStorage();
        this.parentElement.parentElement.remove();

        //Remove heart active icon
        let heartIcon = document.querySelector(`.heart_icon[data-title="${title}"]`);
        if (heartIcon) {
            heartIcon.classList.remove("heart_icon_active");
            removeFromFavorites(title)
        }

        loadFunction();
    }

}

let itemList = JSON.parse(localStorage.getItem('favoriteMovies')) || [];

//Add To Favourite
let favBtns = document.querySelectorAll(".heart_icon");

favBtns.forEach((btn) => {
    btn.addEventListener('click', addFav);
});

favBtns.forEach((btn) => {
    btn.addEventListener('click', activateWatchList);
});

function addFav() {
    let movie = event.target.closest('.container_content_child');
    let image = movie.querySelector(".watchList_image_src").src;
    let title = movie.querySelector(".watchList_title").innerHTML;
    let rating = movie.querySelector(".star_icon").innerHTML;
    let filLoc = movie.querySelector(".file_loc").innerHTML

    let newMovie = { image, title, rating, filLoc};

    //check product already exist in favourite
    if (itemList.find((el) => el.title === newMovie.title)) {
        alert("Already Added To Your Favourites");
        return;
    }

    else {
        itemList.push(newMovie);
        saveToLocalStorage();
    }

    let newMovieElement = createFavourite(image, title, rating, filLoc);
    let element = document.createElement("div");
    element.innerHTML = newMovieElement;
    let movieBasket = document.querySelector(".watchList_nav_content");
    movieBasket.append(element);

    loadFunction();
}

//Create Favourite
function createFavourite(image, title, rating, filLoc) {

    return `
     <div class="watchList_nav_box">

                <div class="watchList_image">
                    <img src="${image}" class="watchList_image_src">
                </div>

                <div class="watchListed_detail">
                    <div class="watchList_title WMT">${title}</div>
                    <div class="watchList_rating"> <span class="star"></span> ${rating}</div>
                    <div class="watchList_genre">SuperHero | Action | Sci-Fi | Dark Humour</div>    
                    <div class="watchList_view" onclick="document.location = 'marvel_movielists/${filLoc}'">View</div>    
                </div>  

               <div><span class="watchList_remove"></span></div>

            </div>
    `;
}

/*STORE DATA TO LOCAL STORAGE*/
function saveToLocalStorage() {
    localStorage.setItem('favoriteMovies', JSON.stringify(itemList));
}

function loadFromLocalStorage() {
    let storedMovies = JSON.parse(localStorage.getItem('favoriteMovies')) || [];
    storedMovies.forEach(movie => {
        let newMovieElement = createFavourite(movie.image, movie.title, movie.rating, movie.filLoc);
        let element = document.createElement("div");
        element.innerHTML = newMovieElement;
        let movieBasket = document.querySelector(".watchList_nav_content");
        movieBasket.append(element);
    });
}

// Call loadFromLocalStorage when the page loads
window.onload = loadFromLocalStorage;
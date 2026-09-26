/* =========================================================
   EXPLOREPH — CLEAN GLOBAL JAVASCRIPT
   =========================================================
   Features:
   - Random Philippine backgrounds
   - Mobile navigation
   - Destination search
   - Things To Do filtering
   - No Login / Sign Up system
   - No account system
   - No dashboard system
   ========================================================= */


/* =========================================================
   RANDOM PHILIPPINES BACKGROUNDS
   ========================================================= */

const explorePHBackgrounds = [

    /* DESTINATIONS */
    "bohol 2.jpg",
    "bohol 3.jpg",
    "bohol 4.jpg",
    "bohol 5.jpg",

    "mayon 2.jpg",
    "mayon 3.jpg",
    "mayon 4.jpg",

    "Banaue.webp",
    "banaue 2.jpg",
    "banaue 3.webp",
    "banaue 4.jpg",

    "palawan.jpg",
    "palawan 2.jpg",
    "palawan 3.jpg",
    "palawan 4.jpg",

    "siargao.jpg",
    "siargao2.jpg",
    "siargao2.webp",
    "siargao 3.jpg",
    "siargao 4.jpg",

    "vigan.jpg",
    "vigan2.jpg",
    "vigan3.jpg",
    "vigan4.jpg",

    /* HOTELS */
    "boholhotel.jpg",
    "palawanhotel.webp",
    "siargaohotel.webp",
    "viganhotel.jpg",
    "banauehotel.jpg",
    "mayonhotel.jpg",

    /* RESTAURANTS */
    "boholrestaurants.jpg",
    "palawanrestaurants.jpg",
    "siargaorestaurants.jpg",
    "viganrestaurants.jpg",
    "banaue restaurants.jpg",
    "mayonrestaurants.jpg"
];


/* =========================================================
   RANDOM BACKGROUND
   ========================================================= */

function setExplorePHRandomBackground() {

    const body = document.body;

    if (!body) return;

    /*
       Choose a random Philippine image.
    */

    const randomIndex =
        Math.floor(
            Math.random() *
            explorePHBackgrounds.length
        );

    const selectedImage =
        explorePHBackgrounds[randomIndex];


    /*
       Save the image as a CSS variable.
    */

    body.style.setProperty(
        "--explore-random-bg",
        `url("${selectedImage}")`
    );


    /*
       Activate the random background.
    */

    body.classList.add(
        "explore-random-background"
    );


    console.log(
        "ExplorePH background:",
        selectedImage
    );
}


/* =========================================================
   MOBILE MENU
   ========================================================= */

function toggleMenu() {

    const nav =
        document.getElementById(
            "mainNav"
        );


    if (!nav) return;


    nav.classList.toggle(
        "show"
    );
}


/* =========================================================
   DESTINATION SEARCH
   ========================================================= */

function searchDestination() {

    const input =
        document.getElementById(
            "searchInput"
        );


    if (!input) return;


    const search =
        input.value
            .trim()
            .toLowerCase();


    /*
       Destination list
    */

    const destinations = {

        "bohol":
            "bohol.html",

        "mayon":
            "mayon.html",

        "mayon volcano":
            "mayon.html",

        "banaue":
            "Banaue.html",

        "palawan":
            "Palawan.html",

        "siargao":
            "Siargao.html",

        "vigan":
            "vigan.html"

    };


    /*
       Open matching destination.
    */

    if (destinations[search]) {

        window.location.href =
            destinations[search];

        return;
    }


    /*
       Show an inline message
       instead of an alert.
    */

    const message =
        document.getElementById(
            "searchMessage"
        );


    if (message) {

        message.textContent =
            "Destination not found. Try Bohol, Mayon, Banaue, Palawan, Siargao, or Vigan.";

        message.style.display =
            "block";

    }
}


/* =========================================================
   THINGS TO DO FILTER
   ========================================================= */

function filterCards(category) {

    const cards =
        document.querySelectorAll(
            ".filter-card"
        );


    if (!cards.length) return;


    cards.forEach(
        function (card) {

            const cardCategory =
                card.getAttribute(
                    "data-category"
                );


            if (
                category === "all" ||
                cardCategory === category
            ) {

                card.style.display =
                    "block";

            } else {

                card.style.display =
                    "none";

            }

        }
    );
}


/* =========================================================
   HIDE SEARCH MESSAGE WHEN USER TYPES
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const searchInput =
            document.getElementById(
                "searchInput"
            );


        const searchMessage =
            document.getElementById(
                "searchMessage"
            );


        if (
            searchInput &&
            searchMessage
        ) {

            searchInput.addEventListener(
                "input",
                function () {

                    searchMessage.style.display =
                        "none";

                }
            );

        }


        /* Set random background */

        setExplorePHRandomBackground();

    }
);

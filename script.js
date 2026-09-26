/* =========================================================
   EXPLOREPH — CLEAN GLOBAL JAVASCRIPT
   =========================================================
   Public pages:
   - Light mode only

   Signed-in pages:
   - Light mode
   - Dark mode
   - Theme colors
   - Theme background
   - Profile photo
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
   CHECK LOGIN STATUS
   ========================================================= */

function isExplorePHLoggedIn() {

    return (
        localStorage.getItem("explorephLoggedIn") === "true" ||
        localStorage.getItem("explorePHLoggedIn") === "true"
    );

}


/* =========================================================
   RANDOM BACKGROUND
   ========================================================= */
function setExplorePHRandomBackground() {

    const body = document.body;

    if (!body) return;

    /* Don't use random background on login/signup */
    if (
        body.classList.contains("login-body") ||
        body.classList.contains("signup-body")
    ) {
        return;
    }

    /* User-selected photo gets priority */
    const userPhoto =
        localStorage.getItem("explorephThemeImage");

    if (userPhoto) {
        body.classList.remove("explore-random-background");

        body.style.setProperty(
            "background-image",
            `url("${userPhoto}")`,
            "important"
        );

        return;
    }

    /* Pick a random Philippine image */
    const randomIndex =
        Math.floor(
            Math.random() *
            explorePHBackgrounds.length
        );

    const selectedImage =
        explorePHBackgrounds[randomIndex];

    /* Store image in a CSS variable */
    body.style.setProperty(
        "--explore-random-bg",
        `url("${selectedImage}")`
    );

    /* Activate random background */
    body.classList.add(
        "explore-random-background"
    );

    console.log(
        "ExplorePH background:",
        selectedImage
    );
}





/* =========================================================
   GLOBAL THEME SYSTEM
   ========================================================= */

function applyExplorePHTheme() {

    const body = document.body;
    const root = document.documentElement;

    if (!body) return;

    const loggedIn =
        isExplorePHLoggedIn();


    /* -----------------------------------------------------
       LOGGED OUT
       ----------------------------------------------------- */

    if (!loggedIn) {

        body.classList.remove(
            "explore-logged-in",
            "explore-dark",
            "explore-light",
            "dark-mode",
            "explore-theme-photo",
            "has-user-background"
        );

        body.style.backgroundImage = "";

        root.style.setProperty(
            "--ep-bg",
            "#f6f8fb"
        );

        root.style.setProperty(
            "--ep-accent",
            "#1769aa"
        );

        return;
    }


    /* -----------------------------------------------------
       LOGGED IN
       ----------------------------------------------------- */

    body.classList.add(
        "explore-logged-in"
    );


    /* -----------------------------------------------------
       THEME COLORS
       ----------------------------------------------------- */

    const lightColor =
        localStorage.getItem(
            "explorephThemeLight"
        ) ||
        localStorage.getItem(
            "explorephLightColor"
        ) ||
        "#f6f8fb";


    const accentColor =
        localStorage.getItem(
            "explorephThemeAccent"
        ) ||
        localStorage.getItem(
            "explorephDarkColor"
        ) ||
        "#1769aa";


    root.style.setProperty(
        "--ep-bg",
        lightColor
    );

    root.style.setProperty(
        "--ep-accent",
        accentColor
    );


    /* -----------------------------------------------------
       DARK / LIGHT MODE
       ----------------------------------------------------- */

    const mode =
        localStorage.getItem(
            "explorephThemeMode"
        ) ||
        localStorage.getItem(
            "explorephDarkMode"
        ) ||
        localStorage.getItem(
            "explorephMode"
        ) ||
        "light";


    const isDark =
        mode === "dark";


    body.classList.toggle(
        "explore-dark",
        isDark
    );

    body.classList.toggle(
        "explore-light",
        !isDark
    );


    /*
       Remove old dark-mode class.
       This prevents old CSS from overriding
       the new theme.
    */

    body.classList.remove(
        "dark-mode"
    );


    /* -----------------------------------------------------
       USER THEME PHOTO
       ----------------------------------------------------- */

    const themePhoto =
        localStorage.getItem(
            "explorephThemeImage"
        );


    if (themePhoto) {

        body.classList.add(
            "has-user-background"
        );

        body.classList.add(
            "explore-theme-photo"
        );

        body.style.backgroundImage =
            `url("${themePhoto}")`;

    }

    else {

        body.classList.remove(
            "has-user-background",
            "explore-theme-photo"
        );

        setExplorePHRandomBackground();

    }


    /* -----------------------------------------------------
       PROFILE PHOTO
       ----------------------------------------------------- */

    const profilePhoto =
        localStorage.getItem(
            "explorephProfilePhoto"
        );


    const avatars =
        document.querySelectorAll(
            ".avatar, .profile-avatar, #avatarLetter"
        );


    avatars.forEach(
        function (avatar) {

            if (!profilePhoto) return;

            avatar.textContent = "";

            avatar.style.backgroundImage =
                `url("${profilePhoto}")`;

            avatar.style.backgroundSize =
                "cover";

            avatar.style.backgroundPosition =
                "center";

        }
    );


    /* -----------------------------------------------------
       DARK MODE BUTTON TEXT
       ----------------------------------------------------- */

    const darkModeText =
        document.getElementById(
            "darkModeText"
        );


    if (darkModeText) {

        darkModeText.textContent =
            isDark
                ? "☀️ Light Mode"
                : "🌙 Dark Mode";

    }

}


/* =========================================================
   DARK MODE BUTTON
   ========================================================= */

function toggleDarkMode(event) {

    if (event) {
        event.preventDefault();
    }


    /*
       Dark mode cannot be enabled
       while logged out.
    */

    if (!isExplorePHLoggedIn()) {
        return;
    }


    const current =
        localStorage.getItem(
            "explorephThemeMode"
        ) === "dark";


    const newMode =
        current
            ? "light"
            : "dark";


    localStorage.setItem(
        "explorephThemeMode",
        newMode
    );


    /* Keep older key synchronized */
    localStorage.setItem(
        "explorephDarkMode",
        current
            ? "false"
            : "true"
    );


    applyExplorePHTheme();

}


/* =========================================================
   MOBILE MENU
   ========================================================= */

function toggleMenu() {

    const nav =
        document.getElementById(
            "mainNav"
        );


    if (nav) {

        nav.classList.toggle(
            "show"
        );

    }

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


    if (destinations[search]) {

        window.location.href =
            destinations[search];

        return;

    }


    /* Use inline message instead of alert */

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

            }

            else {

                card.style.display =
                    "none";

            }

        }
    );

}


/* =========================================================
   SIGN UP
   ========================================================= */

function signupUser(event) {

    event.preventDefault();


    const name =
        document
            .getElementById(
                "signupName"
            )
            ?.value
            .trim();


    const email =
        document
            .getElementById(
                "signupEmail"
            )
            ?.value
            .trim();


    const password =
        document
            .getElementById(
                "signupPassword"
            )
            ?.value;


    const confirmPassword =
        document
            .getElementById(
                "confirmPassword"
            )
            ?.value;


    const message =
        document.getElementById(
            "signupMessage"
        );


    if (
        !name ||
        !email ||
        !password
    ) {

        if (message) {

            message.innerHTML =
                "<p class='error'>Please complete all required fields.</p>";

        }

        return;

    }


    if (
        password !==
        confirmPassword
    ) {

        if (message) {

            message.innerHTML =
                "<p class='error'>Passwords do not match.</p>";

        }

        return;

    }


    const account = {

        name: name,

        email: email,

        password: password

    };


    localStorage.setItem(
        "explorePHAccount",
        JSON.stringify(account)
    );


    /* Save profile information */

    localStorage.setItem(
        "explorephFullName",
        name
    );


    localStorage.setItem(
        "explorephEmail",
        email
    );


    if (message) {

        message.innerHTML =
            "<p class='success'>Account created! Redirecting to sign in...</p>";

    }


    setTimeout(
        function () {

            window.location.href =
                "login.html";

        },
        1000
    );

}


/* =========================================================
   LOGIN
   ========================================================= */

function loginUser(event) {

    event.preventDefault();


    const emailInput =
        document.getElementById(
            "loginEmail"
        );


    const usernameInput =
        document.getElementById(
            "username"
        );


    const passwordInput =
        document.getElementById(
            "loginPassword"
        ) ||
        document.getElementById(
            "password"
        );


    const email =
        emailInput?.value.trim() ||
        "";


    const username =
        usernameInput?.value.trim() ||
        "";


    const password =
        passwordInput?.value ||
        "";


    const savedAccount =
        localStorage.getItem(
            "explorePHAccount"
        );


    let validLogin =
        false;


    let accountName =
        "";


    /* -----------------------------------------------------
       NORMAL ACCOUNT LOGIN
       ----------------------------------------------------- */

    if (savedAccount) {

        try {

            const account =
                JSON.parse(
                    savedAccount
                );


            const suppliedIdentity =
                email ||
                username;


            if (
                suppliedIdentity ===
                    account.email &&
                password ===
                    account.password
            ) {

                validLogin =
                    true;

                accountName =
                    account.name ||
                    suppliedIdentity;

            }

        }

        catch (error) {

            console.error(
                "ExplorePH account data is invalid.",
                error
            );

        }

    }


    /* -----------------------------------------------------
       OLD USERNAME/PASSWORD LOGIN
       ----------------------------------------------------- */

    if (!validLogin) {

        const savedUsername =
            localStorage.getItem(
                "explorephUsername"
            );


        const savedPassword =
            localStorage.getItem(
                "explorephPassword"
            );


        if (
            savedUsername &&
            savedPassword &&
            username ===
                savedUsername &&
            password ===
                savedPassword
        ) {

            validLogin =
                true;

            accountName =
                username;

        }

    }


    /* -----------------------------------------------------
       WRONG LOGIN
       ----------------------------------------------------- */

    if (!validLogin) {

        const message =
            document.getElementById(
                "loginMessage"
            );


        if (message) {

            message.innerHTML =
                "<p class='error'>Incorrect email/username or password.</p>";

        }


        return;

    }


    /* -----------------------------------------------------
       LOGIN SUCCESS
       ----------------------------------------------------- */

    localStorage.setItem(
        "explorephLoggedIn",
        "true"
    );


    localStorage.setItem(
        "explorePHLoggedIn",
        "true"
    );


    localStorage.setItem(
        "explorephUser",
        accountName
    );


    /*
       New users start in light mode.
       Existing theme preference is preserved.
    */

    if (
        !localStorage.getItem(
            "explorephThemeMode"
        )
    ) {

        localStorage.setItem(
            "explorephThemeMode",
            "light"
        );

    }


    /*
       Directly enter the logged-in platform.
       No success alert.
    */

    window.location.href =
        "dashboard.html";

}


/* =========================================================
   LOGOUT
   ========================================================= */

function explorePHLogout() {

    localStorage.removeItem(
        "explorephLoggedIn"
    );

    localStorage.removeItem(
        "explorePHLoggedIn"
    );


    /*
       Account information remains saved.
       Only the active login session is removed.
    */

    window.location.href =
        "index.html";

}


/* =========================================================
   STARTUP
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        setExplorePHRandomBackground();

        applyExplorePHTheme();

    }
);